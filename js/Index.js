function start() {

    var pos, $id = function(d) { return document.getElementById(d); };


    var tierra = new PhiloGL.O3D.Sphere({
        nlat: 30,
        nlong: 30,
        radius: 3,
        textures: '/earth.jpg'
    });


    PhiloGL('glCanvas', {
        camera: {
            position: {
                x: 0,
                y: 0,
                z: -10
            }
        },

        events: {

            onDragStart: function(e) {

                pos = {
                    x: e.x,
                    y: e.y
                };
            },
            onDragMove: function(e) {
                var z = this.camera.position.z,
                    sign = Math.abs(z) / z;

                tierra.rotation.y += -(pos.x - e.x) / 100;
                tierra.rotation.x += sign * (pos.y - e.y) / 100;
                tierra.update();
                pos.x = e.x;
                pos.y = e.y;
            },
            onMouseWheel: function(e) {
                e.stop();
                var camera = this.camera;
                camera.position.z += e.wheel;
                camera.update();
            },
            onKeyDown: function(e) {
                switch (e.key) {
                    case 'up':
                    case 'w':
                        var camera = this.camera;
                        camera.position.z += 1;
                        camera.update();
                        break;
                    case 'down':
                    case 's':
                        var camera = this.camera;
                        camera.position.z -= 1;
                        camera.update();
                        break;
                }
                if (e.code == 33) {
                    pichRate = 0.001;
                } else if (e.code == 34) {
                    pichRate = -0.001;
                }


            },
        },
        



        onLoad: function(app) {

            var gl = app.gl,
                program = app.program,
                scene = app.scene,
                canvas = app.canvas,
                camera = app.camera;


            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clearDepth(1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.viewport(0, 0, +canvas.width, +canvas.height);


            tierra.update();
            scene.add(tierra);
            draw();

            function draw() {

                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPHT_BUFFER_BIT);


                scene.render();

                PhiloGL.Fx.requestAnimationFrame(draw);
            }







        }


    });
}
