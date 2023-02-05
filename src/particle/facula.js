import { random, degreeToRadian, randomColor, uuid } from '../../utils/common';
import Easing from '../time/bezier';
export default class Facula {
  //初始状态的光斑小球
  constructor(x, y, r=10) {
    this.id = uuid();
    this.x = x;
    this.y = y;
    this.r = r || random(10, 15);
    this.birth = Date.now();
    this.process = 0; // 光斑运动时长，相对于最大生命值的时长
    this.duration = 100000; // 光斑的最大生命时长
    this.distance = 5; // 单位位移
    this.opacity = 0.5;
    this.color = randomColor();
    this.angle = degreeToRadian(random(0, 360)); // 光点与坐标轴形成的夹角，用三角函数换算x,y坐标
    this.animation = Easing.easeOut;
    this.direction = false;
  }

  flash() {
    // 在一定范围内改变透明度和半径，实现闪烁效果
    if (this.opacity <= 0.1) {
      this.direction = true;
    } 
    
    if (this.opacity >= 0.8) {
      this.direction = false;
    }

    if (this.direction) {
      this.opacity += 0.1;
      this.r += 0.5;
    } else {
      this.opacity -= 0.1;
      this.r -= 0.5;
    } 
    this.color = `rgba(255, 255, 255, ${this.opacity})`
  }

  //小球的运动及偏移量
  move() {
    // 当前进度百分比，先根据时间算出线性的结果，然后用easing求得缓动效果对应的时间
    let diff = Date.now() - this.birth;
    let percent = this.process / this.duration;
    percent = this.animation(percent);
     
    this.x += this.distance * Math.cos(this.angle) * percent;
    this.y += this.distance * Math.sin(this.angle) * percent;
    this.process += diff;
    this.flash();
  }

  draw(ctx) {
    this.move();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// function drawMoon(ctx) {
//   const x = window.innerWidth / 2 - moonWidth / 2;
//   const y = window.innerHeight / 2 - moonHeight / 2;
//   ctx.drawImage(bg, x, y, moonWidth, moonHeight);
//   ctx.beginPath();
//   ctx.arc(window.innerWidth / 2, window.innerHeight / 2, moonWidth / 2 - 8, 0, Math.PI*2, true);
//   ctx.fillStyle = 'rgba(153, 204, 255, 0.3)';
//   ctx.fill();
//   ctx.closePath();
// }

// const bg = new Image();
// bg.src = "./moon.png";
// bg.width = moonWidth;
// bg.height = moonHeight;

// let begin = new Date().valueOf();
// function gameLoop() {
//   if (new Date().valueOf() - begin < 100) { // 间隔一定时间再绘制，控制光斑密度
//     requestAnimationFrame(gameLoop);
//     return;
//   }
  
//   requestAnimationFrame(gameLoop);
// }

// gameLoop();
