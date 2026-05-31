/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as THREE from 'three';

import { CanvasDimensions } from '../src-shared/canvas-dimensions.js';
import { Random, loadRandomSeed } from '../src-shared/random.mjs';

import '../assets/css/three.css';

/* ---------- Load Random Seed -------- */

await loadRandomSeed();

/* ---------- Canvas Dimensions and Resizing -------- */

/**
 * @param {THREE.WebGLRenderer} renderer
 */
function decorateRenderer(renderer) {
    const canvasFill = CanvasDimensions.getCanvasFill();

    if (canvasFill === 'width') {
        renderer.domElement.style.width = '100vw';
        renderer.domElement.style.height = '';
    } else {
        renderer.domElement.style.width = '';
        renderer.domElement.style.height = '100vh';
    }
}

let camera;
let renderer;

function onWindowResize() {
    if (!camera || !renderer) {
        return;
    }

    camera.updateProjectionMatrix();
    decorateRenderer(renderer);
}

window.addEventListener('resize', onWindowResize);

CanvasDimensions.aspectRatio = { widthRatio: 1, heightRatio: 1 };
CanvasDimensions.resolution = 1080;
const { width: canvasWidth, height: canvasHeight } = CanvasDimensions.getDimensions();

/* ---------- Scene and Lighting -------- */

const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
camera.position.z = 5;

const lightColor = 0xFFFFFF;
const lightIntensity = 3;
const light = new THREE.DirectionalLight(lightColor, lightIntensity);
light.position.set(-1, 2, 4);
scene.add(light);

/* ---------- Geometry -------- */

class Box {
    #mesh;
    #rotation;

    constructor() {
        const geometry = new THREE.BoxGeometry(Random.randomFloat(0.2, 2), Random.randomFloat(0.2, 2), Random.randomFloat(0.2, 2));
        const material = new THREE.MeshStandardMaterial();
        material.color.setRGB(Random.randomFloat(0, 1), Random.randomFloat(0, 1), Random.randomFloat(0, 1));
        material.roughness = Random.randomFloat(0, 1);
        material.metalness = Random.randomFloat(0, 1);

        this.#mesh = new THREE.Mesh(geometry, material);
        this.#mesh.position.x = Random.randomFloat(-5, 5);
        this.#mesh.position.y = Random.randomFloat(-5, 5);
        this.#mesh.position.z = Random.randomFloat(-5, 0);

        this.#rotation = { x: Random.randomFloat(-0.02, 0.02), y: Random.randomFloat(-0.02, 0.02), z: 0 };
    }

    get mesh() {
        return this.#mesh;
    }

    rotate() {
        this.mesh.rotation.x += this.#rotation.x;
        this.mesh.rotation.y += this.#rotation.y;
        this.mesh.rotation.z += this.#rotation.z;
    }
}

/**
 * @type {number}
 */
const totalBoxes = Random.randomInt(1, 50);

/**
 * @type {Box[]}
 */
const boxes = [];

for (let i = 0; i < totalBoxes; i++) {
    boxes.push(new Box());
}

boxes.forEach((box) => {
    scene.add(box.mesh);
});

/* ---------- Renderer and Animation ------- */

const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
decorateRenderer(renderer);
document.body.appendChild(renderer.domElement);

function animate() {
    boxes.forEach((box) => {
        box.rotate();
    });

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
