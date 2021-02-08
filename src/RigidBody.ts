module Body {
    export class RigidBody extends eui.Component{
        constructor(){
            super()
        }
        public creatBody(x:number,y:number,width:number,height:number,option={}){
            let matterRectangle = Bodies.rectangle(x,y,width,height,option)            
            World.add(engine.world,matterRectangle)
            return matterRectangle
        }
        public rectangle(x:number,y:number,width:number,height:number,option={}){
            const matterRectangle = this.creatBody(x,y,width,height,option)
            const egretRectangle = new egret.Shape()
            egretRectangle.graphics.beginFill(0x00ff00, 1);
            console.log(x,y);
            
            egretRectangle.graphics.drawRect(0, 0, width, height);
            egretRectangle.graphics.endFill();
            egretRectangle.anchorOffsetX = width / 2;
            egretRectangle.anchorOffsetY = height / 2;
            this.addChild(egretRectangle)

            matterRectangle["display"] = egretRectangle;
        }
        public creatImg(x:number,y:number,width:number,height:number,src:string,option={}){
            const matterRectangle = this.creatBody(x,y,width,height,option)
            const egretImg = new eui.Image(src)
            egretImg.width = width
            egretImg.height = height
            egretImg.x = x
            egretImg.y = y
            egretImg.anchorOffsetX = width/2
            egretImg.anchorOffsetY = height/2
            this.addChild(egretImg)
            matterRectangle["display"] = egretImg;
        }
        public run (){
            const bodies = Matter.Composite.allBodies(engine.world)
            for(let item = 0;item<bodies.length;item++){
                let body = bodies[item],display = body['display']

                display.x = body.position.x;
                display.y = body.position.y
                display.rotation = body.angle / Math.PI / 2 * 360;
            }
        }
    }
}