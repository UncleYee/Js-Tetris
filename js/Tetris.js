// 定义移动的基本单位
const move = 20;

// 监听键盘事件 上下左右
document.onkeydown = (event) => {
  const models = document.getElementsByClassName("defaultModel");
  const len = models.length;
  for (let i = 0; i < len; i++) {
    const model = models[i];
    const top = parseInt(model.style.top || 0, 10);
    console.log(top);
    const left = parseInt(model.style.left || 0, 10);
    console.log(left);
    console.log(model);
    if (event) {
      switch(event.keyCode){
        case 37: { // 左
          if (left >= 20) {
            model.style.left = parseInt(left - move, 10) + 'px';
          }
        }; break;
        case 38: { // 上
          if ( top >= 20) {
            model.style.top = parseInt(top - move, 10) + 'px';
          }
        }; break;
        case 39: { // 右
          model.style.left = parseInt(left + move, 10) + 'px';
        }; break;
        case 40: { // 下
          model.style.top = parseInt(top + move, 10) + 'px';
        }; break;
        default: break;
      }
    }
  }
}
