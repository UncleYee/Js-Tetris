// 定义坐标
let x = 0, y = 0;
// 定义移动的基本单位
const size = 20;
// 定义形状
let shape = [2,0,2,1,2,2,1,2];
// 定义边界
const rowCount = 18;
const colCount = 10;

// 显示方块
const show = () => {
  const divs = document.getElementsByClassName("defaultModel");
  for (let i = 0; i <divs.length; i++) {
    divs[i].style.top = (shape[i * 2 + 1] + y) * size + "px";
    divs[i].style.left = (shape[i * 2] + x) * size + "px";
  }
}

// 移动
const move = (a, b)=> {
  if (!check(x + a, y + b, shape)) return false;
  x += a;
  y += b;
  show();
}

// 旋转
const rotate = () => {
  shape = [shape[1], 3 - shape[0], shape[3], 3 - shape[2], shape[5], 3 - shape[4], shape[7], 3 - shape[6]];
  show();
}

// 边界检查
const check = (x, y, shape) => {
  let left = colCount;
  let right = 0;
  let top = rowCount;
  let bottom = 0;

  for (let i = 0; i < 8; i +=2) {
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

// 初始化
const init = () => {
  // 创建游戏区域
  const back = document.createElement("div");
  back.className = "gameBack";
  document.body.appendChild(back);


  // 创建四个 div
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.className = "defaultModel";
    document.body.appendChild(div);
  }

  show();
  
  // 监听键盘事件 上下左右
  document.onkeydown = (event) => {
    if (event) {
      switch(event.keyCode){
        case 32: // 空格旋转
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
}
