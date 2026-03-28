/* global WebGLUtils, Matrix4 */

const triangleData = new Float32Array([
    0.0,  0.5,
   -0.5, -0.5,
    0.5, -0.5,
]);

const cubeData = new Float32Array([
    // Front face
    -1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-left-front
     1.0, -1.0,  1.0,  1.0, 0.0,  // Bottom-right-front
     1.0,  1.0,  1.0,  1.0, 1.0,  // Top-right-front
    -1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-left-front
     1.0,  1.0,  1.0,  1.0, 1.0,  // Top-right-front
    -1.0,  1.0,  1.0,  0.0, 1.0,  // Top-left-front

    // Back face
    -1.0, -1.0, -1.0,  0.0, 0.0,  // Bottom-left-back
     1.0, -1.0, -1.0,  1.0, 0.0,  // Bottom-right-back
     1.0,  1.0, -1.0,  1.0, 1.0,  // Top-right-back
    -1.0, -1.0, -1.0,  0.0, 0.0,  // Bottom-left-back
     1.0,  1.0, -1.0,  1.0, 1.0,  // Top-right-back
    -1.0,  1.0, -1.0,  0.0, 1.0,  // Top-left-back

    // Top face
    -1.0,  1.0,  1.0,  0.0, 0.0,  // Top-left-front
     1.0,  1.0,  1.0,  1.0, 0.0,  // Top-right-front
     1.0,  1.0, -1.0,  1.0, 1.0,  // Top-right-back
    -1.0,  1.0,  1.0,  0.0, 0.0,  // Top-left-front
     1.0,  1.0, -1.0,  1.0, 1.0,  // Top-right-back
    -1.0,  1.0, -1.0,  0.0, 1.0,  // Top-left-back

    // Bottom face
    -1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-left-front
     1.0, -1.0,  1.0,  1.0, 0.0,  // Bottom-right-front
     1.0, -1.0, -1.0,  1.0, 1.0,  // Bottom-right-back
    -1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-left-front
     1.0, -1.0, -1.0,  1.0, 1.0,  // Bottom-right-back
    -1.0, -1.0, -1.0,  0.0, 1.0,  // Bottom-left-back

    // Right face
     1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-right-front
     1.0,  1.0,  1.0,  1.0, 0.0,  // Top-right-front
     1.0,  1.0, -1.0,  1.0, 1.0,  // Top-right-back
     1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-right-front
     1.0,  1.0, -1.0,  1.0, 1.0,  // Top-right-back
     1.0, -1.0, -1.0,  0.0, 1.0,  // Bottom-right-back

    // Left face
    -1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-left-front
    -1.0,  1.0,  1.0,  1.0, 0.0,  // Top-left-front
    -1.0,  1.0, -1.0,  1.0, 1.0,  // Top-left-back
    -1.0, -1.0,  1.0,  0.0, 0.0,  // Bottom-left-front
    -1.0,  1.0, -1.0,  1.0, 1.0,  // Top-left-back
    -1.0, -1.0, -1.0,  0.0, 1.0   // Bottom-left-back
]);

class MyVector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Transform {
    constructor() {
        this.modelMatrix = new Matrix4();
        this.modelMatrix.setIdentity();

        this.position = new MyVector3(0, 0, 0);
        this.rotation = new MyVector3(0, 0, 0);
        this.scale = new MyVector3(1, 1, 1);
    }

    UpdateModelMatrix() {
        this.modelMatrix.setIdentity();

        this.modelMatrix.translate(this.position.x, this.position.y, this.position.z);

        this.modelMatrix.rotate(this.rotation.x, 1, 0, 0); // Rotate around x-axis
        this.modelMatrix.rotate(this.rotation.y, 0, 1, 0); // Rotate around y-axis
        this.modelMatrix.rotate(this.rotation.z, 0, 0, 1); // Rotate around z-axis

        this.modelMatrix.scale(this.scale.x, this.scale.y, this.scale.z);
    }

    SetPosition(x, y, z) {
        this.position = new MyVector3(x, y, z);
        this.UpdateModelMatrix();
    }

    SetRotation(x, y, z) {
        this.rotation = new MyVector3(x, y, z);
        this.UpdateModelMatrix();
    }

    SetScale(x, y, z) {
        this.scale = new MyVector3(x, y, z);
        this.UpdateModelMatrix();
    }

    GetModelMatrix() {
        return this.modelMatrix;
    }
}

class Texture {
    constructor() {
        this.texturePath = "";
        this.glTexture = null;
    }

    Initialize(gl, texturePath) {
        this.texturePath = texturePath;
        this.glTexture = gl.createTexture();

        // Flip the image's y axis
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        // Create an image object to load and hold the image
        const image = new Image();

        // Use an arrow function to preserve 'this' context
        image.onload = () => {
            // Bind the texture object to the target
            gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

            // Set the texture parameters (acts as the sampler)
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // Map the image to the texture
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            // Unbind the texture
            // gl.bindTexture(gl.TEXTURE_2D, null);
        };

        // Set the image source to start loading
        image.src = this.texturePath;

        // Return the texture object for immediate use
        return this.glTexture;
    }

    Bind(gl, textureUnit = 0) {
        // Activate the texture unit
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    }
}

class Mesh {
    constructor(gl, type) {
        this.gl = gl;
        this.type = type;
        this.vertexBuffer = this.gl.createBuffer();

        if (!this.vertexBuffer) {
            console.error('Failed to create the buffer object');
            return;
        }
    }

    Initialize() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, cubeData, this.gl.STATIC_DRAW);
    }
}

class Camera
{
    constructor(canvas)
    {
        this.transform = new Transform();

        this.vpMatrix = new Matrix4();
        this.forward = new MyVector3(0, 0, 1);

        this.vpMatrix.setPerspective(70, canvas.width / canvas.height, 0.1, 100.0);

        this.eyePos = new MyVector3(0, 0, 0);
        this.lookAt = new MyVector3(0, 0, 0);
        this.upVector = new MyVector3(0, 0, 0);
    }

    Update(gl, canvas, u_ProjectionMatrix)
    {
        let pos = this.transform.position;
        this.eyePos = pos;

        this.lookAt = new MyVector3(pos.x, pos.y, pos.z);
        this.lookAt.x += this.forward.x;
        this.lookAt.y += this.forward.y;
        this.lookAt.z += this.forward.z;

        this.upVector = new MyVector3(0, 1, 0);

        this.vpMatrix = new Matrix4();
        this.vpMatrix.setPerspective(70, canvas.width / canvas.height, 0.1, 100.0);
        this.vpMatrix.lookAt(pos.x, pos.y, pos.z, this.lookAt.x, this.lookAt.y, this.lookAt.z, this.upVector.x, this.upVector.y, this.upVector.z);
        //console.log(`${pos.x}`, `${pos.y}`, `${pos.z}`, `${lookAt.x}`, `${lookAt.y}`, `${lookAt.z}`, `${upVector.x}`, `${upVector.y}`, `${upVector.z}`);
        gl.uniformMatrix4fv(u_ProjectionMatrix, false, this.vpMatrix.elements);
    }

    Move(vector)
    {
        this.transform.position.x += vector.x;
        this.transform.position.y += vector.y;
        this.transform.position.z += vector.z;
    }
}


class GameObject {
    constructor(gl) {
        this.gl = gl;
        this.transform = new Transform();
        this.mesh = new Mesh(gl, "cube");
        this.mesh.Initialize();
        this.texture = new Texture();
        this.id = -1;
        this.shouldSample = false;

        this.speed = 4 + Math.random() * 20;
        this.colour = new MyVector3(0, 1, 0);
    }

    Draw(u_ModelMatrix, u_FragColor, a_Position, u_Sampler, shouldSampleUniform, program) {
        // Bind the buffer before setting vertex attributes and drawing
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.vertexBuffer);

        // Set vertex position attribute
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(a_Position);

        // Set texture coordinate attribute
        const a_TexCoord = this.gl.getAttribLocation(program, "a_TexCoord");
        this.gl.vertexAttribPointer(a_TexCoord, 2, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        this.gl.enableVertexAttribArray(a_TexCoord);

        this.gl.uniformMatrix4fv(u_ModelMatrix, false, this.transform.GetModelMatrix().elements);

        // Set shouldSample uniform
        this.gl.uniform1i(shouldSampleUniform, this.shouldSample);

        if (this.shouldSample) {
            this.texture.Bind(this.gl, 0);
            this.gl.uniform1i(u_Sampler, 0);
        } else {
            this.gl.uniform4fv(u_FragColor, [this.colour.x, this.colour.y, this.colour.z, 1.0]);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 36);
    }

    Update(deltaTime, globalSpeed) {
        if(this.id == 0)
        {
            this.transform.SetRotation(0,
            (this.transform.rotation.y - globalSpeed * this.speed * 0.4 * deltaTime) % 360,
            (this.transform.rotation.z + globalSpeed * this.speed * deltaTime) % 360);
        }

        else if(this.id == 1)
        {
            this.transform.SetRotation(0,
            (this.transform.rotation.y + globalSpeed * this.speed * deltaTime) % 360,
            (this.transform.rotation.z + globalSpeed * this.speed * 0.4 * deltaTime) % 360);
        }

        else if(this.id == 2)
        {
            this.transform.SetRotation(
            (this.transform.rotation.x + globalSpeed * this.speed * deltaTime) % 360,
            0,
            (this.transform.rotation.z + globalSpeed * this.speed * 0.4 * deltaTime) % 360);
        }
    }
}


class Scene {
    constructor() {
        this.gameObjects = [];
        this.nrOfGameObjects = 0;
    }

    AddGameObject(gameObject) {
        gameObject.id = this.nrOfGameObjects;
        this.gameObjects.push(gameObject);
        this.nrOfGameObjects += 1;
    }

    UpdateGameObjects(deltaTime, globalSpeed) {
        for (let i = 0; i < this.gameObjects.length; i += 1) {
            this.gameObjects[i].Update(deltaTime, globalSpeed);
        }
    }

    DrawGameObjects(u_ModelMatrix, u_FragColor, a_Position, gl, program) {
        // Clear the canvas
        gl.clearColor(0.1, 0, 0.2, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const u_Sampler = gl.getUniformLocation(program, "u_Sampler");
        const shouldSampleUniform = gl.getUniformLocation(program, "shouldSample");

        for (let i = 0; i < this.gameObjects.length; i += 1) {
            this.gameObjects[i].Draw(u_ModelMatrix, u_FragColor, a_Position, u_Sampler, shouldSampleUniform, program);
        }
    }
}
