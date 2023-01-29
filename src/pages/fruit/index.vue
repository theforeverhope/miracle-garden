<template lang="html">
  <div>
    <div id="canvas"></div>
    <!-- <canvas id="canvas"></canvas> -->
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
import { toRaw } from '@vue/reactivity';
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';
import { random, uuid } from '../../../utils/common';

export default {
  name: 'Matter',
  props: {},
  data() {
    // 游戏设置
    return {
      app: null, // PIXI.Application
      engine: null, // Matter.Engine - 物理引擎
      world: null, // Matter.World - 物理世界
      runner: null, // Matter.Runner - 物理系统运行循环
      // render: null, // Matter.Render - 渲染引擎
      mouseconstraint: null, // Matter.Event - 鼠标事件劫持
      dust: null, // Dust 例子效果库
      particleContainer: null,

      count: 1000, // 1s
      lastTime: Date.now(),
      
      fruitsOnScreen: [],

      status: -1, // 游戏状态 -1: 进行中, 0: 失败, 1: 胜利
      curFruit: null, // 当前可交互的水果
      groundHeight: 100, // 地面高度
      psdWidth: 750, // 标准屏幕宽度
      canvasHeight: window.innerHeight * 750 / window.innerWidth, // 用标准屏幕宽度换算canvas高度
      
      collideMusic: new Audio(require('../../assets/watermelon/collide.mp3')),
      combineMusic: new Audio(require('../../assets/watermelon/combine.mp3')),
      fruits: [ 
        {
          image: require('../../assets/watermelon/1.png'),
          fragment: require('../../assets/watermelon/fragment1.png'),
          bom: require('../../assets/watermelon/bombing1.png'),
          radius: 52/2,
          mess: 1,
        },
        {
          image: require('../../assets/watermelon/2.png'),
          fragment: require('../../assets/watermelon/fragment2.png'),
          bom: require('../../assets/watermelon/bombing2.png'),
          radius: 80/2,
          mess: 2,
        },
        {
          image: require('../../assets/watermelon/3.png'),
          fragment: require('../../assets/watermelon/fragment3.png'),
          bom: require('../../assets/watermelon/bombing3.png'),
          radius: 108/2,
          mess: 3,
        },
        {
          image: require('../../assets/watermelon/4.png'),
          fragment: require('../../assets/watermelon/fragment4.png'),
          bom: require('../../assets/watermelon/bombing4.png'),
          radius: 118/2,
          mess: 3
        },
        {
          image: require('../../assets/watermelon/5.png'),
          fragment: require('../../assets/watermelon/fragment5.png'),
          bom: require('../../assets/watermelon/bombing5.png'),
          radius: 152/2,
          mess: 4,
        },
        {
          image: require('../../assets/watermelon/6.png'),
          fragment: require('../../assets/watermelon/fragment6.png'),
          bom: require('../../assets/watermelon/bombing6.png'),
          radius: 184/2,
          mess: 4,
        },
        {
          image: require('../../assets/watermelon/7.png'),
          fragment: require('../../assets/watermelon/fragment7.png'),
          bom: require('../../assets/watermelon/bombing7.png'),
          radius: 194/2,
          mess:4,
        },
        {
          image: require('../../assets/watermelon/8.png'),
          fragment: require('../../assets/watermelon/fragment8.png'),
          bom: require('../../assets/watermelon/bombing8.png'),
          radius: 258/2,
          mess: 5,
        },
        {
          image: require('../../assets/watermelon/9.png'),
          fragment: require('../../assets/watermelon/fragment9.png'),
          bom: require('../../assets/watermelon/bombing9.png'),
          radius: 308/2,
          mess: 6,
        },
        {
          image: require('../../assets/watermelon/10.png'),
          fragment: require('../../assets/watermelon/fragment10.png'),
          bom: require('../../assets/watermelon/bombing10.png'),
          radius: 310/2,
          mess: 7,
        },
        {
          image: require('../../assets/watermelon/11.png'),
          radius: 408/2,
          mess: 8,
        },
      ],
    };
  },

  mounted() {
    // 初始化游戏
    this.initGame();
    // 游戏循环绘制水果位置
    this.gameLoop();
  },

  methods: {
    /**
     * 游戏循环
     */
    gameLoop() {
      // 更新列表中每个水果的位置
      const fruitsOnScreen = toRaw(this.fruitsOnScreen);
      for(let i = 0; i < fruitsOnScreen.length; i++) {
        let fruit = fruitsOnScreen[i];
        fruit.pixiSprite.x = fruit.position.x;
        fruit.pixiSprite.y = fruit.position.y;
      }
      
      // 更新例子粒子系统
      this.dust.update();

      // 每帧时间差
      let now = Date.now();
      let diff = now - this.lastTime;
      this.lastTime = now;
      // 物理引擎更新时间状态
      Matter.Runner.tick(toRaw(this.runner), toRaw(this.engine), diff);

      window.requestAnimationFrame(this.gameLoop);
    },
    /**
     * 初始化游戏物理世界
     */
    initGame() {
      PIXI.particles = {
        ParticleContainer: PIXI.ParticleContainer
      }
      this.dust = new Dust(PIXI);
      this.app = new PIXI.Application({
        width: this.psdWidth, // default: 800 宽度
        height: this.canvasHeight, // default: 600 高度
        antialias: true, // default: false 反锯齿
        transparent: false, // default: false 透明度
        resolution: 1, // default: 1 分辨率
        backgroundAlpha: 0, // 设置背景颜色透明度   0是透明
      });
      this.setBackground(this.app);
      // 将创建好的canvas添加到元素当中去
      document.getElementById('canvas').appendChild(this.app.view);

      // 初始化粒子系统
      this.particleContainer = new PIXI.ParticleContainer(
        1500,
        { alpha: true, scale: true, rotation: true, uvs: true }
      );
      this.app.stage.addChild(toRaw(this.particleContainer));

      // 初始化物理系统
      this.engine = Matter.Engine.create({});
      this.world = toRaw(this.engine).world;
      this.world.bounds = { min: { x: 0, y: 0 }, max: { x: this.psdWidth, y: this.canvasHeight } };
      this.runner = Matter.Runner.create();
      // this.render = Matter.Render.create({
      //   canvas: this.canvas, // app.view canvas面板
      //   engine: this.engine,
      //   options: {
      //     width: this.psdWidth,
      //     height: this.canvasHeight,
      //     wireframes: false, // 可以为世界里的物品添加颜色，如果不对物品设置渲染颜色的话，引擎会默认物体颜色随机
      //     background : "#ffe89d",
      //     showSleeping: false,
      //   },
      // });
      this.mouseconstraint = Matter.MouseConstraint.create(toRaw(this.engine));
      Matter.Engine.run(toRaw(this.engine));

      this.resetGame();
    },

    /**
     * 绘制背景
     * @param {*} app - PIXI.Application
     */
    setBackground(app) {
      app.renderer.backgroundColor = 0xfee48c; // 设置canvas背景颜色

      const groundHeight = this.groundHeight;
      let ground = new PIXI.Graphics();
      ground.beginFill(0x67422b);
      ground.drawRect(0, window.innerHeight - groundHeight, window.innerWidth, groundHeight);
      ground.endFill();
      app.stage.addChild(ground);

      // const platformHeight = 20;
      // let platform = new PIXI.Graphics();
      // platform.beginFill(0xa67840);
      // platform.drawRect(0, window.innerHeight - platformHeight - groundHeight, window.innerWidth, platformHeight);
      // platform.endFill();
      // platform.type = -1;
      // app.stage.addChild(platform);
    },


    /**
     * 重置游戏环境
     */
    resetGame() {
      this.clearGame();
      const ground = Matter.Bodies.rectangle(
        this.psdWidth / 2, 
        this.canvasHeight - this.groundHeight / 2, 
        this.psdWidth, 
        this.groundHeight, 
        { 
          isStatic: true,
          // render: {
          //   fillStyle: '#7b5438',
          // }
        }
      );
      const leftWall = Matter.Bodies.rectangle(-10/2, this.canvasHeight/2, 10, this.canvasHeight, { isStatic: true });
      const rightWall = Matter.Bodies.rectangle(10/2 + this.psdWidth, this.canvasHeight/2, 10, this.canvasHeight, { isStatic: true });
      Matter.World.add(toRaw(this.world), [ground, leftWall, rightWall]);
      // Matter.Render.run(this.render); // 用 requestAnimationFrame 实现了 run 的效果

      // 设置事件监听
      this.setEventListener();

      this.status = -1;
      this.curFruit = this.createFruit();
    },

    /**
     * 游戏世界监听
     */
    setEventListener() {
      Matter.Events.on(toRaw(this.mouseconstraint), "mousemove", (e)=>{
        if(!this.curFruit || this.status !== -1) return;
        const x = e.mouse.absolute.x * this.psdWidth / window.innerWidth;
        this.updateFruit(x);
      })

      Matter.Events.on(toRaw(this.mouseconstraint), "mouseup", (e)=>{
        if (this.status !== -1) {
          this.resetGame();
          return;
        }
        if(!toRaw(this.curFruit)) {
          return;
        };
        const x = e.mouse.absolute.x * this.psdWidth / window.innerWidth;
        this.updateFruit(x);
        Matter.Body.setStatic(toRaw(this.curFruit), false);
        this.curFruit = null;
        setTimeout(()=>{
          this.curFruit = this.createFruit();
        }, 1000);
      });

      Matter.Events.on(toRaw(this.engine), "collisionStart", e => this.collisionEvent(e));
    },

    /**
     * 碰撞事件
     */
    collisionEvent(e){
      if (this.status !== -1) return;
      const { pairs } = e;

      for(let i = 0; i < pairs.length; i++ ){
        const { bodyA, bodyB } = pairs[i];
        this.gameProgressChecking(bodyA);
        this.gameProgressChecking(bodyB);
        if(bodyA?.fruitType >= 0 && bodyA.fruitType === bodyB.fruitType && !bodyA.hasDeleted && !bodyB.hasDeleted){
          const type = bodyA.fruitType + 1;
          if (type >= this.fruits.length) {
            this.status = 1;
            return;
          }
          const targetType = bodyA.fruitType;
          
          bodyA.fruitType = -2; // 避免同时和左右两个相同水果碰撞，导致两个水果同时变成新的水果
          bodyB.fruitType = -2; // 避免同时和左右两个相同水果碰撞，导致两个水果同时变成新的水果
          
          const { position: { y: ay } } = bodyA;
          const { position: { y: by } } = bodyB;
          let target = null;
          if (ay > by) {
            target = bodyA;
          } else {
            target = bodyB;
          }

          const { position: { x: targetX, y: targetY } } = target;
          // 爆炸例子效果
          this.dust.create(
            targetX,   // x start position
            targetY,   // y start position
            () => new PIXI.Sprite.from(this.fruits[targetType].fragment), // Sprite function
            this.particleContainer,  // Container for particles
            15,                      // Number of particles
            0.05,                     // Gravity
            false,                   // Random spacing
            0, 6.28,              // Min/max angle
            this.fruits[targetType].radius, this.fruits[targetType].radius + 30,    // Min/max size
            1, 2,                    // Min/max speed
          );

          const radius = this.fruits[type].radius;
          const targetRadius = this.fruits[targetType].radius;
          const x = targetX;
          const y = targetY - (radius - targetRadius);
          this.createBom(targetType, x, y);
          
          this.fruitsOnScreen = this.fruitsOnScreen.filter(f => f.fruitId !== bodyA.fruitId && f.fruitId !== bodyB.fruitId);
          this.app.stage.removeChild(bodyA.pixiSprite);
          this.app.stage.removeChild(bodyB.pixiSprite);
          Matter.World.remove(this.world, bodyA);
          Matter.World.remove(this.world, bodyB);
        }
      }
    },

    /**
     * 水果下落前可水平移动位置
     */
    updateFruit(x) {
      const radius = toRaw(this.curFruit).circleRadius;
      const targetX = x < radius ? radius : (x + radius > this.psdWidth ? (this.psdWidth - radius) : x);
      const targetY = radius + 10;
      Matter.Body.setPosition(toRaw(this.curFruit), {
        x: targetX, 
        y: targetY
      });
      this.curFruit.pixiSprite.x = targetX;
      this.curFruit.pixiSprite.y = targetY;
    },

    createBom(type, x, y) {
      this.combineMusic.play();
      const radius = this.fruits[type].radius; // 半径递增
      const bom = PIXI.Sprite.from(this.fruits[type].bom)
      bom.x = x;
      bom.y = y;
      bom.width = 3*radius;
      bom.height = 3*radius;
      bom.anchor.set(0.5, 0.5); // 设置精灵的锚点居中
      this.app.stage.addChild(bom);
      
      setTimeout(() => {
        this.app.stage.removeChild(bom);
        const newFruit = this.createFruit(type+1, x, y);
        this.gameProgressChecking(newFruit);
      }, 200)
    },

    /**
     * 生成新的水果
     * @param {*} type - 水果种类
     * @param {*} x - 水果坐标x
     * @param {*} y - 水果坐标y
     */
    createFruit(type, x, y) {
      // 每次新增1～5号水果中的一个
      const fruitNum = type || random(0, 5); // fruitNum = [0, 5)
      const fruitRadius = this.fruits[fruitNum].radius; // 半径递增
      const fruit = Matter.Bodies.circle(
        x || this.psdWidth /2, 
        y || fruitRadius + 10, 
        fruitRadius, 
        {
          isStatic: type ? false : true, // 合并生成的水果 isStatic 为 false, 下一个下落水果 isStatic 为 true
          restitution: 0.2,
          // render: {
          //   sprite: {
          //     texture: this.fruits[fruitNum].image,
          //   }
          // }
        }
      );
      
      fruit.pixiSprite = PIXI.Sprite.from(this.fruits[fruitNum].image)
      fruit.pixiSprite.x = fruit.position.x;
      fruit.pixiSprite.y = fruit.position.y;
      fruit.pixiSprite.anchor.set(0.5, 0.5); // 设置精灵的锚点居中, 使得 PIXI.Sprite.x 与 Matter.Bodies.circle.x 相同
      this.app.stage.addChild(fruit.pixiSprite);

      fruit.fruitId = uuid(); // 当前水果ID，用于合并后销毁水果的判断
      fruit.fruitType = fruitNum; // 水果类型
      Matter.World.add(toRaw(this.world), fruit);

      this.fruitsOnScreen.push(fruit);
      return fruit;
    },

    /**
     * 游戏状态检测
     */
    gameProgressChecking(body){
      const minY = 300;
      if (!body.isStatic && body.position.y <= minY) {
        // 游戏失败
        this.status = 0;
      }
    },

    /**
     * 清空游戏环境
     */
    clearGame() {
      this.curFruit = null;

      this.fruitsOnScreen.forEach(f => {
        this.app.stage.removeChild(f.pixiSprite);
      });
      this.fruitsOnScreen = [];
      // 由于还要重新设置游戏面板，所以engine不需要清除
      this.world && Matter.World.clear(toRaw(this.world));
      this.render && Matter.Render.stop(toRaw(this.render));
      this.mouseconstraint && Matter.Events.off(toRaw(this.mouseconstraint))
    },
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>