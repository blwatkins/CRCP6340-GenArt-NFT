/*
 * Copyright (c) 2025-2026 Brittni Watkins.
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

export class Random {
    static #randomFunction = Math.random;

    static init() {
        if (window.$crcp && window.$crcp.seedRand) {
            if (window.$crcp.seedRand.rand) {
                Random.#randomFunction = window.$crcp.seedRand.rand.bind(window.$crcp.seedRand);
                return;
            } else if (window.$crcp.seedRand.next) {
                Random.#randomFunction = window.$crcp.seedRand.next.bind(window.$crcp.seedRand);
                return;
            }
        }

        Random.#randomFunction = Math.random;
    }

    static random(min, max) {
        return (Random.#randomFunction() * (max - min)) + min;
    }

    static randomFloat(min, max) {
        return Random.random(min, max);
    }

    static randomInt(min, max) {
        return Math.floor(Random.randomFloat(min, max));
    }

    static randomBoolean() {
        return Random.randomFloat(0, 1) < 0.5;
    }
}
