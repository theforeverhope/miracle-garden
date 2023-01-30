
export default class Star {
  constructor(x, y, width, height, lifetime) {
    this.id = `${x}-${y}`;
    this.x = x;
    this.y = y;
    this.width = width || 50;
    this.height = height || 100; 
    this.opacity = 1;
    this.color = '#ffffff';
    this.time = (new Date()).valueOf();
    this.lifetime = lifetime || (Math.floor(Math.random() * 4) + 1) * 1000; // 1s～4s
  }

  // 判断星星生命周期 lifetime 是否未结束
  alive() {
    this.opacity = (1 - ((new Date()).valueOf() - this.time) / this.lifetime).toFixed(1);
    if (this.opacity < 0) {
      this.opacity = 0;
      return false;
    }
    return true;
  }

  // 在 canvas 上绘制星星
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y-this.height/2);
    ctx.quadraticCurveTo(this.x, this.y, this.x+this.width/2, this.y);
    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y+this.height/2);
    ctx.quadraticCurveTo(this.x, this.y, this.x-this.width/2, this.y);
    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y-this.height/2);
    ctx.closePath();
    ctx.fillStyle = this.hexToRgba(this.color, this.opacity); 
    ctx.fill();
  }

  // 转换 hex颜色值 为添加透明度通道的 RGBA颜色值
  hexToRgba(hex, opacity) {
    return `rgba(${parseInt('0x' + hex.slice(1,3))}, ${parseInt('0x' + hex.slice(3,5))}, ${parseInt('0x' + hex.slice(5,7))}, ${opacity})`;
  }
}
    

