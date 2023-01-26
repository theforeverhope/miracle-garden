<template lang="html">
  <div>
    <canvas id="canvas"></canvas>
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
import * as Matter from 'matter-js';
import { random } from '../../../utils/common';

export default {
  name: 'Matter',
  props: {},
  data() {
    // 游戏设置
    return {
      engine: null, // Matter.Engine - 游戏引擎
      world: null, // Matter.World - 物理系统
      render: null, // Matter.Render - 渲染引擎
      status: -1, // 游戏状态 -1: 进行中, 0: 失败, 1: 胜利
      curFruit: null, // 当前可交互的水果
      
      fruits: [ 
        {
          image: require('../../assets/watermelon/1.png'),
          radius: 52/2,
          mess: 1,
        },
        {
          image: require('../../assets/watermelon/2.png'),
          radius: 80/2,
          mess: 2,
        },
        {
          image: require('../../assets/watermelon/3.png'),
          radius: 108/2,
          mess: 3,
        },
        {
          image: require('../../assets/watermelon/4.png'),
          radius: 118/2,
          mess: 3
        },
        {
          image: require('../../assets/watermelon/5.png'),
          radius: 152/2,
          mess: 4,
        },
        {
          image: require('../../assets/watermelon/6.png'),
          radius: 184/2,
          mess: 4,
        },
        {
          image: require('../../assets/watermelon/7.png'),
          radius: 194/2,
          mess:4,
        },
        {
          image: require('../../assets/watermelon/8.png'),
          radius: 258/2,
          mess: 5,
        },
        {
          image: require('../../assets/watermelon/9.png'),
          radius: 308/2,
          mess: 6,
        },
        {
          image: require('../../assets/watermelon/10.png'),
          radius: 310/2,
          mess: 7,
        },
        {
          image: require('../../assets/watermelon/11.png'),
          radius: 408/2,
          mess: 8,
        },
      ],
      groundHeight: 100, // 地面高度 20 + 80
      psdWidth: 750,
      canvasHeight: window.innerHeight * 750 / window.innerWidth,
      mouseconstraint: null, // 鼠标事件劫持
    };
  },

  mounted() {
    // 初始化游戏
    this.initGame();
    // 测试水果半径
    // this.curFruit = this.createFruit(2, 150, 100);
    // this.curFruit = this.createFruit(3, 150, 200);
    // this.curFruit = this.createFruit(4, 150, 300);
    // this.curFruit = this.createFruit(5, 150, 400);
  },

  methods: {
    /**
     * 初始化游戏物理世界
     */
    initGame() {
      this.canvas = document.getElementById('canvas');
      // 初始化物理系统
      this.engine = Matter.Engine.create({
        enableSleeping: true
      });
      this.world = this.engine.world;
      this.world.bounds = { min: { x: 0, y: 0 }, max: { x: this.psdWidth, y: this.canvasHeight } };
      this.render = Matter.Render.create({
        canvas: this.canvas, // app.view canvas面板
        engine: this.engine,
        options: {
          width: this.psdWidth,
          height: this.canvasHeight,
          wireframes: false, // 可以为世界里的物品添加颜色，如果不对物品设置渲染颜色的话，引擎会默认物体颜色随机
          background : "#ffe89d",
          showSleeping: false,
        },
      });

      this.mouseconstraint = Matter.MouseConstraint.create(this.engine);

      Matter.Engine.run(this.engine);

      this.resetGame();
    },

    resetGame() {
      console.log("resetGame")
      this.clearGame();
      const ground = Matter.Bodies.rectangle(
        this.psdWidth / 2, 
        this.canvasHeight - this.groundHeight / 2, 
        this.psdWidth, 
        this.groundHeight, 
        { 
          isStatic: true,
          render: {
            fillStyle: '#7b5438',
          }
        }
      );
      const leftWall = Matter.Bodies.rectangle(-10/2, this.canvasHeight/2, 10, this.canvasHeight, { isStatic: true });
      const rightWall = Matter.Bodies.rectangle(10/2 + this.psdWidth, this.canvasHeight/2, 10, this.canvasHeight, { isStatic: true });
      Matter.World.add(this.world, [ground, leftWall, rightWall]);
      Matter.Render.run(this.render);

      // 设置事件监听
      this.setEventListener();

      this.status = -1;
      this.curFruit = this.createFruit();
    },

    /**
     * 游戏世界监听
     */
    setEventListener() {
      Matter.Events.on(this.mouseconstraint, "mousemove", (e)=>{
          if(!this.curFruit || this.status !== -1) return;
          const x = e.mouse.absolute.x * this.psdWidth / window.innerWidth;
          this.updateFruit(x);
      })

      Matter.Events.on(this.mouseconstraint, "mouseup", (e)=>{
        console.log("mouseup")
          if(!this.curFruit || this.status !== -1) {
            this.resetGame();
            return;
          };
          const x = e.mouse.absolute.x * this.psdWidth / window.innerWidth;
          this.updateFruit(x);
          Matter.Sleeping.set(this.curFruit, false);
          Matter.Body.setStatic(this.curFruit, false);
          this.curFruit = null;
          setTimeout(()=>{
            this.curFruit = this.createFruit();
          }, 1000);
      });

      Matter.Events.on(this.engine, "collisionStart", e => this.collisionEvent(e));
      Matter.Events.on(this.engine, "collisionActive", e => this.collisionEvent(e));
    },

    collisionEvent(e){
        const { pairs } = e;
        Matter.Sleeping.afterCollisions(pairs);
        for(let i = 0; i < pairs.length; i++ ){
            const { bodyA, bodyB } = pairs[i];
            // console.log("bodyA.fruitType === ", bodyA.fruitType, bodyB.fruitType)
            if(bodyA?.fruitType >= 0 && bodyA.fruitType === bodyB.fruitType){
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
              const radius = this.fruits[type].radius;
              const targetRadius = this.fruits[targetType].radius;
              const x = targetX;
              const y = targetY - (radius - targetRadius);
              const newFruit = this.createFruit(type, x, y);
              
              Matter.World.remove(this.world, bodyA);
              Matter.World.remove(this.world, bodyB);
              this.gameProgressChecking(newFruit);
            }
        }
    },

    updateFruit(x) {
      const radius = this.curFruit.circleRadius;
      Matter.Body.setPosition(this.curFruit, {
        x: x < radius ? radius : (x + radius > this.psdWidth ? (this.psdWidth - radius) : x), 
        y: radius + 10
      });
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
          render: {
            sprite: {
              texture: this.fruits[fruitNum].image,
            }
          }
        }
      );

      fruit.fruitType = fruitNum; // 水果类型

      Matter.World.add(this.world, fruit);
      this.gameProgressChecking(fruit);
      return fruit;
    },

    gameProgressChecking(body){
      Matter.Events.on(body, 'sleepStart', (event) => {
        if (!event.source.isStatic && event.source.position.y <= 300) {
          // 游戏失败
          this.status = 0;
        }
      })
    },

    clearGame() {
      console.log("clearGame")
      this.curFruit = null;
      // 清除整个游戏引擎
      this.world && Matter.World.clear(this.world);
      this.render && Matter.Render.stop(this.render);
      this.mouseconstraint && Matter.Events.off(this.mouseconstraint)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>