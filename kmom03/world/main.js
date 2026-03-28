/**
 * Draw on Canvas
 */
/* global WebGLUtils, Matrix4, MyVector3, Transform, Texture, Material, Mesh, GameObject, Scene */

window.onload = function() {
    "use strict";

    var canvas;
    var gl;
    var program;

    // Get A WebGL context
    canvas = document.getElementById("canvas");
    gl = WebGLUtils.getWebGLContext(canvas);
    if (!gl) {
        return;
    }

    // Setup GLSL program
    program = WebGLUtils.createProgramFromScripts(
        gl,
        ["vertex-shader", "fragment-shader"]
    );
    gl.useProgram(program);

    // Look up vertex data
    var a_Position = gl.getAttribLocation(program, "a_Position");
    var u_ModelMatrix = gl.getUniformLocation(program, "u_ModelMatrix");
    var u_ProjectionMatrix = gl.getUniformLocation(program, "u_ProjectionMatrix");


    // Lookup fragment data
    var u_FragColor = gl.getUniformLocation(program, "u_FragColor");

    gl.enable(gl.DEPTH_TEST);

//----------------RENDER INITIALIZATION DONE----------------------------------------------------

// Object to keep track of which keys are pressed
const keysPressed = {};

// Listen for keydown events
document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    //console.log(`Key pressed: ${event.key}`);
});

// Listen for keyup events
document.addEventListener('keyup', function(event) {
    keysPressed[event.key] = false;
    //console.log(`Key released: ${event.key}`);
});

// Function to check if a key is currently pressed
function isKeyPressed(key) {
    return keysPressed[key] === true;
}
//----------------EVENTLISTENER INITIALIZATION DONE----------------------------------------------------


    let scene = new Scene();

    let camera = new Camera(canvas);
    camera.transform.position = new MyVector3(0, 0, -5);

    let cube1 = new GameObject(gl);
    cube1.transform.SetPosition(0, 0, 0);
    cube1.texture.Initialize(gl, "lava.jpg");
    cube1.shouldSample = true;
    scene.AddGameObject(cube1);

    let cube2 = new GameObject(gl);
    cube2.transform.SetPosition(-4, 0, 2);
    cube2.colour = new MyVector3(0, 1, 0.8);
    scene.AddGameObject(cube2);

    let cube3 = new GameObject(gl);
    cube3.transform.SetPosition(4, 0, 2);
    cube3.colour = new MyVector3(1, 0.06, 0.9);
    scene.AddGameObject(cube3);

    var speed = 1;

    const fpsCounter = document.getElementById("fpsCounter");

    var lastTick = null;
    var request = null;
    var fpsTimer = 0;
    var frameCounter = 0;
    var fps = 0;

    function GameLoop() {
        var now = Date.now();
        var deltaTime = (now - (lastTick || now)) / 1000;
        lastTick = now;

        fpsTimer += deltaTime;
        frameCounter += 1;

        if (fpsTimer >= 1) {
            fpsTimer = 0;
            fps = frameCounter;
            frameCounter = 0;

            fpsCounter.textContent = fps + ' fps';
        }

        request = window.requestAnimFrame(GameLoop);

        let move = new MyVector3(0, 0, 0);

        if (isKeyPressed('w')) 
        {
            move.z += 5 * deltaTime;
            //console.log(`${move.z}`);
        }
        if (isKeyPressed('a')) 
        {
            move.x += 5 * deltaTime;
            //console.log('A is pressed');
        }
        if (isKeyPressed('s')) 
        {
            move.z -= 5 * deltaTime;
            //console.log('S is pressed');
        }
        if (isKeyPressed('d')) 
        {
            move.x -= 5 * deltaTime;
            //console.log('D is pressed');
        }

        //console.log(`${move.x}`, `${move.y}`, `${move.z}`);
        camera.Move(move);

        camera.Update(gl, canvas, u_ProjectionMatrix);
        scene.UpdateGameObjects(deltaTime, speed);
        scene.DrawGameObjects(u_ModelMatrix, u_FragColor, a_Position, gl, program);

        //Update displayed camera values
        document.getElementById('eyeX').textContent = camera.eyePos.x.toFixed(2);
        document.getElementById('eyeY').textContent = camera.eyePos.y.toFixed(2);
        document.getElementById('eyeZ').textContent = camera.eyePos.z.toFixed(2);
        document.getElementById('atX').textContent = camera.lookAt.x.toFixed(2);
        document.getElementById('atY').textContent = camera.lookAt.y.toFixed(2);
        document.getElementById('atZ').textContent = camera.lookAt.z.toFixed(2);
        document.getElementById('upX').textContent = camera.upVector.x.toFixed(2);
        document.getElementById('upY').textContent = camera.upVector.y.toFixed(2);
        document.getElementById('upZ').textContent = camera.upVector.z.toFixed(2);
    }

    /**
     * Control panel
     */
    var playElement = document.getElementById("play");
    playElement.addEventListener("click", function() {
        if (request === null) {
            GameLoop();
        }
    });

    var pauseElement = document.getElementById("pause");
    pauseElement.addEventListener("click", function() {
        if (request) {
            window.cancelRequestAnimFrame(request);
            request = null;
            lastTick = null;
        }
    });

    var speedElement = document.getElementById("speed");
    speedElement.addEventListener("change", function() {
        speed = parseFloat(speedElement.value);
    });

    console.log("Everything is ready.");
    GameLoop();
};
