var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Body;
(function (Body) {
    var RigidBody = (function (_super) {
        __extends(RigidBody, _super);
        function RigidBody() {
            return _super.call(this) || this;
        }
        RigidBody.prototype.rectangle = function (x, y, width, height, option) {
            if (option === void 0) { option = {}; }
            var matterRectangle = Bodies.rectangle(x, y, width, height, option);
            console.log(matterRectangle);
            World.add(engine.world, matterRectangle);
            var egretRectangle = new egret.Shape();
            egretRectangle.graphics.beginFill(0x00ff00, 1);
            egretRectangle.graphics.drawRect(x / 2, y / 2, width, height);
            egretRectangle.graphics.endFill();
            egretRectangle.anchorOffsetX = width / 2;
            egretRectangle.anchorOffsetY = height / 2;
            this.addChild(egretRectangle);
            matterRectangle["display"] = egretRectangle;
        };
        RigidBody.prototype.run = function () {
            var bodies = Matter.Composite.allBodies(engine.world);
            for (var item = 0; item < bodies.length; item++) {
                var body = bodies[item], display = body['display'];
                display.x = body.position.x;
                display.y = body.position.y;
                display.rotation = body.angle / Math.PI / 2 * 360;
            }
        };
        return RigidBody;
    }(eui.Component));
    Body.RigidBody = RigidBody;
    __reflect(RigidBody.prototype, "Body.RigidBody");
})(Body || (Body = {}));
