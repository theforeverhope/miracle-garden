System.register("chunks:///_virtual/AudioManager.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(i){var t,e,o,r,n,a,u,c,s;return{setters:[function(i){t=i.applyDecoratedDescriptor,e=i.inheritsLoose,o=i.initializerDefineProperty,r=i.assertThisInitialized},function(i){n=i.cclegacy,a=i._decorator,u=i.AudioClip,c=i.AudioSource,s=i.Component}],execute:function(){var l,p,d,h,f;n._RF.push({},"b86d2Zvp6pKqoUTXqrQic+M","AudioManager",void 0);var g=a.ccclass,v=a.property;i("AudioManager",(l=g("AudioManager"),p=v([u]),l((f=t((h=function(i){function t(){for(var t,e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return t=i.call.apply(i,[this].concat(n))||this,o(t,"audioList",f,r(t)),t._dict={},t._audioSource=null,t}e(t,i);var n=t.prototype;return n.start=function(){for(var i=0;i<this.audioList.length;i++){var t=this.audioList[i];this._dict[t.name]=t}this._audioSource=this.getComponent(c)},n.update=function(i){},n.play=function(i){var t=this._dict[i];t&&this._audioSource.playOneShot(t)},t}(s)).prototype,"audioList",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),d=h))||d));n._RF.pop()}}}));

System.register("chunks:///_virtual/Bullet.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Constant.ts","./PoolManager.ts"],(function(t){var e,n,i,o,s,r,l;return{setters:[function(t){e=t.inheritsLoose},function(t){n=t.cclegacy,i=t._decorator,o=t.BoxCollider,s=t.Component},function(t){r=t.Constant},function(t){l=t.PoolManager}],execute:function(){var c;n._RF.push({},"161c2ISn31Am7GtiQM3KtNz","Bullet",void 0);var u=i.ccclass;i.property,t("Bullet",u("Bullet")(c=function(t){function n(){for(var e,n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))||this)._speed=0,e._isEnemyBullet=!1,e._direction=r.BulletDirection.Middle,e}e(n,t);var i=n.prototype;return i.onEnable=function(){this.getComponent(o).on("onTriggerEnter",this._onTriggerEnter,this)},i.onDisable=function(){this.getComponent(o).off("onTriggerEnter",this._onTriggerEnter,this)},i.start=function(){},i.update=function(t){var e=this.node.position,n=0;this._isEnemyBullet?(n=e.z+this._speed,this.node.setPosition(e.x,e.y,n)):(n=e.z-this._speed,this._direction===r.BulletDirection.Left?this.node.setPosition(e.x-.3*this._speed,e.y,n):this._direction===r.BulletDirection.Right?this.node.setPosition(e.x+.3*this._speed,e.y,n):this.node.setPosition(e.x,e.y,n)),(this._isEnemyBullet&&n>50||!this._isEnemyBullet&&n<-50)&&l.instance().putNode(this.node)},i.show=function(t,e,n){this._speed=t,this._isEnemyBullet=e,this._direction=n},i._onTriggerEnter=function(t){l.instance().putNode(this.node)},n}(s))||c);n._RF.pop()}}}));

System.register("chunks:///_virtual/BulletProp.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Constant.ts","./PoolManager.ts"],(function(e){var t,o,n,r,i,p,s;return{setters:[function(e){t=e.inheritsLoose},function(e){o=e.cclegacy,n=e._decorator,r=e.BoxCollider,i=e.Component},function(e){p=e.Constant},function(e){s=e.PoolManager}],execute:function(){var a;o._RF.push({},"717c2NVI6tCrpgziXVFjU9o","BulletProp",void 0);var l=n.ccclass;n.property,e("BulletProp",l("BulletProp")(a=function(e){function o(){for(var t,o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this)._propSpeed=.3,t._propXSpeed=.3,t._gameManager=null,t}t(o,e);var n=o.prototype;return n.onEnable=function(){this.getComponent(r).on("onTriggerEnter",this._onTriggerEnter,this)},n.onDisable=function(){this.getComponent(r).off("onTriggerEnter",this._onTriggerEnter,this)},n.update=function(e){var t=this.node.position;t.x>=15?this._propXSpeed=this._propSpeed:t.x<=-15&&(this._propXSpeed=-this._propSpeed),this.node.setPosition(t.x+this._propXSpeed,t.y,t.z-this._propSpeed),(t=this.node.position).z>50&&s.instance().putNode(this.node)},n.show=function(e,t){this._gameManager=e,this._propSpeed=t},n._onTriggerEnter=function(e){var t=e.selfCollider.node.name;t===p.BulletPropType.BULLET_H||t===p.BulletPropType.BULLET_S?this._gameManager.changeBulletType(t):this._gameManager.changeBulletType(p.BulletPropType.BULLET_M),s.instance().putNode(this.node)},o}(i))||a);o._RF.pop()}}}));

System.register("chunks:///_virtual/Constant.ts",["cc"],(function(t){var e,n;return{setters:[function(t){e=t.cclegacy,n=t._decorator}],execute:function(){var E,o;e._RF.push({},"a10c8DeOORDCpSBsdNNNEVe","Constant",void 0);var c=n.ccclass;n.property,t("Constant",c("Constant")(((o=function(){}).EnemyType={TYPE1:1,TYPE2:2},o.PlaneFormation={SINGLE:1,LINE:2,V:3},o.Combination={STAGE_ONE:1,STAGE_TWO:2,STAGE_THREE:3},o.CollisionType={MAIN_PLANE:2,ENEMY_PLANE:4,MAIN_BULLET:8,ENEMY_BULLET:16,BULLET_PROP:32},o.BulletPropType={BULLET_S:"bulletS",BULLET_M:"bulletM",BULLET_H:"bulletH"},o.BulletDirection={Left:1,Middle:2,Right:3},E=o))||E);e._RF.pop()}}}));

System.register("chunks:///_virtual/debug-view-runtime-control.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,o,i,n,s,l,r,a,g,h,p,c,C,d,m,u,L;return{setters:[function(t){e=t.applyDecoratedDescriptor,o=t.inheritsLoose,i=t.initializerDefineProperty,n=t.assertThisInitialized},function(t){s=t.cclegacy,l=t._decorator,r=t.Node,a=t.Color,g=t.Canvas,h=t.UITransform,p=t.instantiate,c=t.Label,C=t.RichText,d=t.Toggle,m=t.Button,u=t.director,L=t.Component}],execute:function(){var f,M,b,v,T,S,x,E,I;s._RF.push({},"b2bd1+njXxJxaFY3ymm06WU","debug-view-runtime-control",void 0);var A=l.ccclass,y=l.property;t("DebugViewRuntimeControl",(f=A("internal.DebugViewRuntimeControl"),M=y(r),b=y(r),v=y(r),f((x=e((S=function(t){function e(){for(var e,o=arguments.length,s=new Array(o),l=0;l<o;l++)s[l]=arguments[l];return e=t.call.apply(t,[this].concat(s))||this,i(e,"compositeModeToggle",x,n(e)),i(e,"singleModeToggle",E,n(e)),i(e,"EnableAllCompositeModeButton",I,n(e)),e._single=0,e.strSingle=["No Single Debug","Vertex Color","Vertex Normal","Vertex Tangent","World Position","Vertex Mirror","Face Side","UV0","UV1","UV Lightmap","Project Depth","Linear Depth","Fragment Normal","Fragment Tangent","Fragment Binormal","Base Color","Diffuse Color","Specular Color","Transparency","Metallic","Roughness","Specular Intensity","IOR","Direct Diffuse","Direct Specular","Direct All","Env Diffuse","Env Specular","Env All","Emissive","Light Map","Shadow","AO","Fresnel","Direct Transmit Diffuse","Direct Transmit Specular","Env Transmit Diffuse","Env Transmit Specular","Transmit All","Direct Internal Specular","Env Internal Specular","Internal All","Fog"],e.strComposite=["Direct Diffuse","Direct Specular","Env Diffuse","Env Specular","Emissive","Light Map","Shadow","AO","Normal Map","Fog","Tone Mapping","Gamma Correction","Fresnel","Transmit Diffuse","Transmit Specular","Internal Specular","TT"],e.strMisc=["CSM Layer Coloration","Lighting With Albedo"],e.compositeModeToggleList=[],e.singleModeToggleList=[],e.miscModeToggleList=[],e.textComponentList=[],e.labelComponentList=[],e.textContentList=[],e.hideButtonLabel=void 0,e._currentColorIndex=0,e.strColor=["<color=#ffffff>","<color=#000000>","<color=#ff0000>","<color=#00ff00>","<color=#0000ff>"],e.color=[a.WHITE,a.BLACK,a.RED,a.GREEN,a.BLUE],e}o(e,t);var s=e.prototype;return s.start=function(){if(this.node.parent.getComponent(g)){var t=this.node.parent.getComponent(h),e=.5*t.width,o=.5*t.height,i=.1*e-e,n=o-.1*o,s=this.node.getChildByName("MiscMode"),l=p(s);l.parent=this.node,l.name="Buttons";var r=p(s);r.parent=this.node,r.name="Titles";for(var u=0;u<2;u++){var L=p(this.EnableAllCompositeModeButton.getChildByName("Label"));L.setPosition(i+(u>0?450:150),n,0),L.setScale(.75,.75,.75),L.parent=r;var f=L.getComponent(c);f.string=u?"----------Composite Mode----------":"----------Single Mode----------",f.color=a.WHITE,f.overflow=0,this.labelComponentList[this.labelComponentList.length]=f}n-=20;for(var M=0,b=0;b<this.strSingle.length;b++,M++){b===this.strSingle.length>>1&&(i+=200,M=0);var v=b?p(this.singleModeToggle):this.singleModeToggle;v.setPosition(i,n-20*M,0),v.setScale(.5,.5,.5),v.parent=this.singleModeToggle.parent;var T=v.getComponentInChildren(C);T.string=this.strSingle[b],this.textComponentList[this.textComponentList.length]=T,this.textContentList[this.textContentList.length]=T.string,v.on(d.EventType.TOGGLE,this.toggleSingleMode,this),this.singleModeToggleList[b]=v}i+=200,this.EnableAllCompositeModeButton.setPosition(i+15,n,0),this.EnableAllCompositeModeButton.setScale(.5,.5,.5),this.EnableAllCompositeModeButton.on(m.EventType.CLICK,this.enableAllCompositeMode,this),this.EnableAllCompositeModeButton.parent=l;var S=this.EnableAllCompositeModeButton.getComponentInChildren(c);this.labelComponentList[this.labelComponentList.length]=S;var x=p(this.EnableAllCompositeModeButton);x.setPosition(i+90,n,0),x.setScale(.5,.5,.5),x.on(m.EventType.CLICK,this.changeTextColor,this),x.parent=l,(S=x.getComponentInChildren(c)).string="TextColor",this.labelComponentList[this.labelComponentList.length]=S;var E=p(this.EnableAllCompositeModeButton);E.setPosition(i+200,n,0),E.setScale(.5,.5,.5),E.on(m.EventType.CLICK,this.hideUI,this),E.parent=this.node.parent,(S=E.getComponentInChildren(c)).string="Hide UI",this.labelComponentList[this.labelComponentList.length]=S,this.hideButtonLabel=S,n-=40;for(var I=0;I<this.strMisc.length;I++){var A=p(this.compositeModeToggle);A.setPosition(i,n-20*I,0),A.setScale(.5,.5,.5),A.parent=s;var y=A.getComponentInChildren(C);y.string=this.strMisc[I],this.textComponentList[this.textComponentList.length]=y,this.textContentList[this.textContentList.length]=y.string,A.getComponent(d).isChecked=!!I,A.on(d.EventType.TOGGLE,I?this.toggleLightingWithAlbedo:this.toggleCSMColoration,this),this.miscModeToggleList[I]=A}n-=150;for(var D=0;D<this.strComposite.length;D++){var B=D?p(this.compositeModeToggle):this.compositeModeToggle;B.setPosition(i,n-20*D,0),B.setScale(.5,.5,.5),B.parent=this.compositeModeToggle.parent;var w=B.getComponentInChildren(C);w.string=this.strComposite[D],this.textComponentList[this.textComponentList.length]=w,this.textContentList[this.textContentList.length]=w.string,B.on(d.EventType.TOGGLE,this.toggleCompositeMode,this),this.compositeModeToggleList[D]=B}}else console.error("debug-view-runtime-control should be child of Canvas")},s.isTextMatched=function(t,e){var o=new String(t),i=o.search(">");return-1===i?t===e:(o=(o=o.substr(i+1)).substr(0,o.search("<")))===e},s.toggleSingleMode=function(t){for(var e=u.root.debugView,o=t.getComponentInChildren(C),i=0;i<this.strSingle.length;i++)this.isTextMatched(o.string,this.strSingle[i])&&(e.singleMode=i)},s.toggleCompositeMode=function(t){for(var e=u.root.debugView,o=t.getComponentInChildren(C),i=0;i<this.strComposite.length;i++)this.isTextMatched(o.string,this.strComposite[i])&&e.enableCompositeMode(i,t.isChecked)},s.toggleLightingWithAlbedo=function(t){u.root.debugView.lightingWithAlbedo=t.isChecked},s.toggleCSMColoration=function(t){u.root.debugView.csmLayerColoration=t.isChecked},s.enableAllCompositeMode=function(t){var e=u.root.debugView;e.enableAllCompositeMode(!0);for(var o=0;o<this.compositeModeToggleList.length;o++){this.compositeModeToggleList[o].getComponent(d).isChecked=!0}var i=this.miscModeToggleList[0].getComponent(d);i.isChecked=!1,e.csmLayerColoration=!1,(i=this.miscModeToggleList[1].getComponent(d)).isChecked=!0,e.lightingWithAlbedo=!0},s.hideUI=function(t){var e=this.node.getChildByName("Titles"),o=!e.active;this.singleModeToggleList[0].parent.active=o,this.miscModeToggleList[0].parent.active=o,this.compositeModeToggleList[0].parent.active=o,this.EnableAllCompositeModeButton.parent.active=o,e.active=o,this.hideButtonLabel.string=o?"Hide UI":"Show UI"},s.changeTextColor=function(t){this._currentColorIndex++,this._currentColorIndex>=this.strColor.length&&(this._currentColorIndex=0);for(var e=0;e<this.textComponentList.length;e++)this.textComponentList[e].string=this.strColor[this._currentColorIndex]+this.textContentList[e]+"</color>";for(var o=0;o<this.labelComponentList.length;o++)this.labelComponentList[o].color=this.color[this._currentColorIndex]},s.onLoad=function(){},s.update=function(t){},e}(L)).prototype,"compositeModeToggle",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),E=e(S.prototype,"singleModeToggle",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),I=e(S.prototype,"EnableAllCompositeModeButton",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),T=S))||T));s._RF.pop()}}}));

System.register("chunks:///_virtual/EnemyPlane.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Constant.ts","./PoolManager.ts"],(function(e){var t,n,i,o,r,a,s,l,u,c;return{setters:[function(e){t=e.applyDecoratedDescriptor,n=e.inheritsLoose,i=e.initializerDefineProperty,o=e.assertThisInitialized},function(e){r=e.cclegacy,a=e._decorator,s=e.BoxCollider,l=e.Component},function(e){u=e.Constant},function(e){c=e.PoolManager}],execute:function(){var h,p,g;r._RF.push({},"cd7bf/YuodAvLp3hVusNCUx","EnemyPlane",void 0);var d=a.ccclass,m=a.property;e("EnemyPlane",d("EnemyPlane")((g=t((p=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return t=e.call.apply(e,[this].concat(r))||this,i(t,"createBulletTime",g,o(t)),t._speed=0,t._curCreateBulletTime=0,t._needBullet=!1,t._gameManager=null,t}n(t,e);var r=t.prototype;return r.onEnable=function(){this.getComponent(s).on("onTriggerEnter",this._onTriggerEnter,this)},r.onDisable=function(){this.getComponent(s).off("onTriggerEnter",this._onTriggerEnter,this)},r.start=function(){},r.update=function(e){var t=this.node.position,n=t.z+this._speed;this.node.setPosition(t.x,t.y,n),this._needBullet&&(this._curCreateBulletTime+=e,this._curCreateBulletTime>this.createBulletTime&&(this._gameManager.createEnemyBullet(this.node.getPosition()),this._curCreateBulletTime=0)),n>50&&c.instance().putNode(this.node)},r.show=function(e,t,n){this._gameManager=e,this._speed=t,this._needBullet=n},r._onTriggerEnter=function(e){var t=e.otherCollider.getGroup();t!==u.CollisionType.MAIN_PLANE&&t!==u.CollisionType.MAIN_BULLET||(this._gameManager.playAudioEffect("enemy"),c.instance().putNode(this.node),this._gameManager.createEnemyExplosion(this.node.position),this._gameManager.addScore())},t}(l)).prototype,"createBulletTime",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),h=p))||h);r._RF.pop()}}}));

System.register("chunks:///_virtual/Explosion.ts",["./rollupPluginModLoBabelHelpers.js","cc","./PoolManager.ts"],(function(n){var o,t,e,c,i;return{setters:[function(n){o=n.inheritsLoose},function(n){t=n.cclegacy,e=n._decorator,c=n.Component},function(n){i=n.PoolManager}],execute:function(){var s;t._RF.push({},"b927fwwX9FCaqY9KukAnXAD","Explosion",void 0);var r=e.ccclass;e.property,n("Explosion",r("Explosion")(s=function(n){function t(){return n.apply(this,arguments)||this}o(t,n);var e=t.prototype;return e.onEnable=function(){this.scheduleOnce(this._putBack,1)},e._putBack=function(){i.instance().putNode(this.node)},t}(c))||s);t._RF.pop()}}}));

System.register("chunks:///_virtual/GameManager.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Bullet.ts","./Constant.ts","./EnemyPlane.ts","./BulletProp.ts","./MainPlane.ts","./AudioManager.ts","./PoolManager.ts"],(function(e){var t,n,i,l,o,r,a,u,s,c,h,b,p,m,y,g,f,P,d,_,S;return{setters:[function(e){t=e.applyDecoratedDescriptor,n=e.inheritsLoose,i=e.initializerDefineProperty,l=e.assertThisInitialized},function(e){o=e.cclegacy,r=e._decorator,a=e.Node,u=e.Prefab,s=e.Label,c=e.Animation,h=e.math,b=e.BoxCollider,p=e.macro,m=e.Component},function(e){y=e.Bullet},function(e){g=e.Constant},function(e){f=e.EnemyPlane},function(e){P=e.BulletProp},function(e){d=e.MainPlane},function(e){_=e.AudioManager},function(e){S=e.PoolManager}],execute:function(){var E,T,C,v,w,z,M,L,B,N,A,I,G,x,R,H,D,O,F,U,V,k,Y,j,J,W,X,q,K,Q,Z,$,ee,te,ne,ie,le,oe,re,ae,ue,se,ce,he,be,pe,me;o._RF.push({},"b51d2dzXghICIH7HDD/t9Jf","GameManager",void 0);var ye=r.ccclass,ge=r.property;e("GameManager",(E=ye("GameManager"),T=ge(a),C=ge(u),v=ge(u),w=ge(u),z=ge(u),M=ge(u),L=ge(a),B=ge(u),N=ge(u),A=ge(u),I=ge(u),G=ge(u),x=ge(a),R=ge(a),H=ge(s),D=ge(s),O=ge(c),F=ge(_),U=ge(u),E((Y=t((k=function(e){function t(){for(var t,n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return t=e.call.apply(e,[this].concat(o))||this,i(t,"playerPlane",Y,l(t)),i(t,"bullet01",j,l(t)),i(t,"bullet02",J,l(t)),i(t,"bullet03",W,l(t)),i(t,"bullet04",X,l(t)),i(t,"bullet05",q,l(t)),i(t,"shootTime",K,l(t)),i(t,"bulletSpeed",Q,l(t)),i(t,"bulletManager",Z,l(t)),i(t,"enemyPlane1",$,l(t)),i(t,"enemyPlane2",ee,l(t)),i(t,"createEmenyTime",te,l(t)),i(t,"enemySpeed1",ne,l(t)),i(t,"enemySpeed2",ie,l(t)),i(t,"bulletPropH",le,l(t)),i(t,"bulletPropS",oe,l(t)),i(t,"bulletPropM",re,l(t)),i(t,"bulletPropSpeed",ae,l(t)),i(t,"gamePanel",ue,l(t)),i(t,"endPanel",se,l(t)),i(t,"scoreLabel",ce,l(t)),i(t,"totalScoreLabel",he,l(t)),i(t,"endPanelAnim",be,l(t)),i(t,"audioManager",pe,l(t)),i(t,"enemyExplosion",me,l(t)),t.isGameStart=!1,t._score=0,t._isShoot=!1,t._curShootTime=0,t._curCreateEnemyTime=0,t._combinationInterval=g.Combination.STAGE_ONE,t._bulletType=g.BulletPropType.BULLET_M,t}n(t,e);var o=t.prototype;return o.start=function(){},o.update=function(e){if(this.isGameStart)if(this.playerPlane.getComponent(d).isDied)this.gameOver();else{this._curShootTime+=e;var t="bullet1";if(this._isShoot&&this._curShootTime>this.shootTime&&(this._bulletType===g.BulletPropType.BULLET_H?(this.createPlayerBulletH(),t="bullet2"):this._bulletType===g.BulletPropType.BULLET_S?(this.createPlayerBulletS(),t="bullet2"):this.createPlayerBullet(),this.playAudioEffect(t),this._curShootTime=0),this._curCreateEnemyTime+=e,this._combinationInterval===g.Combination.STAGE_ONE)this._curCreateEnemyTime>this.createEmenyTime&&(this.createEnemyPlane(),this._curCreateEnemyTime=0);else if(this._combinationInterval===g.Combination.STAGE_TWO){if(this._curCreateEnemyTime>.9*this.createEmenyTime)h.randomRangeInt(1,3)===g.PlaneFormation.SINGLE?this.createEnemyPlane():this.createCombinationLine(),this._curCreateEnemyTime=0}else if(this._curCreateEnemyTime>.8*this.createEmenyTime){var n=h.randomRangeInt(1,4);n===g.PlaneFormation.SINGLE?this.createEnemyPlane():n===g.PlaneFormation.LINE?this.createCombinationLine():this.createCombinationV(),this._curCreateEnemyTime=0}}},o.reset=function(){this._score=0,this.scoreLabel.string="0",this._curShootTime=0,this._curCreateEnemyTime=0,this._combinationInterval=g.Combination.STAGE_ONE,this._bulletType=g.BulletPropType.BULLET_M,this.playerPlane.setPosition(0,0,15)},o.gameStart=function(){this.isGameStart=!0,this._curShootTime=this.shootTime,this._changePlaneMode(),this.playerPlane.getComponent(d).init()},o.gameOver=function(){this.isGameStart=!1,this.gamePanel.active=!1,this.endPanel.active=!0,this.endPanelAnim.play(),this.totalScoreLabel.string=this._score.toString(),this._isShoot=!1,this.unschedule(this._modeChange),this._destroyAll()},o.createPlayerBullet=function(){var e=S.instance().getNode(this.bullet01,this.bulletManager),t=this.playerPlane.position;e.setPosition(t.x,t.y,t.z-7),e.getComponent(y).show(this.bulletSpeed,!1)},o.createPlayerBulletH=function(){var e=this.playerPlane.position,t=S.instance().getNode(this.bullet03,this.bulletManager);t.setPosition(e.x-2.5,e.y,e.z-7),t.getComponent(y).show(this.bulletSpeed,!1);var n=S.instance().getNode(this.bullet03,this.bulletManager);n.setPosition(e.x+2.5,e.y,e.z-7),n.getComponent(y).show(this.bulletSpeed,!1)},o.createPlayerBulletS=function(){var e=this.playerPlane.position,t=S.instance().getNode(this.bullet05,this.bulletManager);t.setPosition(e.x,e.y,e.z-7),t.getComponent(y).show(this.bulletSpeed,!1);var n=S.instance().getNode(this.bullet05,this.bulletManager);n.setPosition(e.x-4,e.y,e.z-7),n.getComponent(y).show(this.bulletSpeed,!1,g.BulletDirection.Left);var i=S.instance().getNode(this.bullet05,this.bulletManager);i.setPosition(e.x+4,e.y,e.z-7),i.getComponent(y).show(this.bulletSpeed,!1,g.BulletDirection.Right)},o.createEnemyBullet=function(e){var t=S.instance().getNode(this.bullet02,this.bulletManager);t.setPosition(e.x,e.y,e.z+6),t.getComponent(y).show(1,!0);var n=t.getComponent(b);n.setGroup(g.CollisionType.ENEMY_BULLET),n.setMask(g.CollisionType.MAIN_PLANE)},o.setShoot=function(e){this._isShoot=e},o.createEnemyPlane=function(){var e=null,t=0;h.randomRangeInt(1,3)===g.EnemyType.TYPE1?(e=this.enemyPlane1,t=this.enemySpeed1):(e=this.enemyPlane2,t=this.enemySpeed2);var n=S.instance().getNode(e,this.node);n.getComponent(f).show(this,t,!0);var i=h.randomRangeInt(-25,26);n.setPosition(i,0,-50)},o.createEnemyExplosion=function(e){S.instance().getNode(this.enemyExplosion,this.node).setPosition(e)},o.createCombinationLine=function(){for(var e=new Array(5),t=0;t<e.length;t++){e[t]=S.instance().getNode(this.enemyPlane1,this.node);var n=e[t];n.setPosition(10*t-20,0,-50),n.getComponent(f).show(this,this.enemySpeed1,!1)}},o.createCombinationV=function(){for(var e=new Array(7),t=[[-21,0,-60],[-14,0,-55],[-7,0,-50],[0,0,-45],[7,0,-50],[14,0,-55],[21,0,-60]],n=0;n<e.length;n++){e[n]=S.instance().getNode(this.enemyPlane2,this.node);var i=e[n];i.setPosition(t[n][0],t[n][1],t[n][2]),i.getComponent(f).show(this,this.enemySpeed2,!1)}},o.addScore=function(){this._score++,this.scoreLabel.string=this._score.toString()},o.changeBulletType=function(e){this._bulletType=e},o.createBulletProp=function(){var e=h.randomRangeInt(1,4),t=null;t=1===e?this.bulletPropH:2===e?this.bulletPropS:this.bulletPropM;var n=S.instance().getNode(t,this.node);n.setPosition(15,0,-50),n.getComponent(P).show(this,-this.bulletPropSpeed)},o.playAudioEffect=function(e){this.audioManager.play(e)},o._changePlaneMode=function(){this.schedule(this._modeChange,10,p.REPEAT_FOREVER)},o._modeChange=function(){this._combinationInterval++,this.createBulletProp()},o._destroyAll=function(){for(var e=this.node.children,t=e.length,n=t-1;n>=0;n--){var i=e[n];S.instance().putNode(i)}for(var l=(t=(e=this.bulletManager.children).length)-1;l>=0;l--){var o=e[l];S.instance().putNode(o)}},t}(m)).prototype,"playerPlane",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),j=t(k.prototype,"bullet01",[C],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),J=t(k.prototype,"bullet02",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),W=t(k.prototype,"bullet03",[w],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),X=t(k.prototype,"bullet04",[z],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),q=t(k.prototype,"bullet05",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),K=t(k.prototype,"shootTime",[ge],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.1}}),Q=t(k.prototype,"bulletSpeed",[ge],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.3}}),Z=t(k.prototype,"bulletManager",[L],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),$=t(k.prototype,"enemyPlane1",[B],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),ee=t(k.prototype,"enemyPlane2",[N],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),te=t(k.prototype,"createEmenyTime",[ge],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),ne=t(k.prototype,"enemySpeed1",[ge],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.2}}),ie=t(k.prototype,"enemySpeed2",[ge],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.3}}),le=t(k.prototype,"bulletPropH",[A],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),oe=t(k.prototype,"bulletPropS",[I],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),re=t(k.prototype,"bulletPropM",[G],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),ae=t(k.prototype,"bulletPropSpeed",[ge],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.1}}),ue=t(k.prototype,"gamePanel",[x],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),se=t(k.prototype,"endPanel",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),ce=t(k.prototype,"scoreLabel",[H],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),he=t(k.prototype,"totalScoreLabel",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),be=t(k.prototype,"endPanelAnim",[O],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),pe=t(k.prototype,"audioManager",[F],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),me=t(k.prototype,"enemyExplosion",[U],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),V=k))||V));o._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./debug-view-runtime-control.ts","./AudioManager.ts","./Bullet.ts","./BulletProp.ts","./Constant.ts","./EnemyPlane.ts","./Explosion.ts","./GameManager.ts","./MainPlane.ts","./MovingBackground.ts","./PoolManager.ts","./UIManager.ts"],(function(){return{setters:[null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/MainPlane.ts",["./rollupPluginModLoBabelHelpers.js","cc","./Constant.ts"],(function(i){var e,t,n,o,r,l,s,a,u,c,p;return{setters:[function(i){e=i.applyDecoratedDescriptor,t=i.inheritsLoose,n=i.initializerDefineProperty,o=i.assertThisInitialized},function(i){r=i.cclegacy,l=i._decorator,s=i.Node,a=i.BoxCollider,u=i.AudioSource,c=i.Component},function(i){p=i.Constant}],execute:function(){var f,h,d,g,_,b,y,C;r._RF.push({},"951e1Nv1qxAg6dHu43Mnw7+","MainPlane",void 0);var E=l.ccclass,v=l.property;i("MainPlane",(f=E("MainPlane"),h=v(s),d=v(s),f((b=e((_=function(i){function e(){for(var e,t=arguments.length,r=new Array(t),l=0;l<t;l++)r[l]=arguments[l];return e=i.call.apply(i,[this].concat(r))||this,n(e,"speed",b,o(e)),n(e,"explosion",y,o(e)),n(e,"blood",C,o(e)),e.life=5,e.isDied=!1,e._curLife=0,e._audioClip=null,e}t(e,i);var r=e.prototype;return r.onEnable=function(){this.getComponent(a).on("onTriggerEnter",this._onTriggerEnter,this)},r.onDisable=function(){this.getComponent(a).off("onTriggerEnter",this._onTriggerEnter,this)},r.init=function(){this._curLife=this.life,this.isDied=!1,this.explosion.active=!1,this.blood.setScale(1,1,1)},r.start=function(){this._audioClip=this.getComponent(u)},r._onTriggerEnter=function(i){var e=i.otherCollider.getGroup();e!==p.CollisionType.ENEMY_PLANE&&e!==p.CollisionType.ENEMY_BULLET||(this._curLife--,this.blood.setScale(this._curLife/this.life,1,1),this._curLife<=0&&(this._audioClip.play(),this.explosion.active=!0,this.isDied=!0))},e}(c)).prototype,"speed",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),y=e(_.prototype,"explosion",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),C=e(_.prototype,"blood",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=_))||g));r._RF.pop()}}}));

System.register("chunks:///_virtual/MovingBackground.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(i){var n,o,t,e,r,s,a,g;return{setters:[function(i){n=i.applyDecoratedDescriptor,o=i.inheritsLoose,t=i.initializerDefineProperty,e=i.assertThisInitialized},function(i){r=i.cclegacy,s=i._decorator,a=i.Node,g=i.Component}],execute:function(){var u,c,b,d,p,h,l;r._RF.push({},"68907aXyqZEMJ+ua3oRsUDz","MovingBackground",void 0);var k=s.ccclass,v=s.property;i("MovingBackground",(u=k("MovingBackground"),c=v(a),b=v(a),u((h=n((p=function(i){function n(){for(var n,o=arguments.length,r=new Array(o),s=0;s<o;s++)r[s]=arguments[s];return n=i.call.apply(i,[this].concat(r))||this,t(n,"background01",h,e(n)),t(n,"background02",l,e(n)),n._bgMovingSpeed=10,n._bgMovingRange=90,n}o(n,i);var r=n.prototype;return r.start=function(){this._init()},r.update=function(i){this._moveBackground(i)},r._init=function(){this.background01.setPosition(0,0,0),this.background02.setPosition(0,0,-this._bgMovingRange)},r._moveBackground=function(i){this.background01.setPosition(0,0,this.background01.position.z+this._bgMovingSpeed*i),this.background02.setPosition(0,0,this.background02.position.z+this._bgMovingSpeed*i),this.background01.position.z>this._bgMovingRange&&this.background01.setPosition(0,0,this.background02.position.z-this._bgMovingRange),this.background02.position.z>this._bgMovingRange&&this.background02.setPosition(0,0,this.background01.position.z-this._bgMovingRange)},n}(g)).prototype,"background01",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),l=n(p.prototype,"background02",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),d=p))||d));r._RF.pop()}}}));

System.register("chunks:///_virtual/PoolManager.ts",["cc"],(function(t){var n,e,o,i;return{setters:[function(t){n=t.cclegacy,e=t._decorator,o=t.instantiate,i=t.NodePool}],execute:function(){var a,c;n._RF.push({},"32dbbz7/YFCAqwWvZ91AMsZ","PoolManager",void 0);var r=e.ccclass;e.property,t("PoolManager",r("PoolManager")(((c=function(){function t(){this._dictPool={},this._dictPrefab={}}t.instance=function(){return this._instance||(this._instance=new t),this._instance};var n=t.prototype;return n.getNode=function(t,n){var e=t.data.name,a=null;this._dictPrefab[e]=t;var c=this._dictPool[e];return c?a=c.size()>0?c.get():o(t):(this._dictPool[e]=new i,a=o(t)),a.parent=n,a.active=!0,a},n.putNode=function(t){var n=t.name;t.parent=null,this._dictPool[n]||(this._dictPool[n]=new i),this._dictPool[n].put(t)},t}())._instance=null,a=c))||a);n._RF.pop()}}}));

System.register("chunks:///_virtual/UIManager.ts",["./rollupPluginModLoBabelHelpers.js","cc","./GameManager.ts"],(function(e){var t,a,n,i,r,o,l,s,u,c;return{setters:[function(e){t=e.applyDecoratedDescriptor,a=e.inheritsLoose,n=e.initializerDefineProperty,i=e.assertThisInitialized},function(e){r=e.cclegacy,o=e._decorator,l=e.Node,s=e.SystemEvent,u=e.Component},function(e){c=e.GameManager}],execute:function(){var p,g,h,f,m,y,b,d,M,v,P,_,S,E;r._RF.push({},"d559eIX9etDYK4Vt6b1praj","UIManager",void 0);var z=o.ccclass,T=o.property;e("UIManager",(p=z("UIManager"),g=T(l),h=T(c),f=T(l),m=T(l),y=T(l),p((M=t((d=function(e){function t(){for(var t,a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return t=e.call.apply(e,[this].concat(r))||this,n(t,"speed",M,i(t)),n(t,"playerPlane",v,i(t)),n(t,"gameManager",P,i(t)),n(t,"startPanel",_,i(t)),n(t,"gamePanel",S,i(t)),n(t,"endPanel",E,i(t)),t}a(t,e);var r=t.prototype;return r.start=function(){this.node.on(s.EventType.TOUCH_MOVE,this._touchMove,this),this.node.on(s.EventType.TOUCH_START,this._touchStart,this),this.node.on(s.EventType.TOUCH_END,this._touchEnd,this),this.startPanel.active=!0},r.update=function(e){},r.reStart=function(){this.endPanel.active=!1,this.startPanel.active=!0,this.gameManager.reset(),this.gameManager.playAudioEffect("button")},r._touchMove=function(e){if(this.gameManager.isGameStart){var t=e.getDelta(),a=this.playerPlane.position;this.playerPlane.setPosition(a.x+.01*this.speed*t.x,a.y,a.z-.01*this.speed*t.y)}},r._touchStart=function(e){this.gameManager.isGameStart?this.gameManager.setShoot(!0):(this.startPanel.active=!1,this.gamePanel.active=!0,this.gameManager.playAudioEffect("button"),this.gameManager.gameStart())},r._touchEnd=function(e){this.gameManager.isGameStart&&this.gameManager.setShoot(!1)},t}(u)).prototype,"speed",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),v=t(d.prototype,"playerPlane",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),P=t(d.prototype,"gameManager",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_=t(d.prototype,"startPanel",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),S=t(d.prototype,"gamePanel",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),E=t(d.prototype,"endPanel",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),b=d))||b));r._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});