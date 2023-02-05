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
let faculas = [];
let ctx = null;

export default {
  name: 'CanvasDemo',
  props: {},
  data() {
    // 游戏设置
    return {
      WIDTH: window.innerWidth,
      HEIGHT: window.innerHeight,
      starNum: 10,
      faculaNum: 100,
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
      if (stars.length < this.starNum) {
        for (let i = 0; i < this.starNum - len; i++) {
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
      // 筛选出生命周期未完成的光斑
      faculas = faculas.filter(f => f.process < f.duration);

      // 光斑数量不足则补充，但每次补充一个
      if (faculas.length < this.faculaNum) {
        faculas.push(new Facula(this.WIDTH/2, this.HEIGHT/2))
      }

      // 绘制光斑
      for (let i=0; i<faculas.length; i++) {
        faculas[i].draw(ctx);
      }
    }
  }
}
</script>

<style>
  #canvas {
    background-color: #000;
  }
</style>