import { playRound } from "./gamelogic.js";
import { SamuraiMack, SamuraiKenji, background } from "./classes.js";


const canvas        = document.getElementById('gameCanvas');
const ctx           = canvas.getContext('2d');

/*
canvas.width        = window.innerWidth;
canvas.height       = window.innerHeight;
*/

canvas.width        = 1280;
canvas.height       = 780;

let canvasWidth     = canvas.width;
let canvasHeight    = canvas.height;

export { ctx, canvasWidth, canvasHeight };

// MAIN
document.addEventListener('DOMContentLoaded', () => {

    ctx.imageSmoothingEnabled = false;
    playRound()
    initGame();

});




function initGame() {

    window.requestAnimationFrame(initGame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // MAKE SURE ATTACK & ISTAKINGHIT SPRITES SET FOR ONE LOOP
    if (SamuraiMack.framesCurrent === SamuraiMack.framesTotalCount - 1 
        && SamuraiMack.state.isWin 
        && SamuraiKenji.state.isTakingHit) {

        SamuraiMack.state.isWin = false;
        SamuraiKenji.state.isTakingHit = false;

        SamuraiMack.changeSprite('idle');
        SamuraiKenji.changeSprite('idle');

    }
    else if (SamuraiKenji.framesCurrent === SamuraiKenji.framesTotalCount - 1 
            && SamuraiKenji.state.isWin 
            && SamuraiMack.state.isTakingHit) {

        SamuraiKenji.state.isWin = false;
        SamuraiMack.state.isTakingHit = false;
        
        SamuraiKenji.changeSprite('idle');
        SamuraiMack.changeSprite('idle');
    }

    
    background.updateSprite()
    SamuraiMack.updateSprite();
    SamuraiKenji.updateSprite();
}