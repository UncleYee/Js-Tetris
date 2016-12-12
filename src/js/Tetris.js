// 定义坐标
let x = 0, y = 0;
// 定义移动的基本单位
const size = 20;
// 定义形状
let shape = [0,0,1,0,2,0,2,1];

// 显示方块
show = () => {
  const divs = document.getElementsByClassName("defaultModel");
  for (let i = 0; i <divs.length; i++) {
    divs[i].style.top = (shape[i * 2 + 1] + y) * size + "px";
    divs[i].style.left = (shape[i * 2] + x) * size + "px";
  }
}

// 移动
move = (a, b)=> {
  x += a;
  y += b;
  show();
}

// 旋转
rotate = () => {
  shape = [shape[1], 3 - shape[0], shape[3], 3 - shape[2], shape[5], 3 - shape[4], shape[7], 3 - shape[6]];
  show();
}

// 初始化
var init = () => {
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
        case 32:
          rotate();
          break;
        case 37: // 左
          move(-1, 0)
          break;
        case 38: // 上
          move(0, -1)
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
