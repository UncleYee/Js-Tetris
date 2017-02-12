'use strict';
// 所有形状
const SHAPES = [
  [0,1,1,1,2,1,3,1],
  [1,0,1,1,1,2,2,2],
  [2,0,2,1,2,2,1,2],
  [0,1,1,1,1,2,2,2],
  [1,2,2,2,2,1,3,1],
  [1,1,2,1,1,2,2,2],
  [0,2,1,2,1,1,2,2]
];
// 定义坐标
let x = 0, y = 0;
// 定义移动的基本单位
const size = 20;
// 定义形状
let shape = [];
let shapeDiv = [];
let container = {};
// 定义边界
const rowCount = 18;
const colCount = 10;

let defaultInterval; // 默认下降的 interval
let quickInterval; // 快速下降的 interval
const speed = 600; // 自动下降速度

// 显示方块
let show = () => {
  let divs = document.getElementsByClassName("defaultModel");
  for (let i = 0; i < divs.length; i++) {
    let top = (shape[i * 2 + 1] + y) * size;
    let left = (shape[i * 2] + x) * size;
    divs[i].style.top = `${top}px`;
    divs[i].style.left = `${left}px`;
  }
}

// 移动
let move = (a, b)=> {
  if (check(x + a, y + b, shape)) {
    x += a;
    y += b;
    show();
  } else {
    if (b === 0) {return;}
    fix();
    create();
    show();
    clearInterval(quickInterval);
  }
}

// 旋转
let rotate = () => {
  let newShape = [shape[1], 3 - shape[0], shape[3], 3 - shape[2], shape[5], 3 - shape[4], shape[7], 3 - shape[6]];
  if(!check(x,y,newShape)) {return;}
  shape = newShape;
  show();
}

// 边界检查
let check = (x, y, shape) => {
  let divs = document.getElementsByClassName('defaultModel');

  let left = colCount;
  let right = 0;
  let top = rowCount;
  let bottom = 0;
  let overlap = false;

  for (let i = divs.length - 1; i >= 0; i--) {
    // 最左边的水平坐标
    if (shape[2 * i] < left ) { left = shape[2 * i];}
    // 最右边的水平坐标
    if (shape[2 * i] > right) { right = shape[2 * i];}
    // 最上边的水平坐标
    if (shape[2 * i + 1] < top) {top = shape[2 * i + 1];}
    // 最下边的水平坐标
    if (shape[2 * i + 1] > bottom) {bottom = shape[2 * i + 1];}
    // 判断方块之间是否重叠
    let px = shape[2 * i + 1] + y;
    let py = shape[2 * i] + x;
    if (container[`${px}_${py}`]) {
      overlap = true;
    }
  }

  if ((right + x + 1) > colCount || (left + x) < 0 ||
      (bottom + y + 1) > rowCount || (top + y) < 0 || overlap) {
        return false;
      }
  return true;
}

// 快速下降
let quickDown = () => {
  quickInterval = setInterval("move(0,1)", 0);
}

// 到达底部 固定方块 变成灰色
let fix = () => {
  let divs = document.getElementsByClassName('defaultModel');
  for (let i = divs.length - 1; i >= 0; i--) {
    let px = shape[2 * i + 1] + y;
    let py = shape[2 * 1] + x;
    container[`${px}_${py}`] = shapeDiv[i];
    divs[i].className = 'fixedModel';
  }
  findFull();
}

//检查是否可以消除
let findFull = () => {
  let s = 0;
  for (let i = 0; i < rowCount; i++) {
    let count = 0;
    for (let j = 0; j < colCount; j++) {
      if (container[`${i}_${j}`]) {
        count++;
      }
    }
    if (count === colCount) {
      s++;
      removeLine(m);
    }
  }
}

// 消除指定行
let removeLine = (row) => {
  // 消除一行
  for (let i = 0; i < colCount; i++) {
    document.body.removeChild(container[`${row}_${i}`]);
  }
  // 消除行上面的所有方块向下移动一行
  for (let i = row; i > 0; i--) {
    for (let j = 0; j < colCount; j++) {
      container[`${i}_${j}`] = container[`${i-1}_${j}`];
      if (container[`${i}_${j}`]) {
        container[`${i}_${j}`].style.top = `${i * size}px`
      }
    }
  }
}

// 随机获取一个方块数组
let randomShape = () => {
  shape = SHAPES[Math.floor(Math.random() * 7)];
}

let create = () => {
  x = 3;
  y = 0;
  shapeDiv = [];
  randomShape();
  // 创建四个 div
  for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    div.className = "defaultModel";
    shapeDiv[i] = div;
    document.body.appendChild(div);
  }
}

// 初始化
let init = () => {
  create();
  show();
  
  // 监听键盘事件 上下左右
  document.onkeydown = (event) => {
    if (event) {
      switch(event.keyCode){
        case 32: // 空格旋转 
          quickDown();
          break;
        case 37: // 左
          move(-1, 0)
          break;
        case 38: // 上
          rotate(); // 旋转
          // move(0, -1)
          break;
        case 39: // 右
          move(1, 0);
          break;
        case 40: // 下
          move(0, 1);
          break;
        default: break;
      }
    }
  }

  // 方块开始下降
  defaultInterval = setInterval("move(0, 1)", speed);
}
