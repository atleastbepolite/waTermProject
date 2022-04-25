// Sprite 
class Sprite {
    constructor({position, velocity, image, frames = {max:1}, sprites }) { 
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.sprites = sprites
        
        // for sprite cropping (to get one frame)
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.moving = false
    }

    draw(){
        // in order to fix userImage in the center of the display 
        context.drawImage(
            this.image,
            // 4 parameters below are for cropping userImage sprite 
            this.frames.val * this.width, //0 by default, increases to sprite frames 0~3 
            0,
            this.image.width/ this.frames.max,
            this.image.height,
            // 4 parameters below represent the actual coordinates and width and height rendered out on screen 
            this.position.x, 
            this.position.y, 
            this.image.width/ this.frames.max,
            this.image.height
        ) 
        
        if (!this.moving) return

        if (this.frames.max > 1){
            this.frames.elapsed++ 
        }

        //to limit the sprite frames going crazy fast
        if (this.frames.elapsed % 20 === 0){
            if (this.frames.val < this.frames.max - 1){
                this.frames.val++ // to increase sprite frames
            } else {
                this.frames.val = 0
            }
        }
        
    }
} 

class Boundary {
    static width = 48
    static height = 48
    constructor ({position}) {
        this.position = position     
        this.width = 48 // each tiles are 16 * 3(from 300% multiplier on tiled)
        this.height = 48   
    } 

    draw() {
        context.fillStyle = 'rgba(255, 0, 0, 0.0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}