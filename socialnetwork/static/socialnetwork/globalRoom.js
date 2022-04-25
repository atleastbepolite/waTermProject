const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

console.log(collisions);

//16:9 ratio width height 
canvas.width = 1024
canvas.height = 576

// offsets for map, collisions, actionobjects on canvas 
const offset = {x:0,y:-1400}

//draw the rectangle to differentiate canvas from html

//context.fillstyle = whatever color 

// commented on 2:20:28
//context.fillRect(0, 0, canvas.width, canvas.height)

//create a new array of collisionsMap and fill with collisions list from collisions.js 
const collisionsMap = [];
const interactionsMap = [];

const tileMapWidth = 30;
for (let i = 0; i < collisions.length; i+= tileMapWidth){
    collisionsMap.push(collisions.slice(i, i + tileMapWidth))
    interactionsMap.push(interactions.slice(i, i + tileMapWidth))
}



const boundaries = []
const interactionBoundaries = []
//i = index of current row
// creating boundaries where 1183(value for boundaries) exist
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 865){
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
        if (symbol === 864){
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

console.log(boundaries);
console.log(interactionBoundaries);

const image = new Image()
image.src = 'static/socialnetwork/image/global.png'



/* const userDownImage = new Image()
userDownImage.src = 'static/socialnetwork/image/userDown.png'

const userUpImage = new Image()
userUpImage.src = 'static/socialnetwork/image/userUp.png'

const userLeftImage = new Image()
userLeftImage.src = 'static/socialnetwork/image/userLeft.png'

const userRightImage = new Image()
userRightImage.src = 'static/socialnetwork/image/userRight.png' */
const userDownImage = new Image()
userDownImage.src = 'static/socialnetwork/image/Character_HERE/userDown.png'

const userUpImage = new Image()
userUpImage.src = 'static/socialnetwork/image/Character_HERE/userUp.png'

const userLeftImage = new Image()
userLeftImage.src = 'static/socialnetwork/image/Character_HERE/userLeft.png'

const userRightImage = new Image()
userRightImage.src = 'static/socialnetwork/image/Character_HERE/userRight.png'
/* image.onload = () => {
    
}  */

const user = new Sprite({position:{x:canvas.width/2 - 192 / 8 , y:canvas.height/2 - 68/2},
                         image:userDownImage,
                         frames: {max:4},
                         sprites: {up: userUpImage, down: userDownImage, left: userLeftImage, right:userRightImage}
})

const background = new Sprite({position:{x:offset.x,y:offset.y}, image: image})


const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
    j: {pressed: false},
    k: {pressed: false},
    l: {pressed: false},
}


const movables = [background, ...boundaries, ...interactionBoundaries]

function rectangularCollision({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
} 

//for continuous render of each animation frames/loops  
function render(){
    window.requestAnimationFrame(render)
    // console.log('animate') -> this shows that render goes on continuous loop 
    background.draw() 

    //draw out the boundaries
    boundaries.forEach(boundary => {
        boundary.draw()
    
    })
    interactionBoundaries.forEach(boundary => {
        boundary.draw()
    
    })
    user.draw()

    let moving = true
    user.moving = false 
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
        console.log('sanity')
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
                window.location.href= a
                break
            }                  
        }

    } else if (keys.k.pressed){
        //user.image = user.sprites.right
        console.log('sanity')
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
                console.log ("k-interactions logging")
                window.location.href= b
                break
            }                  
        }

    } else if (keys.l.pressed){
        //user.image = user.sprites.right
        console.log('sanity')
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
                console.log ("k-interactions logging")
                window.location.href= mp
                break
            }                  
        }

    }
}
render() 

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
        case 'l':
            keys.l.pressed = true
            lastKey = 'l'
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
        case 'l':
            keys.l.pressed = false
            break
    }
    //console.log(keys)
})
