//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Matter = require('matter-js')
var Engine = Matter.Engine;//引擎.引擎模块包含创建和操作引擎的方法
var Render = Matter.Render;//基于HTML5画布的渲染器
var World = Matter.World;//演出舞台. Matter.js 中任何的物体都需要一个舞台/容器，而存放这些物体的地方，则称之为World(世界)
var Bodies = Matter.Bodies;//用于创建各种形状的物体，物体必须添加到Wolrd中，然后由引擎运行世界
var engine = Engine.create();
//render(渲染器)将要渲染的物理引擎是上面的engine，而渲染的对象是html网页的body
var mouseConstraint = Matter.MouseConstraint.create(engine, {});

var render = Render.create({element: document.body, engine: engine,options:{
    width:640,
    height:1136
}});
var shape,boxB

class Main extends eui.UILayer {
    public Engine = Matter.Engine;
    public container;
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        World.add(engine.world,Body.mouse(engine,{}))
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise<void>((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    protected createGameScene(): void {
        this.stage.addChild(new eui.Image("bg_jpg"))
        this.container = new Body.RigidBody()
        this.stage.addChild(this.container)
        // this.container.rectangle(50,50,100,100,{frictionAir:0.05})
        this.container.rectangle(315,0,630,1036)
        this.container.creatImg(320,558,115,172,'egret_icon_png')

        // let border = new egret.Shape()
        // border.graphics.beginFill(0x00ff00, 1);
        // border.graphics.drawRect(320,0,640, 100);
        // border.graphics.endFill();
        // border.anchorOffsetX = 640/ 2;
        // border.anchorOffsetY = 100 / 2;
        // this.stage.addChild(border)
        // let matterRectangle = Bodies.rectangle(100,0,640,100,{isStatic:true})            
        // World.add(engine.world,matterRectangle)
        // matterRectangle['display'] = border

        Engine.run(engine);//运行引擎
        Render.run(render);//运行渲染器
        this.runEngine()
    }
    runEngine() {
        egret.startTick(this.onTick, this);
    }

    private _lastTimestamp = 0;
    private onTick(timestamp: number) {
        this.container.run()
        return false;
    }
}
