const canvas = document.querySelector('canvas');
const battleContext = canvas.getContext('2d')

canvas.width = 1200
canvas.height = 540

battleContext.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.5

class imageSprite{
    constructor({position, imageSrc, scale = 1, framesMax=1, offset = {x:0, y:0}}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 25
        this.offset = offset
        

    }

    draw() {
        battleContext.drawImage(this.image, this.framesCurrent * (this.image.width/this.framesMax), 0, this.image.width/this.framesMax, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, (this.image.width/this.framesMax) * this.scale, this.image.height * this.scale)
        
    }

    update(){
        this.draw()

        //animating frames
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){
            if (this.framesCurrent < this.framesMax -1 ){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0 
            }
        }
    }
}

class battleSprite extends imageSprite{
    constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax=1, offset = {x:0, y:0}, sprites, hitBox = {offset:{}, width: undefined, height:undefined}}) {
        super({position, imageSrc, scale, framesMax,offset})
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey 
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: hitBox.offset,
            width: hitBox.width,
            height: hitBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 25
        this.sprites = sprites
        for (const sprite in sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        console.log(this.sprites)
    }

    update(){
        this.draw()
        //animating frames 
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){
            if (this.framesCurrent < this.framesMax -1 ){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0 
            }
        }

        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y 
        
        //battleContext.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // gravity 
        if (this.position.y + this.height+ this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
        console.log(this.position.y)
    } 

    attack(){
        this.switchSprite('attack')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    switchSprite(sprite){
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax -1) {
            return
        }
        switch (sprite){
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack':
                if (this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}
const battleBackground = new imageSprite({position:{x:0, y:-10},imageSrc:'static/socialnetwork/image/longBattleBackground2.png', framesMax : 16})
//const battleBackground = new imageSprite({position:{x:0, y:0},imageSrc:'static/socialnetwork/image/njPhhkca.gif'})
const battleUser = new battleSprite({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 3
    },
    offset: {
        x:0,
        y:0
    },
    imageSrc:'static/socialnetwork/image/swordman/Idle.png',
    framesMax : 8,
    scale : 3,
    offset: {x:50, y:200},
    sprites:{
        idle:{
            imageSrc:'static/socialnetwork/image/swordman/Idle.png', 
            framesMax:8
        },
        run:{
            imageSrc:'static/socialnetwork/image/swordman/Run.png', 
            framesMax:8
        },
        jump:{
            imageSrc:'static/socialnetwork/image/swordman/Jump.png', 
            framesMax:2
        },
        fall:{
            imageSrc:'static/socialnetwork/image/swordman/Fall.png', 
            framesMax:2
        },
        attack:{
            imageSrc:'static/socialnetwork/image/swordman/Attack3.png', 
            framesMax:4
        }
    },
    hitBox: {
        offset:{
            x:300,
            y:0
        },
        width: 100,
        height: 50, 
    }
})

const battleEnemy = new battleSprite({
    position: {
      x: 400,
      y: 100
    },
    velocity: {
      x: 0,
      y: 0
    },
    color: 'blue',
    offset: {
        x:-50,
        y:0
    },
    imageSrc:'static/socialnetwork/image/wizard/Idle.png',
    framesMax : 6,
    scale : 2,
    offset: {x:-400, y:170},
    sprites:{
        idle:{
            imageSrc:'static/socialnetwork/image/wizard/Idle.png', 
            framesMax:6
        },
        run:{
            imageSrc:'static/socialnetwork/image/wizard/Run.png', 
            framesMax:8
        },
        jump:{
            imageSrc:'static/socialnetwork/image/wizard/Jump.png', 
            framesMax:2
        },
        fall:{
            imageSrc:'static/socialnetwork/image/wizard/Fall.png', 
            framesMax:2
        },
        attack:{
            imageSrc:'static/socialnetwork/image/wizard/Attack2.png', 
            framesMax:8
        }
    },
    hitBox: {
        offset:{
            x:100,
            y:0
        },
        width: 200,
        height: 50, 
    }
})

battleUser.draw()
battleEnemy.draw() 

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
}

function rectangularCollision({rectangle1, rectangle2}){
    return (rectangle1.hitBox.position.x + rectangle1.hitBox.width >= rectangle2.position.x &&
        rectangle1.hitBox.position.x <=rectangle2.position.x + rectangle2.width &&
        rectangle1.hitBox.position.y + rectangle1.hitBox.height >= rectangle2.position.y &&
        rectangle1.hitBox.position.y <= rectangle2.position.y + rectangle2.height)
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


let tick = 100
function timerTick(){
    // calling setTimeout of itself will serve as a decreasing timer 
    if (tick > 0){
        setTimeout(timerTick, 1000)
        tick --
        document.querySelector('#tick').innerHTML = tick
    }

    if (battleEnemy.health <= 0){
        document.querySelector("#textDisplay").innerHTML = 'WIN!'
        document.querySelector("#textDisplay").style.display = 'flex'
        setTimeout(function(){
            window.location.href= d

        }, 2000);
        //window.location.href= d
    
    } else if (battleUser.health <= 0){
        document.querySelector("#textDisplay").innerHTML = 'LOSE!'
        document.querySelector("#textDisplay").style.display = 'flex'
        setTimeout(function(){
            window.location.href= d

        }, 2000);
        
        
    }
    if (tick === 0){
        document.querySelector("#textDisplay").style.display = 'flex'
        if (battleUser.health === battleEnemy.health){
            document.querySelector("#textDisplay").innerHTML = 'Tie'
            window.location.href= d
            console.log("tie")
        } else if (battleUser.health > battleEnemy.health){
            document.querySelector("#textDisplay").innerHTML = 'WIN!'
            window.location.href= d
        } else if (battleUser.health < battleEnemy.health){
            document.querySelector("#textDisplay").innerHTML = 'LOSE!'
            window.location.href= d
        }
    }
    
}
timerTick() 

function animate(){
    window.requestAnimationFrame(animate)
    // to eliminate the afterimage of sprites being affected by gravity
    battleContext.fillStyle = 'black'
    battleContext.fillRect(0,0,canvas.width,canvas.width)

    battleBackground.update()
    battleUser.update()
    battleEnemy.update()

    battleUser.velocity.x = 0
    battleEnemy.velocity.x = 0

    // battleUser movement 
    if (keys.a.pressed && battleUser.lastKey === 'a'){
        battleUser.velocity.x = -2
        battleEnemy.velocity.x = 2
        battleUser.switchSprite('run')
    } else if (keys.d.pressed && battleUser.lastKey === 'd') {
        battleUser.velocity.x = 2
        battleEnemy.velocity.x = -2
        battleUser.switchSprite('run')
    }  else {
        battleUser.switchSprite('idle') // = battleUser.image = battleUser.sprites.idle.image 
    }

    // battleUser Movement - jumping
    if (battleUser.velocity.y < 0) {
        battleUser.switchSprite('jump')
    } else if (battleUser.velocity.y > 0) { // falling
        battleUser.switchSprite('fall')
    }

    // battleEnemy movement 
    if (keys.ArrowLeft.pressed && battleEnemy.lastKey === 'ArrowLeft'){
        battleEnemy.velocity.x = -2
        battleEnemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && battleEnemy.lastKey === 'ArrowRight') {
        battleEnemy.velocity.x = 2
    } else {
        battleEnemy.switchSprite('idle')
    }

    // battleEnemy Movement - jumping
    if (battleEnemy.velocity.y < 0) {
        battleEnemy.switchSprite('jump')
    } else if (battleEnemy.velocity.y > 0) { // falling
        battleEnemy.switchSprite('fall')

    }

    // hitBox collision detection for player hitting enemy
    if (rectangularCollision({rectangle1: battleUser, rectangle2: battleEnemy}) &&
        battleUser.isAttacking){
        battleUser.isAttacking = false
        battleEnemy.health -= 10
        //document.querySelector('#battleEnemyHealth').style.width = battleEnemy.health + '% '
        gsap.to('#battleEnemyHealth', {
            width: battleEnemy.health + '%'
        })
        console.log("player->enemy collision")
    }

    // hitBox collision detection for enemy hitting player
    if (rectangularCollision({rectangle1: battleEnemy, rectangle2: battleUser}) &&
        battleEnemy.isAttacking){
        battleEnemy.isAttacking = false
        battleUser.health -= 10
        //document.querySelector('#battleUserHealth').style.width = battleUser.health + '% '
        gsap.to('#battleUserHealth', {
            width: battleUser.health + '%'
        })
        console.log("Enemy attacking user")
    }

}


animate() 

   
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true 
            battleUser.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true 
            battleUser.lastKey = 'a'
            break
        case 'w':
            battleUser.velocity.y = - 12
            break
        case ' ':
            battleUser.attack()
            battleEnemy.attack()
            break
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          battleEnemy.lastKey = 'ArrowRight'
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          battleEnemy.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          battleEnemy.velocity.y = - 12
          break
        case 'ArrowDown':
          battleEnemy.attack()
          //battleEnemy.isAttacking = true
          
          break
      }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false 
        break
      case 'a':
        keys.a.pressed = false 
        break
      case 'w':
        keys.w.pressed = false
        break
    
    }
     // enemy keys
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
      case 'ArrowDown':
        keys.ArrowDown.pressed = false
        break
    }
  
})