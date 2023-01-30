class Ball {
  //初始状态的光斑小球
  constructor(x, y, r=10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = false;
    this.time = new Date().valueOf();
    this.maxTime = 4500; // 光斑的最大生命时长
    this.opacity = 0.5;
    this.color = this.randomColor();
    this.angle = Math.random()*(Math.PI*2); // 光点与坐标轴形成的夹角，用三角函数换算x,y坐标
    // this.anglex = this.randomR(10,15)*Math.cos(this.angle); // 随机单位距离
    // this.angley = this.randomR(10,15)*Math.sin(this.angle);
    this.anglex = 5*Math.cos(this.angle); // 固定单位距离
    this.angley = 5*Math.sin(this.angle);
  }

  //随机颜色
  randomColor() {
    return "#"+parseInt(Math.random()*(16777216)).toString(16);
  }
  //随机数字 可控制半径或xy移动量
  randomR(min, max) {
    return Math.random() * max + min;
  }

  flash() {
    // 在一定范围内改变透明度和半径，实现闪烁效果
    if (this.opacity <= 0.1) {
      this.direction = true;
    } 
    
    if (this.opacity >= 0.3) {
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
    this.x += this.anglex;
    this.y += this.angley;
    this.anglex *= 1; // 缓动因子，>1则加速运动，<1则减速运动
    this.angley *= 1;
    this.flash();
  }
}

export default class Facula {
  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.balls = [];
    this.createBall(x, y, num)
  }

  createBall(x, y, num){
    for(let i=0; i < num; i++) {
      this.balls.push(new Ball(x, y));
    }
  }

  draw(ctx) {
    for(let i=0;i < this.balls.length;i++){
      let b = this.balls[i];
      b.move();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2, true);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  remove() {
    for(let i=0; i<this.balls.length; i++){
      let b = this.balls[i];
      let dt = new Date().valueOf() - b.time; // 生命时间 
      if(dt > b.maxTime) { // 距离 = 时间 * 速度，速度一定，所以时间长短控制移动距离
        this.balls.splice(i,1);
        this.balls.push(new Ball(this.x, this.y));
      }
    }
  }
}

function drawMoon(ctx) {
  const x = window.innerWidth / 2 - moonWidth / 2;
  const y = window.innerHeight / 2 - moonHeight / 2;
  ctx.drawImage(bg, x, y, moonWidth, moonHeight);
  ctx.beginPath();
  ctx.arc(window.innerWidth / 2, window.innerHeight / 2, moonWidth / 2 - 8, 0, Math.PI*2, true);
  ctx.fillStyle = 'rgba(153, 204, 255, 0.3)';
  ctx.fill();
  ctx.closePath();
}

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
