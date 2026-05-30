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
import { Random } from './random.mjs';

// TODO - single JavaScript output? Use window.$crcp to store global token data

Random.init();

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
        x = Random.randomInt(0, ctx.width);
        y = Random.randomInt(0, ctx.height);
        d = Random.randomInt(10, 200);
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

new p5(sketch);
