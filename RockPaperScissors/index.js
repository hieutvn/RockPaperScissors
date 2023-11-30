import { Sprite, Player, SpriteFrame } from "./classes.js";


export const background = new Sprite({
    imageSrc: './img/background.png',
    position: {x: 0, y: -50},
    framesTotalCount: 1,
    scale: .3
});



export const spritePlayer = new Player({

    imageSrc: './img/samuraiMack/Idle.png', 
    position: {x: -10, y: -28}, 
    framesTotalCount: 8,
    scale: 1,

    collectionOfSprites:
    {
        'idle':
        {
            imageSrc: './img/samuraiMack/Idle.png', 
            framesTotalCount: 8
        },
        'attack':
        {
            imageSrc: './img/samuraiMack/Attack1.png', 
            framesTotalCount: 6,
            },
        'death':
        {
            imageSrc: './img/samuraiMack/Death.png',
            framesTotalCount: 6
        },
        'takeHit':
        {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesTotalCount: 4
        }
    },
}); 






export const spriteComputer = new Player({

    imageSrc: './img/kenji/Idle.png', 
    position: {x: 110, y: -34}, 
    framesTotalCount: 4,
    scale: 1,

    collectionOfSprites:
    {
        'idle':
        {
            imageSrc: './img/kenji/Idle.png', 
            framesTotalCount: 4
        },
        'attack':
        {
            imageSrc: './img/kenji/Attack1.png', 
            framesTotalCount: 4
        },
        'death':
        {
            imageSrc: './img/kenji/Death.png',
            framesTotalCount: 7
        },
        'takeHit':
        {
            imageSrc: './img/kenji/Take Hit.png',
            framesTotalCount: 3
        }
    }
}); 


const endBoss = new Player({

    imageSrc: './img/endboss/endboss-idle.png',
    position: {x: 0, y: 0},
    framesTotalCount: 6,
    scale: 1,

    collectionOfSprites:
    {
        'idle':
        {
            imageSrc: './img/endboss/endboss-idle.png',
            framesTotalCount: 6
        },
        'death':
        {
            imageSrc: './img/endboss/endboss-idle.png',
            framesTotalCount: 11
        }
    }
});

const astroBoy = new Player({
    
});






//Frame
export const spritePlayerFrame = new SpriteFrame({

    imageSrc: './img/samuraiMack/profileFrame_Idle.png',
    position: {x: 0, y: 0},
    framesTotalCount: 8,
    scale: 1,
    
    collectionOfProfile:
    {
        'idle':
        {
            imageSrc: './img/samuraiMack/profileFrame_Idle.png',
            framesTotalCount: 8
        },
        'takeHit':
        {
            imageSrc: './img/samuraiMack/profileFrame_TakeHit.png',
            framesTotalCount: 4
        }
    }

});