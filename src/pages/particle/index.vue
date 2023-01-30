<template lang="html">
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Star from '../../particle/star';

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
      num: 10
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
      
      this.drawStars();
      
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
    }
  }
}
</script>

<style>
  #canvas {
    background-color: #000;
  }
</style>