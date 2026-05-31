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

export class CanvasDimensions {
    /**
     * @type {{widthRatio: number, heightRatio: number}}
     */
    static #aspectRatio = { widthRatio: 1, heightRatio: 1 };

    /**
     * @type {number}
     */
    static #resolution = 720;

    /**
     * @returns {{widthRatio: number, heightRatio: number}}
     */
    static get aspectRatio() {
        return CanvasDimensions.#aspectRatio;
    }

    /**
     * @param {{widthRatio: number, heightRatio: number}} aspectRatio
     */
    static set aspectRatio(aspectRatio) {
        if (!CanvasDimensions.#isValidRatio(aspectRatio.widthRatio)
            || !CanvasDimensions.#isValidRatio(aspectRatio.heightRatio)) {
            throw new Error('widthRatio and heightRatio must be greater than or equal to 1.');
        }

        CanvasDimensions.#aspectRatio = aspectRatio;
    }

    /**
     * @returns {number}
     */
    static get resolution() {
        return CanvasDimensions.#resolution;
    }

    /**
     * @param {number} resolution
     */
    static set resolution(resolution) {
        if (!CanvasDimensions.#isValidResolution(resolution)) {
            throw new Error('Resolution must be greater than 100.');
        }

        CanvasDimensions.#resolution = resolution;
    }

    /**
     * @returns {{width: number, height: number}}
     */
    static getDimensions() {
        const aspectRatio = CanvasDimensions.aspectRatio;
        const resolution = CanvasDimensions.resolution;

        if (aspectRatio.widthRatio < 1 || aspectRatio.heightRatio < 1) {
            throw new Error('widthRatio and heightRatio must be greater than or equal to 1.');
        }

        const unit = resolution / Math.max(aspectRatio.widthRatio, aspectRatio.heightRatio);
        const width = Math.floor(unit * aspectRatio.widthRatio);
        const height = Math.floor(unit * aspectRatio.heightRatio);
        return { width, height };
    }

    /**
     * @returns {'width'|'height'}
     */
    static getCanvasFill() {
        const aspectRatio = CanvasDimensions.aspectRatio;
        const goalRatio = aspectRatio.widthRatio / aspectRatio.heightRatio;
        const windowRatio = window.innerWidth / window.innerHeight;

        if (goalRatio > windowRatio) {
            return 'width';
        } else {
            return 'height';
        }
    }

    /**
     * @param {unknown} input
     * @returns {boolean}
     */
    static #isValidRatio(input) {
        return typeof input === 'number' && input >= 1;
    }

    /**
     * @param {unknown} input
     * @returns {boolean}
     */
    static #isValidResolution(input) {
        return typeof input === 'number' && input >= 100;
    }
}
