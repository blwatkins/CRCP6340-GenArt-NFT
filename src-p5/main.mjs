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

'use strict';

import p5 from 'p5';

import { CanvasDimensions } from '../src-shared/canvas-dimensions.js';
import { Random } from '../src-shared/random.mjs';
import { loadSeed } from '../src-shared/seeded-random.mjs';

import '../assets/css/main.css';

/**
 * @return {Promise<void>}
 */
async function loadRandomSeed() {
    await loadSeed();

    if (window.$crcp?.seedRand) {
        if (window.$crcp.seedData) {
            console.debug(`Seed Data`, window.$crcp.seedData);
        }

        Random.rand = window.$crcp.seedRand.next.bind(window.$crcp.seedRand);
    } else {
        console.info('No seed input provided, using default random number generator.');
    }
}

/**
 * @param {p5} ctx
 */
function sketch(ctx) {
    class Circle {
        constructor() {
            this.d = Random.randomFloat(5, 200);
            this.r = this.d / 2.0;
            this.x = Random.randomFloat(this.r, ctx.width - this.r);
            this.y = Random.randomFloat(this.r, ctx.height - this.r);
            this.color = {};
            this.color.r = Random.randomInt(0, 250);
            this.color.g = Random.randomInt(0, 255);
            this.color.b = Random.randomInt(0, 255);
            this.color.a = Random.randomInt(100, 200);
            this.isColorFill = Random.randomBoolean();
            this.strokeWeight = Random.randomInt(1, 6);
        }

        render() {
            if (this.isColorFill) {
                ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);
                ctx.noStroke();
            } else {
                ctx.strokeWeight(this.strokeWeight);
                ctx.stroke(this.color.r, this.color.g, this.color.b, this.color.a);
                ctx.noFill();
            }

            ctx.ellipse(this.x, this.y, this.d, this.d);
        }
    }

    /**
     * @type {number}
     */
    let totalCircles;

    /**
     * @type {Circle[]}
     */
    const circles = [];

    ctx.setup = () => {
        CanvasDimensions.aspectRatio = { widthRatio: 1, heightRatio: 1 };
        CanvasDimensions.resolution = 1080;
        const { width: canvasWidth, height: canvasHeight } = CanvasDimensions.getDimensions();
        const canvas = ctx.createCanvas(canvasWidth, canvasHeight);
        decorateCanvas(canvas);

        totalCircles = Random.randomInt(1, 100);

        for (let i = 0; i < totalCircles; i++) {
            circles.push(new Circle());
        }
    };

    ctx.draw = () => {
        ctx.background(255);
        circles.forEach((circle) => {
            circle.render();
        });
    };

    ctx.windowResized = () => {
        const canvas = ctx.select('canvas');

        if (canvas) {
            decorateCanvas(canvas);
        }
    };

    /**
     * @param {p5.Element} canvas
     */
    function decorateCanvas(canvas) {
        const canvasFill = CanvasDimensions.getCanvasFill();

        if (canvasFill === 'width') {
            canvas.attribute('style', 'width: 100vw;');
        } else {
            canvas.attribute('style', 'height: 100vh;');
        }
    }
}

await loadRandomSeed();
new p5(sketch);
