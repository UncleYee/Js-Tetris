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
const shape = [];
const shapeDiv = [];
const container = {};
// 定义边界
const rowCount = 18;
const colCount = 10;

let defaultInterval; // 默认下降的 interval
let quickInterval; // 快速下降的 interval
const speed = 600; // 自动下降速度

// 显示方块
const show = () => {
  const divs = document.getElementsByClassName("defaultModel");
  for (let i = 0; i <divs.length; i++) {
    const top = (shape[i * 2 + 1] + y) * size;
    const left = (shape[i * 2] + x) * size;
    divs[i].style.top = `${top}px`;
    divs[i].style.left = `${left}px`;
  }
}

// 移动
const move = (a, b)=> {
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
const rotate = () => {
  const newShape = [shape[1], 3 - shape[0], shape[3], 3 - shape[2], shape[5], 3 - shape[4], shape[7], 3 - shape[6]];
  if(!check(x,y,newShape)) {return;}
  shape = newShape;
  show();
}

// 边界检查
const check = (x, y, shape) => {
  let left = colCount;
  let right = 0;
  let top = rowCount;
  let bottom = 0;

  for (let i = 0; i < 8; i += 2) {
    // 最左边的水平坐标
    if (shape[i] < left ) { left = shape[i];}
    if (shape[i] > right) { right = shape[i];}
    if (shape[i + 1] < top) {top = shape[i + 1];}
    if (shape[i + 1] > bottom) {bottom = shape[i + 1];}
  }

  if ((right + x + 1) > colCount || (left + x) < 0 ||
      (bottom + y + 1) > rowCount || (top + y) < 0) {
        return false;
      }
  return true;
}

// 快速下降
const quickDown = () => {
  quickInterval = setInterval("move(0,1)", 0);
}

// 到达底部 固定方块 编程灰色
const fix = () => {
  const divs = document.getElementsByClassName('defaultModel');
  for (let i = divs.length - 1; i >= 0; i--) {
    const px = shape[2 * i + 1] + y;
    const py = shape[2 * 1] + x;
    container[`${px}_${py}`] = shapeDiv[i];
    divs[i].className = 'fixedModel';
  }
  x = 3;
  y = 0;
}

// 随机获取一个方块数组
const randomShape = () => {
  shape = SHAPES[Math.random() * 7];
}

const create = () => {
  x = 3;
  y = 0;
  shapeDiv = [];
  randomShape();
  // 创建四个 div
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.className = "defaultModel";
    shapeDiv[i] = div;
    document.body.appendChild(div);
  }
}

// 初始化
const init = () => {
  // 创建游戏区域
  const back = document.createElement("div");
  back.className = "gameBack";
  document.body.appendChild(back);


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
