<template lang="html">
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Star from '../../particle/star';
import Facula from '../../particle/facula';

let begin = new Date().valueOf();
let facula = null;

let stars = [];
let ctx = null;

export default {
  name: 'CanvasDemo',
  props: {},
  data() {
    // 游戏设置
    return {
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      num: 2
    };
  },

  mounted() {
    const canvas = document.getElementById("canvas");
    canvas.setAttribute("height", this.HEIGHT);
    canvas.setAttribute("width", this.WIDTH);
    ctx = canvas.getContext("2d");

    this.gameLoop();
  },

  methods: {
    gameLoop() {
      ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      
      switch (this.$route?.query?.id) {
        case 'star':
          this.drawStars();
          break;
        case 'facula': 
          this.drawFacula();
          break;
      }
      
      window.requestAnimationFrame(this.gameLoop);
    },

    /**
     * 绘制星星
     */
    drawStars() {
      const len = stars.length;
      
      // 筛选出生命周期还没结束的星星
      stars = stars.filter(star => star.alive());
      // 补充星星数量，如果数量不足num
      if (stars.length < this.num) {
        for (let i = 0; i < this.num - len; i++) {
          const x = Math.floor(Math.random() * this.WIDTH);
          const y = Math.floor(Math.random() * this.HEIGHT);
          stars.push(new Star(x, y))
        }
      }

      stars.forEach(star => {
        star.draw(ctx)
      })
    },

    /**
     * 绘制光斑粒子
     */
    drawFacula() {
      if (new Date().valueOf() - begin < 100) { // 间隔一定时间再绘制，控制光斑密度
        return;
      }

      if (!facula) {
        facula = new Facula(this.WIDTH/2, this.HEIGHT/2, this.num)
      }
      facula.createBall(this.WIDTH/2, this.HEIGHT/2, this.num);
      begin = new Date().valueOf();
      facula.draw(ctx); // 循环绘制移动后的光斑
      facula.remove(); // 移除超过生命周期的光斑
    }
  }
}
</script>

<style>
  #canvas {
    background-color: #000;
  }
</style>