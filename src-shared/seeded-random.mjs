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

const textEncoder = new TextEncoder();
const seedData = {};
let seedRand = undefined;

class SeededRandom {
    callCount = 0;

    /**
     * @param {number} seed
     */
    constructor(seed) {
        this.a = seed;
    }

    /**
     * @returns {number}
     */
    next() { /* mulberry32 from https://github.com/bryc/code/blob/master/jshash/PRNGs.md */
        this.callCount++;
        this.a |= 0;
        this.a = this.a + 0x6D2B79F5 | 0;
        let t = Math.imul(this.a ^ this.a >>> 15, 1 | this.a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

class HashSeed {
    /**
     * @param {string} input
     * @returns {Promise<number>}
     */
    static async getSeed(input) {
        let seed = 0;
        const hashBuffer = await crypto.subtle.digest('SHA-256', textEncoder.encode(input));
        const dataView = new DataView(hashBuffer);
        const inputHash = HashSeed.#dataViewToHexString(dataView);

        for (let i = 0; i < hashBuffer.byteLength; i += 4) {
            seed ^= dataView.getUint32(i, false);
        }

        seed = seed >>> 0; // force unsigned 32-bit
        HashSeed.#updateSeedData(input, inputHash, seed);
        return seed;
    }

    /**
     * @param {DataView} dataView
     * @returns {string}
     */
    static #dataViewToHexString(dataView) {
        let hexString = '';

        for (let i = 0; i < dataView.byteLength; i++) {
            hexString += dataView.getUint8(i).toString(16);
        }

        return hexString;
    }

    /**
     * @param {string} input
     * @param {string} inputHash
     * @param {number} seed
     */
    static #updateSeedData(input, inputHash, seed) {
        seedData.input = input;
        seedData.inputHash = inputHash;
        seedData.seed = seed;
    }
}

/**
 * @return {Promise<void>}
 */
async function init() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('seedInput')) {
        const seed = await HashSeed.getSeed(params.get('seedInput'));

        const TOKEN_DATA = {
            tokenHash: seed
        };

        seedRand = new SeededRandom(TOKEN_DATA.tokenHash);
    } else {
        seedRand = undefined;
    }
}

export async function loadSeed() {
    await init();

    if (seedRand) {
        window.$crcp = {};
        window.$crcp.seedData = seedData;
        window.$crcp.seedRand = seedRand;
    } else {
        console.info('No seed input provided, using default random number generator.');
    }
}
