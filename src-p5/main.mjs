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

import { Random } from '../src-shared/random.mjs';
import { loadSeed } from '../src-shared/seeded-random.mjs';

async function loadRandomSeed() {
    await loadSeed();

    if (window.$crcp?.seedRand) {
        if (window.$crcp.seedData) {
            console.debug(`Seed Data`, window.$crcp.seedData);
        }

        Random.rand = window.$crcp.seedRand.next.bind(window.$crcp.seedRand);
    } else {
        console.info('No seed input provided, using default random number generator.')
    }
}

/**
 * @param {p5} ctx
 */
function sketch(ctx) {
    let x;
    let y;
    let d;
    let r;
    let g;
    let b;

    ctx.setup = () => {
        ctx.createCanvas(720, 720);
        d = Random.randomInt(10, 200);
        const rad = d / 2.0;
        x = Random.randomInt(rad, ctx.width - rad);
        y = Random.randomInt(rad, ctx.height - rad);
        r = Random.randomInt(0, 255);
        g = Random.randomInt(0, 255);
        b = Random.randomInt(0, 255);
    };

    ctx.draw = () => {
        ctx.background(255);
        ctx.fill(r, g, b);
        ctx.ellipse(x, y, d, d);
    };
}

await loadRandomSeed();
new p5(sketch);
