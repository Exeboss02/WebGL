/**
 * Draw on Canvas
 */

/* global getWebGLContext initShaders */

window.onload = (function() {
    "use strict";

    // Vertex shader program
    var VSHADER_SOURCE =
        'attribute vec3 position;\n' +
        'attribute vec3 colour;\n' +
        'attribute float size;\n' +
        'varying vec3 vColour;\n' +
        'void main() {\n' +
        '   gl_Position = vec4(position, 1.0);\n' +
        '   gl_PointSize = size;\n' +
        '   vColour = colour;\n' +
        '}\n';

    // Fragment shader program
    var FSHADER_SOURCE =
        'precision mediump float;\n' + // has to add precision (???)
        'varying vec3 vColour;\n' +
        'void main() {\n' +
        '   gl_FragColor = vec4(vColour, 1.0);\n' +
        '}\n';

    var canvas = document.getElementById('canvas1');
    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log("Failed to get rendering context for WebGL");
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders!");
        return;
    }

    const screenWidth = 1000;
    const screenHeight = 600;

    var shaderProgram = gl.program;
    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, 'position');
    const sizeLocation = gl.getAttribLocation(shaderProgram, 'size');
    const colourLocation = gl.getAttribLocation(shaderProgram, 'colour');

    function vector3(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    function vertex(x = 0, y = 0, z = 0, r = 1, g = 0, b = 0, size = 50) {
        this.position = new vector3(x, y, z);
        this.colour = new vector3(r, g, b);
        this.size = size;
    }

    function AddElement(vertex) {
        vertexData.push(vertex.position.x);
        vertexData.push(vertex.position.y);
        vertexData.push(vertex.position.z);

        vertexData.push(vertex.colour.x);
        vertexData.push(vertex.colour.y);
        vertexData.push(vertex.colour.z);

        vertexData.push(vertex.size);
    }

    let vertexData = [];

    function overlap(baseIndex, x, y) {
        let distanceVector = new vector3(x - vertexData[baseIndex], y - vertexData[baseIndex + 1]);
        let distance = Math.sqrt(Math.pow(distanceVector.x, 2) + Math.pow(distanceVector.y, 2));
        let pointRadius = vertexData[baseIndex + 6] / canvas.width;

        return distance < pointRadius;
    }

    function remove(baseIndex) {
        let hitColour = new vector3(
            vertexData[baseIndex + 3],
            vertexData[baseIndex + 4],
            vertexData[baseIndex + 5]
        );

        let hitSize = vertexData[baseIndex + 6];

        vertexData.splice(baseIndex, 7);
        return { hitColour, hitSize };
    }

    function Add4new(hitColour, hitSize) {
        for (let i = 0; i < 4; i += 1) {
            let px = Math.random() * screenWidth;
            let py = Math.random() * screenHeight;

            //convert to NDC
            let x = ((px - screenWidth / 2) / (screenWidth / 2));
            let y = (screenHeight / 2 - py) / (screenHeight / 2);

            let newVertex = new vertex(x, y, 0, hitColour.x, hitColour.y, hitColour.z, hitSize);
            AddElement(newVertex);
        }
    }

    function click(ev, canvas) {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.width/2) / (canvas.width/2);
        y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2);

        let hit = false;
        let i = 0;
        let hitColour = new vector3(0, 0, 0);
        let hitSize = 0;

        while (i < vertexData.length) {
            if (overlap(i, x, y)) {
                let removed = remove(i);
                hitColour = removed.hitColour;
                hitSize = removed.hitSize;
                hit = true;
            } else {
                i += 7; //increment if no removal
            }
        }

        if (hit) {
            Add4new(hitColour, hitSize);
        } else {
            let randomSize = Math.floor(Math.random() * 20) + 5;
            let r = Math.random();
            let g = Math.random();
            let b = Math.random();

            let newVertex = new vertex(x, y, 0, r, g, b, randomSize);
            AddElement(newVertex);
        }

        vertexBufferData = new Float32Array(vertexData);
        gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.DYNAMIC_DRAW);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, vertexData.length / 7);
    }

    canvas.onmousedown = function(ev) {
        click(ev, canvas);
    };

    const vertexBuffer = gl.createBuffer();
    let vertexBufferData = new Float32Array(vertexData);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(colourLocation);
    gl.enableVertexAttribArray(sizeLocation);

    const stride = 7 * Float32Array.BYTES_PER_ELEMENT;
    const offsetPosition = 0;
    const offsetColour = 3 * Float32Array.BYTES_PER_ELEMENT;
    const offsetSize = 6 * Float32Array.BYTES_PER_ELEMENT;

    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, stride, offsetPosition);
    gl.vertexAttribPointer(colourLocation, 3, gl.FLOAT, false, stride, offsetColour);
    gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, stride, offsetSize);

    gl.clearColor(0.0, 0.05, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, vertexData.length / 7);

    console.log("Everything is ready.");
})();
