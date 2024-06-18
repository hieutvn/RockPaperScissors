const rock              = document.getElementById('rock');
const paper             = document.getElementById('paper');
const scissors          = document.getElementById('scissors');
const lifebarPlayer     = document.getElementById('active_player-lifebar');
const lifebarComputer   = document.getElementById('computer-lifebar');

const buttons           = document.querySelectorAll('button');


const options           = [rock, paper, scissors];

let life                = { mack: 100, kenji: 100 };
const damage            = 20;

import { SamuraiMack, SamuraiKenji } from "./classes.js";
export { playRound, decideHit };

function playersTurn()
{
    return new Promise((resolve, reject) => {
        options.forEach(option => {
            option.addEventListener('click', function() {
                
                let playersSelection = option;

                resolve(playersSelection.id);
            });
        });
    });
    
}

async function computersTurn() {

    const player = await playersTurn();
    return new Promise((resolve, reject) => {

        let select                = Math.floor(Math.random() * options.length);
        let computersSelection    = options[select];

        resolve(computersSelection.id);
    });
}

function checkWin(playersSelection, computersSelection) {

    let roundResult = '';

    if (playersSelection === computersSelection) {

        roundResult = 'TIE';
    }
    else if (
            (playersSelection === 'rock' && computersSelection === 'scissors') ||
            (playersSelection === 'paper' && computersSelection === 'rock') ||
            (playersSelection === 'scissors' && computersSelection === 'paper')) {

        roundResult = 'PLAYER';
    }
    else if (
            (computersSelection === 'rock' && playersSelection === 'scissors') ||
            (computersSelection === 'paper' && playersSelection === 'rock') ||
            (computersSelection === 'scissors' && playersSelection === 'paper')) {

        roundResult = 'COMPUTER';
    }

    return roundResult;
}

function decideHit(result) {

    disableButtons();

    if (result === 'PLAYER') {

        SamuraiMack.state.isWin             = true;
        SamuraiKenji.state.isTakingHit      = true;

        life.kenji                         -= damage;
        updateLifeBar(life.kenji, lifebarComputer);


        SamuraiMack.changeSprite('attack');
        SamuraiKenji.changeSprite('takeHit');
    }
    else if (result === 'COMPUTER') {

        SamuraiKenji.state.isWin            = true;
        SamuraiMack.state.isTakingHit       = true;

        life.mack                          -= damage;
        updateLifeBar(life.mack, lifebarPlayer);


        SamuraiKenji.changeSprite('attack');
        SamuraiMack.changeSprite('takeHit');
    }
    else if (result ==='TIE') {

        return;
    }
}

function disableButtons() {

    buttons.forEach((button) => button.disabled = true );

    setTimeout(() => { 

        buttons.forEach((button) => button.disabled = false );
    }, 1000);
}

function updateLifeBar(life, lifebar) {

    lifebar.style.width = life + '%';
}


async function playRound() {

    while (life.mack > 0 && life.kenji > 0) {

        const playersSelection      = await playersTurn();
        const computersSelection    = await computersTurn();
    
        console.log('Player: ', playersSelection);
        console.log('Computer: ', computersSelection);

        let result = checkWin(playersSelection, computersSelection);
        decideHit(result);

        console.log('Winner: ', result);
        console.log('Mack HP: ',life.mack, 'Kenji HP: ', life.kenji);
    } 

}



function initGame() {

    window.requestAnimationFrame(initGame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.updateSprite()

    SamuraiMack.updateSprite();
    SamuraiKenji.updateSprite();
}