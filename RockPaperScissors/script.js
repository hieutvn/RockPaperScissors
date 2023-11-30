import { spriteComputer, background, spritePlayerFrame, spritePlayer } from "./index.js";
//import { spritePlayer } from "./selection.js";
import { canvas, ctx } from "./classes.js";
import { playerProfilePicture, ctxProfile } from "./classes.js";

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const options = [rock, paper, scissor];
    
const playerLifeBar = document.getElementById('player_lifeBar');
const computerLifeBar = document.getElementById('computer_lifeBar');
const action = document.querySelectorAll('button');

const playerUltimateBar = document.getElementById('player_ultimateBar');
const computerUltimateBar = document.getElementById('computer_ultimateBar'); 

const roundResultDisplay = document.getElementById('roundResultDisplay');


export let roundResult = "";
export let endResult = "";

let playerSelection = '';
let computerSelection = '';

let playersLife = 100;
let computersLife = 100;

function playerTurn()
{
    return new Promise((resolve) => {
        options.forEach(option => {
            option.addEventListener('click', function() {
                
                let playerSelection = option;

                console.log(playerSelection.id);

                resolve(playerSelection);
            });
        });
    });
    
}

function computersTurn()
{
    let computersChoice = (Math.floor(Math.random() * options.length));
    let erg = options[computersChoice];

    console.log(`${erg.id}`);
    return erg;
}



function playerSelect()
{
    return new Promise((resolve) => {
        let playersChoice = playerTurn();
        resolve(playersChoice);
    });
}


function computerSelect()
{
    return new Promise((resolve) => {
        let computersChoice = computersTurn();
        resolve(computersChoice);
    });
}

function updateLifeBar(lifeBar, life)
{
    lifeBar.style.width = life + '%';
}

function updatePlayerUltimateBar()
{
    const requiredUltimateCount = 3;
    const loadingUltimateCount = 10;
    let playerUltimateProgress = 0;
    let computerUltimateProgress = 0;

    if (roundResult.includes("Player hits!"))
    {
        console.log(spritePlayer.ultimateCounter)
        if (spritePlayer.ultimateCounter % requiredUltimateCount === 0)
        {
            playerUltimateProgress += loadingUltimateCount;
            playerUltimateBar.style.width = playerUltimateProgress + '%';

            if (playerUltimateProgress >= 100)
            {
                playerUltimateProgress = 100;
            }
        }
        else
        {
            spritePlayer.ultimateCounter++;
        }
    }
    else if (roundResult.includes("Computer hits!"))
    {
        if (spriteComputer.ultimateCounter % requiredUltimateCount === 0)
        {
            computerUltimateProgress += loadingUltimateCount;
            computerUltimateBar.style.width = computerUltimateProgress + '%';

            if (computerUltimateProgress >= 100)
            {
                computerUltimateProgress = 100;
            }
        }
        else
        {
            spriteComputer.ultimateCounter++;
        }
    }
    
}


function disableButton()
{
   
    action.forEach(button => {
        button.disabled = true;
        console.log("waiting...")
    });

    setTimeout(() => {
        action.forEach(button => {
            button.disabled = false;
            
        });
    }, 1500);

    

    if (playersLife <= 0 || computersLife <= 0)
    {
        action.forEach(button => {
            button.disabled = true;
        });

    }
}

function showRoundResult(result)
{
    if (result.includes("TIE!"))
    {
        roundResultDisplay.style.display = 'block';
        return;
    }
    else if (result.includes("Player hits!"))
    {
        roundResultDisplay.style.display = 'block';
        return;
    }
    else if (result.includes("Computer hits!"))
    {
        roundResultDisplay.style.display = 'block';
        return;
    }
    
}


export async function playRound()
{

    while(playersLife > 0 && computersLife > 0)
    {
        if (spritePlayer.actionCases.isAttacking === false || spriteComputer.actionCases.isAttacking === false)
        {
            playerSelection = '';
            computerSelection = '';
        }

        playerSelection = await playerSelect();
        computerSelection = await computerSelect();

        console.log(playersLife);
        console.log(computersLife);

        if(playerSelection === computerSelection)
        {
            roundResult = "TIE!";
            console.log('its a tie!');
            
        }
        else if(
        (playerSelection === rock && computerSelection === scissor) ||
        (playerSelection === scissor && computerSelection === paper) ||
        (playerSelection === paper && computerSelection === rock))
        {
            roundResult = "Player hits!";
            computersLife -= 20; 

            updateLifeBar(computerLifeBar, computersLife);
            spritePlayer.ultimateCounter++;
            console.log(spritePlayer.ultimateCounter);

        }
        else
        {
            roundResult = "Computer hits!";
            playersLife -= 20;

            updateLifeBar(playerLifeBar, playersLife);
            spriteComputer.ultimateCounter++;

        }

        if (roundResult.includes("Player hits!"))
        {
            spritePlayer.actionCases.isAttacking = true;
            spriteComputer.actionCases.isTakingHit = true;



            updateLifeBar(computerLifeBar, computersLife);
        }
        else if (roundResult.includes("Computer hits!"))
        {
            spriteComputer.actionCases.isAttacking = true;
            spritePlayer.actionCases.isTakingHit = true;
        }

        updatePlayerUltimateBar();

        if(playersLife <= 0)
        {
            playersLife = 0;                
            endResult = "YOU LOSE!";


        }
        else
        {
            endResult = "YOU WIN!";

        }
        

        console.log(playerSelection.id);
        console.log(computerSelection.id);
        console.log(roundResult);

        disableButton();

    }
    

    disableButton();

    console.log(endResult);
    console.log("--END ROUND--");


    return endResult;
}

function animate()
{
    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctxProfile.clearRect(0, 0, playerProfilePicture.width, playerProfilePicture.height);


    //Profile animation
    if (spritePlayer.actionCases.isTakingHit === true)
    {
        console.log(spritePlayer.actionCases.isTakingHit)
        spritePlayerFrame.changeSpritesProfileFrame('takeHit');

        if (spritePlayer.framesCurrent === spritePlayer.framesTotalCount - 1)
        {
            spritePlayer.actionCases.isTakingHit = false;
            console.log(spritePlayer.actionCases.isTakingHit)
    
            spritePlayerFrame.changeSpritesProfileFrame('idle');
        }
    } 

    
    

    
    
    // Attack animation
    if (spritePlayer.actionCases.isAttacking === true)
    {        
        if (roundResult.includes("Player hits!"))
        {
            spritePlayer.changeSprites('attack');
            spriteComputer.changeSprites('takeHit');
            roundResult = "";
        }
        else if (spritePlayer.framesCurrent === spritePlayer.framesTotalCount - 1)
            {
                spritePlayer.changeSprites('idle');
                spriteComputer.changeSprites('idle');
                spritePlayer.actionCases.isAttacking = false;
            }  
    }

    if (spriteComputer.actionCases.isAttacking === true)
    {        
        if (roundResult.includes("Computer hits!"))
        {
            spritePlayer.changeSprites('takeHit');
            spriteComputer.changeSprites('attack');
            roundResult = "";
        }
        else if (spritePlayer.framesCurrent === spritePlayer.framesTotalCount - 1)
            {
                spritePlayer.changeSprites('idle');
                spriteComputer.changeSprites('idle');
                spritePlayer.actionCases.isAttacking = false;
            }   
    }
    // Attack animation



    // Death animation

    if (playersLife <= 0)
    {
        spritePlayer.changeSprites('death');
        playersLife = 0;

        if (spritePlayer.framesCurrent === spritePlayer.collectionOfSprites['death'].framesTotalCount - 1)
        {
            spritePlayer.framesCurrent -= 1;
        }
    }
    else if (computersLife <= 0)
    {
        spriteComputer.changeSprites('death');
        computersLife = 0;

        if (spriteComputer.framesCurrent === spriteComputer.collectionOfSprites['death'].framesTotalCount - 1)
        {
            spriteComputer.framesCurrent -= 1;
        }
    }



    background.update();
    spritePlayerFrame.updateProfileFrame();
    spritePlayer.update();
    spriteComputer.update(); 
}


animate();
playRound();