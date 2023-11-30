export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');

const profilePicture = document.querySelectorAll('.profilePicture');
export const playerProfilePicture = document.getElementById('player_profilePicture');
export const ctxProfile = playerProfilePicture.getContext('2d');
const computerProfilePicture = document.getElementById('computerProfilePicture');





export class Sprite
{
    
    constructor({imageSrc, position, framesTotalCount, scale = 1})
    {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.width = this.image.width;
        this.height = this.image.height;
        this.scale = scale;

        this.framesTotalCount = framesTotalCount;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesVelocity = 10;

    }

    draw()
    {
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

    animateFrames()
    {
        this.framesElapsed++;
        
        if(this.framesElapsed % this.framesVelocity === 0)
        {
            if(this.framesCurrent < this.framesTotalCount - 1)
            {
                this.framesCurrent++;

            }
            
            else
            {
                this.framesCurrent = 0;
            }
        }
    }



    update()
    {   
        this.draw();
        this.animateFrames();
               
    }

}


export class Player extends Sprite
{
    constructor({
        imageSrc,
        position,
        framesTotalCount,
        scale,
        ultimateCounter = 0,
        collectionOfSprites,

    })
    {
        super({
        imageSrc, 
        position, 
        framesTotalCount, 
        scale,
    
        })
        
        this.actionCases =
        {
            isAttacking: false,
            isDead: false,
            isTakingHit: false
        }

        this.ultimateCounter = ultimateCounter;

        this.collectionOfSprites = collectionOfSprites;
  
        for(const sprite in this.collectionOfSprites)
        {
            this.collectionOfSprites[sprite].image = new Image();
            this.collectionOfSprites[sprite].image.src = this.collectionOfSprites[sprite].imageSrc;
        }

    }

    changeSprites(sprite)
    {
        this.framesVelocity =8;
       
        switch(sprite)
        {
            
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


export class SpriteFrame extends Sprite
{
    constructor({
        imageSrc, 
        position, 
        framesTotalCount, 
        scale, 
        collectionOfProfile
    })
    {
        super({
            imageSrc, 
            position, 
            framesTotalCount, 
            scale
        });

        this.collectionOfProfile = collectionOfProfile;

        for(const sprite in this.collectionOfProfile)
        {
            this.collectionOfProfile[sprite].image = new Image();
            this.collectionOfProfile[sprite].image.src = this.collectionOfProfile[sprite].imageSrc;
        }
    }


    drawProfileFrame()
{
        const newScale = 8;
        const frameX  = -650;
        const frameY = -50;

        ctxProfile.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesTotalCount),
            0,
            this.image.width / this.framesTotalCount,
            this.image.height,
            frameX,
            frameY,
            newScale * (this.image.width / this.framesTotalCount),
            newScale * (this.image.height)
        );

    }

    updateProfileFrame()
    {
        this.drawProfileFrame();
        this.animateFrames();
    }


    changeSpritesProfileFrame(sprite)
    {
        switch(sprite)
        {
            case 'idle':
                this.image = this.collectionOfProfile['idle'].image;
                this.collectionOfProfile['idle'].src = this.collectionOfProfile['idle'].imageSrc;
                this.framesTotalCount = this.collectionOfProfile['idle'].framesTotalCount;

            break;
            
            case 'takeHit':
                this.image = this.collectionOfProfile['takeHit'].image;
                this.collectionOfProfile['takeHit'].src = this.collectionOfProfile['takeHit'].imageSrc;
                this.framesTotalCount = this.collectionOfProfile['takeHit'].framesTotalCount;

            break;
        }
        
    }
}


export class Item extends Sprite
{
    constructor({
        imageSrc, 
        position, 
        scale
    })
    {
        super({
            imageSrc, 
            position, 
            scale
        });

    }

    effects(effect)
    {
        switch(effect)
        {
            case 'heal':
                
            break;
        }
    }
    
}