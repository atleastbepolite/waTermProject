const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

/* const battleC = canvas.getContext('2d')
battleC.fillRect(0,0,canvas.width,canvas.height) */

// code for maptransition animation 
//gsap.to('#overlapDiv', {opacity:1, repeat:3, yoyo:true, duration: 0.5})
console.log(gsap)

console.log("here");
console.log(combats);
console.log("there");
// for testing
//console.log(image)

//16:9 ratio width height 
canvas.width = 1024
canvas.height = 576

// offsets for map, collisions, actionobjects on canvas 
const offset = {x:-3440,y:-350}

//draw the rectangle to differentiate canvas from html

//context.fillstyle = whatever color 

//context.fillRect(0, 0, canvas.width, canvas.height)

//create a new array of collisionsMap and fill with collisions list from collisions.js 
const collisionsMap = [];
const interactionsMap = [];
const combatsMap = [];

const tileMapWidth = 140;
for (let i = 0; i < collisions.length; i+= tileMapWidth){
    collisionsMap.push(collisions.slice(i, i + tileMapWidth))
    interactionsMap.push(interactions.slice(i, i + tileMapWidth))
    combatsMap.push(combats.slice(i, i + tileMapWidth))
}


const boundaries = []
const interactionBoundaries = []
const combatBoundaries = []
//i = index of current row
// creating boundaries where 15722(value for boundaries) exist
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 15722){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x, //
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

interactionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 15721){
            interactionBoundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x, //
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

combatsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 15719){
            combatBoundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x, //
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})


console.log(boundaries);



const image = new Image()
image.src = 'static/socialnetwork/image/worldFINAL.png'

//const foregroundImage = new Image()
//foregroundImage.src = b

const userDownImage = new Image()
//userDownImage.src = 'static/socialnetwork/image/userDown.png'

userDownImage.src = 'static/socialnetwork/image/Character_HERE/userDown.png'

const userUpImage = new Image()
userUpImage.src = 'static/socialnetwork/image/Character_HERE/userUp.png'

const userLeftImage = new Image()
userLeftImage.src = 'static/socialnetwork/image/Character_HERE/userLeft.png'

const userRightImage = new Image()
userRightImage.src = 'static/socialnetwork/image/Character_HERE/userRight.png'
/* image.onload = () => {
    
}  */
// position is for the sprite's location on the map 
const user = new Sprite({position:{x:canvas.width/2 - 192 / 8  , y:canvas.height/2 - 68/2},
                         image:userDownImage,
                         frames: {max:4},
                         sprites: {up: userUpImage, down: userDownImage, left: userLeftImage, right:userRightImage}
})

const background = new Sprite({position:{x:offset.x,y:offset.y}, image: image})

//const foreground = new Sprite({position:{x:offset.x,y:offset.y}, image: foregroundImage})

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
    j: {pressed: false},
    k: {pressed: false},
}

// deleted foreground temporarily, put it back in movables to allow foreground drawing
const movables = [background, ...boundaries, ...interactionBoundaries, ...combatBoundaries]

function rectangularCollision({rectangle1, rectangle2}) {
    return (rectangle1.position.x + (rectangle1.width)/2 >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + (rectangle2.width)/2 &&
        rectangle1.position.y <= rectangle2.position.y + (rectangle2.height)/2 &&
        rectangle1.position.y + (rectangle1.height)/2 >= rectangle2.position.y)
} 

const combat = {
    initiated: false
}
//for continuous render of each animation frames/loops  
function render(){
    const renderId = window.requestAnimationFrame(render)
    // console.log('animate') -> this shows that render goes on continuous loop 
    background.draw() 

    //draw out the boundaries
    boundaries.forEach(boundary => {
        boundary.draw()
    
    })
    interactionBoundaries.forEach(boundary => {
        boundary.draw()
    
    })
    combatBoundaries.forEach(boundary => {
        boundary.draw()
    
    })
    user.draw()
    //foreground.draw()

    // to prevent user sprite from frame shifting when combat collision is detected // was above key functionalites
    let moving = true
    user.moving = false 

    // to prevent user from moving when combat starts 
    if (combat.initiated) return

    // for combat zone movement detection
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i <combatBoundaries.length; i++){
            const boundary = combatBoundaries[i]
            //for smoother battlezone detection( user would have to stay 50% or more in the zone to activate)
            const overlap = (Math.min(user.position.x + user.width, boundary.position.x + boundary.width) -
                            Math.max(user.position.x, boundary.position.x)) * (Math.min(user.position.y + user.height, boundary.position.y + boundary.height) -
                            Math.max(user.position.y, boundary.position.y)) 
                            
            if (
              rectangularCollision({
                  rectangle1: user,
                  rectangle2: boundary
              }) && (overlap > (user.width * user.height)/2) && (Math.random() <0.01)   
            ){
                console.log('combatzone collision')
                // kill current animation loop
                window.cancelAnimationFrame(renderId)
                combat.initiated = true
                gsap.to('#overlapDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.5,
                    onComplete() {
                      gsap.to('#overlapDiv', {
                        opacity: 1,
                        duration: 0.5,
                        onComplete() {
                          // activate a new animation loop
                          console.log("coming in here")
                          window.location.href= battleLink
                          //renderCombat() instead of rendering combat, redirecting to battleLink 
                          gsap.to('#overlapDiv', {
                            opacity: 0,
                            duration: 0.4
                          })
                        }
                      })
                    }
                  })
    
                break
            }
        }
    }


    // long code below is for individual key functionalities 
    if (keys.w.pressed && lastKey == 'w'){
        user.moving = true
        user.image = user.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x,
                            y:boundary.position.y +5                            
                        } 
                    }
                })
            ){
                moving = false
                break
            }                  
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.y += 5
            })
        }
        
    } else if (keys.s.pressed && lastKey == 's'){
        user.moving = true
        user.image = user.sprites.down
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x,
                            y:boundary.position.y - 5                            
                        } 
                    }
                })
            ){
                moving = false
                break
            }                  
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.y -= 5
            })
        }
    } else if (keys.a.pressed && lastKey == 'a'){
        user.moving = true
        user.image = user.sprites.left
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x + 5,
                            y:boundary.position.y                            
                        } 
                    }
                })
            ){
                console.log ("testing transition")
                //window.location.href= a
                moving = false
                break
            }                  
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.x += 5
            })
        }
    } else if (keys.d.pressed && lastKey == 'd'){
        user.moving = true
        user.image = user.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x - 5,
                            y:boundary.position.y                           
                        } 
                    }
                })
            ){
                console.log ("booya")
                moving = false
                break
            }                  
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.x -= 5
            })
        }
    } else if (keys.j.pressed){
        //user.image = user.sprites.right
        console.log('san')
        for (let i = 0; i < interactionBoundaries.length; i++){
            const boundary = interactionBoundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x ,
                            y:boundary.position.y                           
                        } 
                    }
                })
            ){
                console.log ("j-interactions logging")
                window.location.href= c
                break
            }                    
        }
        // for battle zone creation & checking battle zone trigger
        for (let i = 0; i < combatBoundaries.length; i++){
            const boundary = combatBoundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x ,
                            y:boundary.position.y                           
                        } 
                    }
                })
            ){
                console.log ("battle zone triggering with j key")
                break
            }                    
        }

    } else if (keys.k.pressed){
        //user.image = user.sprites.right
        console.log('san')
        for (let i = 0; i < interactionBoundaries.length; i++){
            const boundary = interactionBoundaries[i]
            // for the COLLISION DETECTION 
            if (
                rectangularCollision({
                    rectangle1: user,
                    rectangle2: {
                        ...boundary,
                        position:{
                            x:boundary.position.x ,
                            y:boundary.position.y                           
                        } 
                    }
                })
            ){
                console.log ("j-interactions logging")
                window.location.href= d
                break
            }                  
        }

    }
}
render() 

//background when transitioning from mainzone to battle sequence to acquire coin
// currently replaced by just sending to battleLink 
const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'static/socialnetwork/image/battleBackground.png'
const battleBackground = new Sprite({position:{x:0,y:0}, image: battleBackgroundImage})
function renderCombat(){
    window.requestAnimationFrame(renderCombat)
    battleBackground.draw()
    /* const battlePlayer = new battleSprite({x:0, y:0})
    battlePlayer.draw()
    const battleEnemy = newbattleSprite({x:400, y:100})
    battleEnemy.draw()   */
    
    //console.log('render combat')
}

let lastKey = ''
// functionalities to support user movement through keydown 
window.addEventListener('keydown', (e)=> {
    //console.log(e.key)
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            console.log('w pressed')
            console.log(keys.w.pressed)
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'j':
            keys.j.pressed = true
            lastKey = 'j'
            break
        case 'k':
            keys.k.pressed = true
            lastKey = 'k'
            break
    }
    //console.log(keys)
})

window.addEventListener('keyup', (e)=> {
    //console.log(e.key)
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            console.log('w unpressed')
            console.log(keys.w.pressed)
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'j':
            keys.j.pressed = false
            break
        case 'k':
            keys.k.pressed = false
            break
    }
    //console.log(keys)
})
