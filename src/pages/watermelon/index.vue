<template lang="html">
  <div>
    <div id="pixi2" style="touch-action: none"></div>
    <!-- <div class="game-notice" v-if="status !== -1">
      <div class="game-notice-content">
        <div>
          {{ this.status === 1 ? '获得胜利！🎉' : '差一点就赢了......' }}
        </div>
        <div class="game-notice-button" @click="resetGame">再次挑战</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import p1 from '../../assets/watermelon/1.png';
import p2 from '../../assets/watermelon/2.png';
import p3 from '../../assets/watermelon/3.png';
import p4 from '../../assets/watermelon/4.png';
import p5 from '../../assets/watermelon/5.png';
import p6 from '../../assets/watermelon/6.png';
import p7 from '../../assets/watermelon/7.png';
import p8 from '../../assets/watermelon/8.png';
import p9 from '../../assets/watermelon/9.png';
import p10 from '../../assets/watermelon/10.png';
import p11 from '../../assets/watermelon/11.png';

export default {
  name: 'Pixi2',
  props: {},
  data() {
    // 游戏设置
    return {
      app: null, // PIXI.Application
      status: -1, // 游戏状态 -1: 进行中, 0: 失败, 1: 胜利
      fruits: [ 
        {
          image: p1,
          radius: 30,
        },
        {
          image: p2,
          radius: 40,
        },
        {
          image: p3,
          radius: 50,
        },
        {
          image: p4,
          radius: 50,
        },
        {
          image: p5,
          radius: 65,
        },
        {
          image: p6,
          radius: 65,
        },
        {
          image: p7,
          radius: 65,
        },
        {
          image: p8,
          radius: 70,
        },
        {
          image: p9,
          radius: 85,
        },
        {
          image: p9,
          radius: 90,
        },
        {
          image: p10,
          radius: 95,
        },
        {
          image: p11,
          radius: 100,
        },
      ],
      fruitCollisions: [], // 一次水果下落的所有碰撞，用于检测是否形成了碰撞环，形成环则结束运动
      fruitGroup: [],
      curFruit: null, // 当前可交互的水果
      groundHeight: 100, // 地面高度 20 + 80
    };
  },

  mounted() {
    // 初始化棋盘
    this.initGame();
  },

  methods: {
    initGame() {
      let bump = new Bump(PIXI);
      let app = new PIXI.Application({
        width: window.innerWidth, // default: 800 宽度
        height: window.innerHeight, // default: 600 高度
        antialias: true, // default: false 反锯齿
        transparent: false, // default: false 透明度
        resolution: 1, // default: 1 分辨率
        backgroundAlpha: 0, // 设置背景颜色透明度  0是透明
      });
      this.app = app;
      this.bump = bump; // 碰撞检测库

      this.setBackground(app);

      this.resetGame(app);

      document.getElementById('pixi2').appendChild(app.view);
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
     * 生成随机数 [min, max)
     * @param {*} min 随机数最小值
     * @param {*} max 随机数最大值
     * @param {*} times 随机数是times的倍数
     */
    random(min, max, times = 1) {
      const num = Math.floor(Math.random() * (max - min) + min);
      return (num % times) + num;
    },

    /**
     * 生成新的水果
     * @param {*} app - PIXI.Application
     * @param {*} num - 水果种类
     * @param {*} x - 水果坐标x
     * @param {*} y - 水果坐标y
     */
    getFruit(app, num, x, y) {
      // 每次新增1～5号水果中的一个
      const fruitNum = num || this.random(0, 5); // fruitNum = [0, 5)
      const fruit = new PIXI.Sprite.from(this.fruits[fruitNum].image);
      const fruitRadius = this.fruits[fruitNum].radius; // 半径递增
      fruit.x = x || (window.innerWidth - fruitRadius) / 2;
      fruit.y = y || 0;
      fruit.width = fruitRadius * 2;
      fruit.height = fruitRadius * 2;
      fruit.circular = true;
      fruit.type = fruitNum;
      fruit.radius = fruitRadius;
      fruit.isStatic = false; // 可以移动
      fruit.isAuto = false; // 鼠标可交互

      app.stage.addChild(fruit);
      return fruit;
    },

    /**
     * 重置游戏
     * @param {*} app - PIXI.Application
     */
    resetGame(app) {
      this.fruit = this.getFruit(app);

      app.stage.interactive = true;
      app.stage.on("pointermove", (event) => {
        if (this.fruit.isAuto) { // 开始下落之后就不再响应鼠标事件
          return;
        }

        const x = event?.data?.global?.x;
        const radius = this.fruit.radius;
        const fruit = this.fruit;
        
        if (x < 0) {
          fruit.x = 0;
        } else if (x > (window.innerWidth - radius * 2)) {
          fruit.x = window.innerWidth - radius * 2;
        } else {
          fruit.x = x;
        } 
      })

      // app.stage.on("pointerup", () => {}) 不生效奇奇怪怪
      app.renderer.plugins.interaction.on("pointerup", () => {
        this.fruit.isAuto = true; // 开始下落之后就不再响应鼠标事件
        this.fall(1);
      })
    },

    /**
     * 水果自由落体
     * @param {*} acc // 简易加速度
     */
    fall(acc) {
      const fruit = this.fruit;
      const maxHeight = window.innerHeight - this.groundHeight - this.fruit.radius * 2;
      // 每次下落后的碰撞会修改物体坐标，所以需要坐标修复防止穿透墙面
      this.fixOverflow(fruit, maxHeight); 

      const { hitDirections, isCombine } = this.hit(fruit, this.fruitGroup);
      if (isCombine) {
        return;
      }
      const isHitTwoBottom = hitDirections.filter(h => h.direction === 'bottom').length > 1;
      this.fruitCollisions = [...this.fruitCollisions, ...hitDirections];

      // 如果存在碰撞环则停止运动
      if (this.hasCollisionCircle(this.fruitCollisions)) { 
        console.log('存在碰撞环则停止运动')
        fruit.isStatic = true;
      }

      // 如果底部有两个支撑物体则停止运动
      if (isHitTwoBottom) { 
        console.log('底部有两个支撑物体则停止运动')
        fruit.isStatic = true;
      }

      if (fruit.isStatic || fruit.y > maxHeight) {
        // 记录碰撞物用于两个相同水果合并后，半径扩展的位置计算
        fruit.collisions = hitDirections;
        if (fruit.y > maxHeight) {
          fruit.y = maxHeight;
        }
        this.fruitGroup.push(fruit);
        this.fruit = this.getFruit(this.app);
        this.fruitCollisions = []; // 生成新水果后清空碰撞组数据
      } else {
        const isHitBottom = hitDirections.filter(h => h.direction === 'bottom').length > 0;
        const isHitLeft = hitDirections.filter(h => h.direction === 'left').length > 0;
        const isHitRight = hitDirections.filter(h => h.direction === 'right').length > 0;
        const offset = 2; // 移动距离

        if (isHitBottom) {
          const hitGroup = hitDirections.filter(h => h.direction === 'bottom')[0];
          const platformCenterX = hitGroup.platform.x + hitGroup.platform.radius / 2;
          const targetCenterX = hitGroup.target.x + hitGroup.target.radius / 2;

          if (!isHitLeft && !isHitRight) { // 下面有障碍物，可以往左右移动后继续下落
            if (targetCenterX <= platformCenterX) {
              // 下落的水果 fruit 相对撞击目标 platform 偏左，因为重力所以往左移动后下落
              if (fruit.prevHitDirection !== 'bottom') {
                fruit.prevHitDirection = 'bottom';
              }
              fruit.x -= offset;
              fruit.y -= offset;
              setTimeout(() => {
                this.fall(1);
              }, 10);
            } else { 
              // 下落的水果 fruit 相对撞击目标 platform 偏右，因为重力所以往右移动后下落
              fruit.x += offset;
              fruit.y -= offset;
              setTimeout(() => {
                this.fall(1);
              }, 10);
            }
          } else if (isHitLeft && !isHitRight) { // 下面和左边有障碍物
            if (targetCenterX <= platformCenterX) {
              // 下落的水果 fruit 相对撞击目标 platform 偏左，且左边有障碍物所以位置固定
              console.log('下落的水果 fruit 相对撞击目标 platform 偏左，且左边有障碍物所以位置固定')
              fruit.isStatic = true;
            } else { 
              // 下落的水果 fruit 相对撞击目标 platform 偏右，因为重力所以往右移动后下落
              fruit.x += offset;
              fruit.y -= offset;
              setTimeout(() => {
                this.fall(1);
              }, 10);
            }
          } else if (!isHitLeft && isHitRight) { // 下面和右边有障碍物
            if (targetCenterX <= platformCenterX) {
              // 下落的水果 fruit 相对撞击目标 platform 偏左，因为重力所以往左移动后下落
              fruit.x -= offset;
              fruit.y -= offset;
              setTimeout(() => {
                this.fall(1);
              }, 10);
            } else { 
              // 下落的水果 target 相对撞击目标 platform 偏右，且右边有障碍物所以位置固定
              console.log('下落的水果 target 相对撞击目标 platform 偏右，且右边有障碍物所以位置固定')
              fruit.isStatic = true;
            }
          } else if (isHitLeft && isHitRight) { // 下/左/右都有障碍物，则停止移动位置固定
            console.log('下/左/右都有障碍物，则停止移动位置固定')
            fruit.isStatic = true;
          }
        } else {
          if (isHitLeft && isHitRight) { // 左/右都有障碍物，则停止下落
            console.log('左/右都有障碍物，则停止下落')
            fruit.isStatic = true;
          } else if (isHitLeft && !isHitRight) { // 仅左边有障碍物，向右边移动后下落 
            fruit.x += offset;
            fruit.y -= offset;
            setTimeout(() => {
              this.fall(1);
            }, 10);
          } else if (!isHitLeft && isHitRight) { // 仅右边有障碍物，向左边移动后下落
            fruit.x -= offset;
            fruit.y -= offset;
            setTimeout(() => {
              this.fall(1);
            }, 10);
          } else if (!isHitLeft && !isHitRight) { // 下/左/右都没有障碍物，继续下落
            fruit.y += acc;
            setTimeout(() => {
              this.fall(acc+1);
            }, 10);
          }
        }

      } 
    },

    /**
     * 获取目标水果下方的所有水果
     * @param target 目标水果
     * @param group 游戏面板里所有存在的水果
     */
    getFruitsBelow(target, group) {
      return group.filter(item => {
        const targetCenterY = target.x + target.radius;
        const itemCenterY = item.x + item.radius;
        return itemCenterY <= targetCenterY;
      })
    },

    /**
     * 封装碰撞检测，添加撞击方位信息
     * @param target 实施撞击的物体
     * @param group 被撞击的物体数组
     */
    hit(target, group) {
      let hitDirections = [];

      if (group.length > 0) {
        for(let i = group.length-1; i >= 0; i--) {
          const prevPlatform = {
            x: group[i].x,
            y: group[i].y
          }

          if (this.bump.circleCollision(target, group[i], false)) {
            const platform = group[i];
            if (target.type === platform.type) {
              const newRadius = this.fruits[target.type+1].radius;
              const diff = (newRadius - platform.radius) * 2;
              this.fruit = this.getFruit(this.app, platform.type+1, platform.x - diff, platform.y - diff);
              this.fruitCollisions = []; // 生成新水果后清空碰撞组数据
              console.log('newFruit type=', this.fruit.type)
               
              // 从水果数组里消除两个合并的棋子
              this.fruitGroup = this.fruitGroup.filter(f => !(f.x === platform.x && f.y === platform.y) && !(f.x === target.x && f.y === target.y))
              this.fruitGroup.push(this.fruit);
              // 消除两个合并的棋子
              target.destroy();
              platform.destroy();

              // setTimeout(() => {
              //   this.fall(1);
              // }, 10)
              return { hitDirections: [], isCombine: true };
            }

            const dir = this.hitDirection(target, platform);
            const dirFilter = hitDirections.filter(h => h.direction === dir);
            
            if (!(dirFilter.length > 0) || this.isDifferentPlatfrom(dirFilter[0].platform, platform)) { 
              // 不存在这个方位的碰撞, 或同方位碰撞的不是同一个被撞对象，则存入该碰撞情景，避免碰撞重复记录
              hitDirections.push({
                direction: dir,
                platform,
                target,
              });
            }
            
            const maxHeight = window.innerHeight - this.groundHeight - target.radius * 2; 
            // 撞击 circleCollision 会修改物体坐标，所以需要坐标修复
            this.fixOverflow(target, maxHeight)
            // 被撞击物不发生位移
            platform.x = prevPlatform.x;
            platform.y = prevPlatform.y;
          }
        }
      } 

      return { hitDirections, isCombine: false };
    },

    /**
     * 判断两个被撞物体是否不相同
     */
    isDifferentPlatfrom(p1, p2) {
      return (p1.type !== p2.type || p1.x !== p2.x || p1.y !== p2.y);
    },

    /**
     * 判断两次碰撞是否相同
     */
    isSameCollision(c1, c2) {
      return (c1.direction === c2.direction && c1.target.type === c2.target.type && c1.platform.type === c2.platform.type);
    },

    /**
     * 碰撞环检测，不同于链表环的检测，我们这里只检测 [..., 1, 2, 1,...] 这种碰撞环情况的出现
     */
    hasCollisionCircle(collisions) {
      let index = 0;
      while((index + 2) < collisions.length) {
        if (this.isSameCollision(collisions[index], collisions[index+2]) && !this.isSameCollision(collisions[index], collisions[index+1])) {
          return true;
        } 
        index++;
      }
           
      return false;
    },

    /**
     * 计算撞击面位于主动撞击物体的方位
     * @param target 实施撞击的物体
     * @param platform 被撞击的物体
     */
    hitDirection(target, platform) {
      // 以target为参照物计算碰撞的方位
      if (Math.abs(target.x - platform.x) > Math.abs(target.y - platform.y)) {
        // 由于碰撞物体都是圆形，所以把距离最远的坐标轴看作是碰撞方位的方向
        if (target.x > platform.x) {
          return 'left';
        } else {
          return 'right';
        }
      } else {
        if (target.y > platform.y) {
          return 'top';
        } else {
          return 'bottom';
        }
      }
    },

    /**
     * 撞击墙面坐标修复
     * @param target 实施撞击的物体
     * @param maxHeight 地面高度
     */
    fixOverflow(target, maxHeight) {
      // 撞击到地面
      if (target.y > maxHeight) { 
        target.isStatic = true
        target.y = maxHeight
      }

      // 撞击到左边墙面
      if (target.x < 0) { 
        target.x = 0
        this.fruitCollisions.push({
          direction: 'left',
          platform: {
            type: -1,
          },
          target,
        })
      }

      // 撞击到右边墙面
      if (target.x+target.radius*2 > window.innerWidth) { 
        target.x = window.innerWidth - target.radius*2
        this.fruitCollisions.push({
          direction: 'right',
          platform: {
            type: -1,
          },
          target,
        })
      }
    }
  }
}
</script>