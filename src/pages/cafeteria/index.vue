<template lang="html">
  <div>
    <div id="pixi2"></div>
    <div class="game-notice" v-if="status !== -1">
      <div class="game-notice-content">
        <div>
          {{ status === 1 ? '获得胜利！🎉' : '差一点就赢了......' }}
        </div>
        <div class="game-notice-button" @click="resetGame">再次挑战</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import p1 from '../../assets/cafeteria/1.png';
import p2 from '../../assets/cafeteria/2.png';
import p3 from '../../assets/cafeteria/3.png';
import p4 from '../../assets/cafeteria/4.png';
import p5 from '../../assets/cafeteria/5.png';
import p6 from '../../assets/cafeteria/6.png';
import bg from '../../assets/cafeteria/bg.png';

export default {
  name: 'Pixi2',
  props: {},
  data() {
    // 游戏设置
    return {
      app: null, // PIXI.Application
      left: 0, // 棋盘左边坐标
      right: 0, // 棋盘右边坐标
      top: 100, // 棋盘上边坐标
      bottom: 0, // 棋盘下边坐标
      stageWidth: 600, // 棋盘格在canvas上的绘制长度，长宽相等
      blockWidth: 100, // 棋子长宽相等
      layer: 5, // 棋盘层数
      blocks: [], // 棋盘状态实时更新
      sprites: [], // 块图
      images: [p1, p2, p3, p4, p5, p6],
      total: 0, // 总块数
      slot: [], // 块槽
      status: -1,
    };
  },
  mounted() {
    // 初始化棋盘
    this.initGame();
  },
  methods: {
    initGame() {
      this.status = -1;
      let app = new PIXI.Application({
        width: window.innerWidth, // default: 800 宽度
        height: window.innerHeight, // default: 600 高度
        antialias: true, // default: false 反锯齿
        transparent: false, // default: false 透明度
        resolution: 1, // default: 1 分辨率
        backgroundAlpha: 0, // 设置背景颜色透明度   0是透明
      });
      this.app = app;

      // 平铺背景
      this.setBackground(app);

      // 初始化棋盘
      this.left = Math.floor((window.innerWidth - this.stageWidth) / 2);
      this.right = this.left + this.stageWidth;
      this.top = window.innerHeight - this.stageWidth - 110;
      this.bottom = this.top + this.stageWidth;
      this.resetGame();

      // 绘制块槽
      // this.renderSlotWrapper(app);

      // 将创建好的canvas添加到元素当中去
      document.getElementById('pixi2').appendChild(app.view);
    },

    resetGame() {
      this.status = -1;
      this.clearGame();

      // 计算每种图案的块数
      this.divideTotalBlocks(
        this.random(3 * this.images.length, 60, 3 * this.images.length), // 保证是3和num的倍数，记录总块数
        this.images.length // 图案种类
      );

      // 棋盘分层放入棋子
      const blocks = [];
      let sum = 0;
      const avg = Math.floor(this.total / this.layer);
      for (let l = 0; l < this.layer; l++) {
        // 这里的+5(+n)最好通过计算得出，使得(this.total - (avg + n) * (this.layer-1)) > 0，保证总数total可分layer层
        let layerTotal = this.random(avg - 10, avg + 5);
        if (l === this.layer - 1) {
          // 最后一种图案补齐块数
          layerTotal = this.total - sum;
        }
        sum += layerTotal;
        blocks.push(this.genBlocks(this.app, l, layerTotal));
        console.log("genBlocks ==== ", blocks)
      }
      this.blocks = blocks;

      // 计算最上层可操作棋子
      this.genActiveBlocks();

      // 绘制棋子和是否可操作样式
      this.renderBlocks(this.app);
    },

    /**
     * 绘制背景
     * @param {*} app - PIXI.Application
     */
    setBackground(app) {
      app.renderer.backgroundColor = 0xfee48c; // 设置canvas背景颜色

      const groundHeight = 80;
      let ground = new PIXI.Graphics();
      ground.beginFill(0x67422b);
      ground.drawRect(0, window.innerHeight - groundHeight, window.innerWidth, groundHeight);
      ground.endFill();
      app.stage.addChild(ground);

      const platformHeight = 20;
      let platform = new PIXI.Graphics();
      platform.beginFill(0xa67840);
      platform.drawRect(0, window.innerHeight - platformHeight - groundHeight, window.innerWidth, platformHeight);
      platform.endFill();
      platform.type = -1;
      app.stage.addChild(platform);
    },

    /**
     * 清除上一局面板上的所有棋子
     */
    clearGame() {
      for (let i = 0; i < this.blocks.length; i++) {
        for (let j = 0; j < this.blocks[i].length; j++) {
          this.blocks[i][j].target.destroy(true);
        }
      }

      for (let s = 0; s < this.slot.length; s++) {
        this.slot[s].target.destroy(true);
      }
      this.slot = [];
    },

    /**
     * 生成随机数
     * @param {*} min 随机数最小值
     * @param {*} max 随机数最大值
     * @param {*} times 随机数是times的倍数
     */
    random(min, max, times = 1) {
      const num = Math.floor(Math.random() * (max - min) + min);
      return (num % times) + num;
    },

    /**
     * 绘制背景
     * @param {*} app
     */
    setBackground(app) {
      app.renderer.backgroundColor = 0xffffff; // 设置canvas背景颜色
      const bgSprite = PIXI.Sprite.from(bg, {});
      app.stage.addChild(bgSprite);
      bgSprite.width = window.innerWidth;
      bgSprite.height = window.innerHeight;
    },

    /**
     * 计算每种图案的块数
     * @param {*} total 总块数
     * @param {*} num 图案总数
     * @param {*} min 每种图案的最少块数
     */
    divideTotalBlocks(total, num, min = 12) {
      let sum = 0;
      let sprites = [];
      for (let i = 0; i < num; i++) {
        let r = this.random(min, Math.floor(total / num) * 1.2); // 将块数大致平分为总数的1/num
        let s = 0;

        // 最后一种图案补齐块数
        if (i === num - 1) {
          s = total - sum > 0 ? total - sum : min;
        }

        // 每种图案的块数不能小于min值
        if (s < min) {
          s = min;
        }

        // 保证每种图案的块数都是3的倍数
        s = 3 - (r % 3) + r;

        sum += s;
        console.log('type = ', i, ', num = ', s);
        sprites.push({
          image: this.images[i], // 图像精灵图片地址
          type: i,
          num: s,
        });
      }

      // 记录总块数
      this.total = sum;
      this.sprites = sprites;
    },

    /**
     * 画棋盘辅助线(开发用途)
     */
    genAuxiliaryLines(app, rowNum, colNum) {
      const width = this.blockWidth;
      const height = this.blockWidth;
      for (let r = 0; r < rowNum + 1; r++) {
        for (let c = 0; c < colNum + 1; c++) {
          let line = new PIXI.Graphics();
          line.lineStyle(1, 0xf20c00, 1);
          line.moveTo(this.left, this.top + c * height);
          line.lineTo(this.right, this.top + c * height);
          app.stage.addChild(line);
        }

        let lined = new PIXI.Graphics();
        lined.lineStyle(1, 0xf20c00, 1);
        lined.moveTo(this.left + r * width, this.top);
        lined.lineTo(this.left + r * width, this.bottom);
        app.stage.addChild(lined);
      }
    },

    /**
     * 生成棋子
     * @param {*} app PIXI.Application
     * @param {*} layer 棋盘层数
     * @param {*} total 本层需要的棋子数
     */
    genBlocks(app, layer, total) {
      const width = this.blockWidth;
      const height = this.blockWidth;
      const rowNum = (this.right - this.left) / width;
      const colNum = (this.bottom - this.top) / height;
      const blocks = [];

      // 用mark二维数组记录生成块的位置，以免位置重复
      let mark = new Array(rowNum); //表格行数
      for (let i = 0; i < rowNum; i++) {
        mark[i] = new Array(colNum).fill(0); //每行列数等于表格行数
      }

      // 画辅助棋盘线
      this.genAuxiliaryLines(app, rowNum, colNum);
      // 画辅助棋盘线

      let i = 0;
      while (i < total) {
        // 单双分层 绘制交错效果
        let px = 0;
        let py = 0;
        let bx = 0;
        let by = 0;
        if (layer % 2 === 0) {
          bx = Math.floor(Math.random() * rowNum);
          by = Math.floor(Math.random() * colNum);
          px = this.left + bx * width;
          py = this.top + by * height;
        } else {
          bx = Math.floor(Math.random() * (rowNum - 1));
          by = Math.floor(Math.random() * (colNum - 1));
          px = this.left + width / 2 + bx * width;
          py = this.top + height / 2 + by * height;
        }

        // 判断是否同层的随机位置已有占位块
        // bx = Math.floor((px - this.left) / width);
        // by = Math.floor((py - this.top) / height);
        if (mark[bx][by] === 1) {
          continue;
        }
        mark[bx][by] = 1;
        i++;
        // 筛选出还有可分配余额的图案
        const sprites = this.sprites.filter(item => item.num > 0);
        const index = this.random(0, sprites.length);
        const randomSprite = sprites[index]; // 获取本次分配的图案
        randomSprite.num -= 1; // 分配出去的图案数量-1

        let block = new PIXI.Sprite.from(randomSprite.image);
        block.x = px;
        block.y = py;
        block.width = width;
        block.height = height;
        const blockItem = {
          target: block,
          type: randomSprite.type, // 图案类型
          x: px, // canvas 绘制x
          y: py, // canvas 绘制y
          layer: layer,
          active: false, // 默认棋子不可操作
        };
        blocks.push(blockItem);

        // 移动块，则重新计算最上层可操作块，且将块移除this.blocks中，加入this.slot进行消除计算
        block.on('pointerdown', () => {
          // 将块移除this.blocks
          this.transferBlock(blockItem);
          // 重新计算最上层可操作块
          this.genActiveBlocks();
          // 重绘最上层块
          this.renderBlocks(app, false);
          // 将块放入插槽，并计算插槽中的块是否可消除
          this.computeSlot(blockItem);
          // 修改块的坐标到插槽内，重绘插槽中的块
          this.renderSlot();
        });
      }
      return blocks;
    },

    /**
     * 计算可操作棋子
     */
    genActiveBlocks() {
      const len = this.stageWidth / this.blockWidth;
      let mark = new Array(len * 2); // 因为表格有单双两层交错，所以表格有2倍len行
      for (let i = 0; i < len * 2; i++) {
        mark[i] = new Array(len * 2).fill(0); //每行有2倍len列
      }
      for (let l = 0; l < this.blocks.length; l++) {
        const layer = this.blocks[l];
        for (let b = 0; b < layer.length; b++) {
          const x = (layer[b].x - this.left) / (this.blockWidth / 2);
          const y = (layer[b].y - this.top) / (this.blockWidth / 2);
          if (
            mark[x][y] === 0 &&
            mark[x + 1][y] === 0 &&
            mark[x][y + 1] === 0 &&
            mark[x + 1][y + 1] === 0
          ) {
            layer[b].active = true;
          }
          mark[x][y] = 1;
          mark[x + 1][y] = 1;
          mark[x][y + 1] = 1;
          mark[x + 1][y + 1] = 1;
        }
      }
    },

    /**
     * 将块放入插槽
     * @param {*} block
     */
    transferBlock(block) {
      // 从全局 this.blocks 里移除被选中的 block
      for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i] = this.blocks[i].filter(
          b => !(b.x === block.x && b.y === block.y && b.layer === block.layer)
        );
      }
    },

    /**
     * 绘制棋子
     */
    renderBlocks(app, initial = true) {
      for (let l = this.blocks.length - 1; l >= 0; l--) {
        const layer = this.blocks[l];
        for (let b = 0; b < layer.length; b++) {
          if (layer[b].active) {
            layer[b].target.interactive = true;
            layer[b].target.alpha = 1; // 简单通过透明度来表示是否位于最上层，最好改为添加图片灰度
          } else {
            layer[b].target.alpha = 0.3;
          }
          if (initial) {
            app.stage.addChild(layer[b].target);
          }
        }
      }
    },

    /**
     * 绘制块槽
     * @param {*} app
     */
    renderSlotWrapper(app) {
      const left = (window.innerWidth - this.blockWidth * 7) / 2;
      const top = window.innerHeight - 110;
      // 绘制快槽边框
      let rectangle = new PIXI.Graphics();
      rectangle.lineStyle(2, 0xf5deb3, 1);
      rectangle.drawRect(left, top, this.blockWidth * 7, this.blockWidth);
      
      app.stage.addChild(rectangle);
    },

    /**
     * 修改块坐标到块槽内
     * @param {*} app
     */
    renderSlot() {
      const left = (window.innerWidth - this.blockWidth * 7) / 2;
      const top = window.innerHeight - 110;
      // 绘制块
      this.slot.forEach((block, index) => {
        block.target.x = left + index * this.blockWidth;
        block.target.y = top;
        block.x = left + index * this.blockWidth;
        block.y = top;
      });
    },

    /**
     * 计算插槽内的块是否可消除
     * @param {*} block
     */
    computeSlot(block) {
      // 块不可交互
      block.target.interactive = false; // 放置入块槽的棋子不可交互，即不再响应鼠标点击事件

      // 添加或消除块
      const index = this.slot.findIndex(item => item.type === block.type); // 块槽中是否存在同类棋子
      if (index >= 0) { // 存在同类棋子则返回其坐标index >= 0，否则index为-1
        this.slot.splice(index, 0, block); // 存在则在index后一位插入棋子block
      } else {
        this.slot.push(block); // 不存在则在块槽末尾插入棋子block
      }

      const count = this.slot.filter(item => item.type === block.type); // 计算是否存在同类棋子数量为3
      if (count.length === 3) { // 存在则同时消除这一类棋子
        this.slot = [
          ...this.slot.slice(0, index),
          ...this.slot.slice(index + 3),
        ];
        count.forEach(item => {
          item.target.destroy(); // 消除棋子的同时，销毁棋子在canvas中的对象
        });
      }

      // 计算是否失败
      if (this.slot.length === 7) { // 块槽为7为，计算块槽是否放满7位棋子，是则游戏失败
        this.status = 0;
        console.error('You Lose!');
        return;
      }

      // 计算是否成功
      let sum = 0;
      for (let layer = 0; layer < this.blocks.length; layer++) {
        // 由于棋子是 new PIXI.Sprite 对象
        // 所以在 destroy 销毁后其存储在blocks里面的对象也将不存在
        // 所以这里直接计数就可以了
        sum += this.blocks[layer].length;
      }

      if (sum === 0) { // 统计剩余棋子数量，为0则游戏胜利
        this.status = 1;
        console.error('You Win!');
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
