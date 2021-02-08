module Body {
    export  function mouse(engine, options) {
        var mouse = (engine ? engine.mouse : null) || (options ? options.mouse : null);

        if (!mouse) {
            if (engine && engine.render && engine.render.canvas) {
                mouse = Matter.Mouse.create(engine.render.canvas);
            } else if (options && options.element) {
                mouse = Matter.Mouse.create(options.element);
            } else {
                mouse = Matter.Mouse.create();
                Matter.Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
            }
        }

        var constraint = Matter.Constraint.create({ 
            label: 'Mouse Constraint',
            pointA: mouse.position,
            pointB: { x: 0, y: 0 },
            length: 0.01, 
            stiffness: 0.1,
            angularStiffness: 1,
            render: {
                strokeStyle: '#90EE90',
                lineWidth: 3
            }
        });

        var defaults = {
            type: 'mouseConstraint',
            mouse: mouse,
            element: null,
            body: null,
            constraint: constraint,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            }
        };

        var mouseConstraint = Matter.Common.extend(defaults, options);

        Matter.Events.on(engine, 'beforeUpdate', function() {
            var allBodies = Matter.Composite.allBodies(engine.world);
            Matter.MouseConstraint.update(mouseConstraint, allBodies);
            Matter.Events.trigger(mouseConstraint);
        });

        return mouseConstraint;
    };
}