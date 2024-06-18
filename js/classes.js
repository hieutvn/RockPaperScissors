import { ctx } from "./main.js";
export { SamuraiMack, SamuraiKenji, background };

class Sprite {
    
    constructor({ imageSrc, position, framesTotalCount, scale = 1 }) {
        
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.width = this.image.width;
        this.height = this.image.height;
        this.scale = scale;

        this.framesTotalCount = framesTotalCount;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesVelocity = 7;

    }

    draw() {
        
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesTotalCount),
            0,
            this.image.width / this.framesTotalCount,
            this.image.height,
            this.position.x,
            this.position.y,
            this.scale * (this.image.width / this.framesTotalCount),
            this.scale * (this.image.height)
        );
    }

    animateFrames() {
       
        this.framesElapsed++;
        
        if(this.framesElapsed % this.framesVelocity === 0) {
           
            if(this.framesCurrent < this.framesTotalCount - 1) {
                this.framesCurrent++;

            }
            else {
                this.framesCurrent = 0;
            }
        }
    }



    updateSprite() {   
        
        this.draw();
        this.animateFrames();
       
    }
}


class Character extends Sprite {

    constructor({ imageSrc, position, framesTotalCount, scale, collectionOfSprites }) {

        super({imageSrc, position, framesTotalCount, scale });

        this.collectionOfSprites = collectionOfSprites;
        this.state = {

            isWin       : false,
            isTakingHit : false,
            isDead      : false
        };
    
        for (let sprite in collectionOfSprites) {

            this.collectionOfSprites[sprite].image = new Image();
            this.collectionOfSprites[sprite].image.src = this.collectionOfSprites[sprite].imageSrc;
        }
    }

    changeSprite(sprite) {

        switch (sprite) {
            
            case 'idle':
           
                    this.image = this.collectionOfSprites['idle'].image;
                    this.collectionOfSprites['idle'].src = this.collectionOfSprites['idle'].imageSrc;
                    this.framesTotalCount = this.collectionOfSprites['idle'].framesTotalCount; 
         
            break;

            case 'attack':
                  
                    this.image = this.collectionOfSprites['attack'].image;
                    this.collectionOfSprites['attack'].src = this.collectionOfSprites['attack'].imageSrc;
                    this.framesTotalCount = this.collectionOfSprites['attack'].framesTotalCount;
                    
                
            break;

            case 'death':

                if (this.image !== this.collectionOfSprites['death'].image)
                {
                    this.image = this.collectionOfSprites['death'].image;
                    this.collectionOfSprites['death'].src = this.collectionOfSprites['death'].imageSrc;
                    this.framesTotalCount = this.collectionOfSprites['death'].framesTotalCount;
                }
              
            break;

            case 'takeHit':
                this.image = this.collectionOfSprites['takeHit'].image;
                this.collectionOfSprites['takeHit'].src = this.collectionOfSprites['takeHit'].imageSrc;
                this.framesTotalCount = this.collectionOfSprites['takeHit'].framesTotalCount;

            break;

        }
    } 
}

const SamuraiMack = new Character
({ 
    imageSrc: './src/samuraiMack/Idle.png',
    position: { x: 0, y: 25 },
    framesTotalCount: 8,
    scale: 4,
    collectionOfSprites: {

        'idle': {
            
            imageSrc: './src/samuraiMack/Idle.png', 
            framesTotalCount: 8
        },
        'attack': {

            imageSrc: './src/samuraiMack/Attack1.png', 
            framesTotalCount: 6,
            },
        'death': {

            imageSrc: './src/samuraiMack/Death.png',
            framesTotalCount: 6
        },
        'takeHit': {

            imageSrc: './src/samuraiMack/Take Hit - white silhouette.png',
            framesTotalCount: 4
        }
    }
});

const SamuraiKenji = new Character
({ 
    imageSrc: './src/kenji/Idle.png',
    position: { x: 300, y: 0 },
    framesTotalCount: 4,
    scale: 4,
    collectionOfSprites: {

        'idle': {

            imageSrc: './src/kenji/Idle.png', 
            framesTotalCount: 4
        },
        'attack': {

            imageSrc: './src/kenji/Attack1.png', 
            framesTotalCount: 4,
        },
        'death': {

            imageSrc: './src/kenji/Death.png',
            framesTotalCount: 7
        },
        'takeHit': {

            imageSrc: './src/kenji/Take Hit.png',
            framesTotalCount: 3
        }
    }
});


const background = new Sprite
({
    imageSrc: './src/background.png',
    position: { x: 0, y: 0 },
    framesTotalCount: 1,
    scale: 1.5
});


