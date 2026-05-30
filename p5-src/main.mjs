import p5 from 'p5';

/**
 * @param {p5} ctx
 */
function sketch(ctx) {
    ctx.setup = () => {
        ctx.createCanvas(720, 720);
    };

    ctx.draw = () => {
      ctx.background(0);
      ctx.fill(255);
      ctx.ellipse(ctx.mouseX, ctx.mouseY, 100, 100);
    };
}

new p5(sketch);
