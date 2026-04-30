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
    var u_CameraPosition = gl.getUniformLocation(program, "cameraPosition");
    var lightPosition = gl.getUniformLocation(program, "lightPosition");
    var aspectRatio = gl.getUniformLocation(program, "aspectRatio");
    gl.uniform1f(aspectRatio, canvas.clientWidth / canvas.clientHeight);

    var pos1 = gl.getUniformLocation(program, "pos1");
    var pos2 = gl.getUniformLocation(program, "pos2");
    var pos3 = gl.getUniformLocation(program, "pos3");
    var pos4 = gl.getUniformLocation(program, "pos4");
    var pos5 = gl.getUniformLocation(program, "pos5");
    var pos6 = gl.getUniformLocation(program, "pos6");
    var pos7 = gl.getUniformLocation(program, "pos7");
    var pos8 = gl.getUniformLocation(program, "pos8");


    // Lookup fragment data
    var u_FragColor = gl.getUniformLocation(program, "u_FragColor");

    //gl.enable(gl.DEPTH_TEST);

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

    let camera = new Camera(canvas);
    camera.transform.position = new MyVector3(0, 0, -5);

    let ball1 = new MetaBall();
    let ball2 = new MetaBall();
    let ball3 = new MetaBall();
    let ball4 = new MetaBall();
    let ball5 = new MetaBall();
    let ball6 = new MetaBall();
    let ball7 = new MetaBall();
    let ball8 = new MetaBall();

    let metaBalls = [];
    metaBalls.push(ball1);
    metaBalls.push(ball2);
    metaBalls.push(ball3);
    metaBalls.push(ball4);
    metaBalls.push(ball5);
    metaBalls.push(ball6);
    metaBalls.push(ball7);
    metaBalls.push(ball8);

    let triggerQuad = new TriggerQuad(gl);
    triggerQuad.colour = new MyVector3(1, 0, 0);

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
            move.x -= 5 * deltaTime;
            //console.log('A is pressed');
        }
        if (isKeyPressed('s')) 
        {
            move.z -= 5 * deltaTime;
            //console.log('S is pressed');
        }
        if (isKeyPressed('d')) 
        {
            move.x += 5 * deltaTime;
            //console.log('D is pressed');
        }

        //console.log(`${move.x}`, `${move.y}`, `${move.z}`);
        camera.Move(move);

        for(let i = 0; i < 8; i += 1)
        {
            metaBalls[i].position.x += metaBalls[i].direction.x * metaBalls[i].speed * deltaTime;
            metaBalls[i].position.y += metaBalls[i].direction.y * metaBalls[i].speed * deltaTime;
            metaBalls[i].position.z += metaBalls[i].direction.z * metaBalls[i].speed * deltaTime;

            if(metaBalls[i].position.x < -5 || metaBalls[i].position.x > 2.5) metaBalls[i].direction.x *= -1;
            if(metaBalls[i].position.y < -5 || metaBalls[i].position.y > 2.5) metaBalls[i].direction.y *= -1;
            if(metaBalls[i].position.z < -5 || metaBalls[i].position.z > 2.5) metaBalls[i].direction.z *= -1;
        }

        //this is because webgl 1.0 doesnt support uniform buffers so passing variables to shaders are more difficult
        gl.uniform3f(pos1, metaBalls[0].position.x, metaBalls[0].position.y, metaBalls[0].position.z);
        gl.uniform3f(pos2, metaBalls[1].position.x, metaBalls[1].position.y, metaBalls[1].position.z);
        gl.uniform3f(pos3, metaBalls[2].position.x, metaBalls[2].position.y, metaBalls[2].position.z);
        gl.uniform3f(pos4, metaBalls[3].position.x, metaBalls[3].position.y, metaBalls[3].position.z);
        gl.uniform3f(pos5, metaBalls[4].position.x, metaBalls[4].position.y, metaBalls[4].position.z);
        gl.uniform3f(pos6, metaBalls[5].position.x, metaBalls[5].position.y, metaBalls[5].position.z);
        gl.uniform3f(pos7, metaBalls[6].position.x, metaBalls[6].position.y, metaBalls[6].position.z);
        gl.uniform3f(pos8, metaBalls[7].position.x, metaBalls[7].position.y, metaBalls[7].position.z);

        gl.uniform3f(u_CameraPosition, camera.transform.position.x, camera.transform.position.y, camera.transform.position.z); //update cameraPosition
        gl.uniform3f(lightPosition, 1, 2, -12);

        triggerQuad.Draw(u_FragColor, a_Position, program);
    }

    console.log("Everything is ready.");
    GameLoop();
};
