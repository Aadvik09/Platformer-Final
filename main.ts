input.onButtonPressed(Button.A, function () {
    // creates artificial jump (repeatedly moves up and down )
    for (let index = 0; index < 2; index++) {
        // If the screen is flipped, then the player jumps in the opposite direction, else it jumps up
        if (Flip) {
            Player.change(LedSpriteProperty.Y, 1)
            basic.pause(450)
        } else {
            Player.change(LedSpriteProperty.Y, -1)
            basic.pause(450)
        }
    }
    // This works with the other repeat statement in order to create the jump illusion
    for (let index = 0; index < 2; index++) {
        // If the screen is flipped, it returns to the top, It jumps "up" instead of up, else it jumps normally  
        if (Flip) {
            Player.change(LedSpriteProperty.Y, -1)
            basic.pause(450)
        } else {
            Player.change(LedSpriteProperty.Y, 1)
            basic.pause(450)
        }
    }
})
// Flips the entire game when it is shaken, and returns to original state when shake pressed again 
input.onGesture(Gesture.Shake, function () {
    ShkCount += 1
    // If the remainder of the number of times the button is pressed = 1, it means it is odd, and flips the game 
    if (ShkCount % 2 == 1) {
        Flip = true
        basic.pause(100)
        Player.set(LedSpriteProperty.Y, 0)
    }
    // If the number of times the shake button is pressed = an even number, it keeps the game the same 
    if (ShkCount % 2 == 0) {
        Flip = false
        Player.set(LedSpriteProperty.Y, 4)
    }
})
let EndPls = false
let Obstacle2: game.LedSprite = null
let Score = 0
let Random = 0
let Obstacle: game.LedSprite = null
let ShkCount = 0
let Flip = false
let Player: game.LedSprite = null
basic.clearScreen()
led.plot(2, 2)
basic.pause(200)
led.plot(2, 2)
basic.pause(100)
led.plot(1, 1)
basic.pause(100)
led.plot(2, 1)
basic.pause(100)
led.plot(3, 1)
basic.pause(100)
led.plot(3, 2)
basic.pause(100)
led.plot(3, 3)
basic.pause(100)
led.plot(2, 3)
basic.pause(100)
led.plot(1, 3)
basic.pause(100)
led.plot(1, 2)
basic.pause(100)
led.plot(2, 2)
basic.pause(100)
led.setBrightness(130)
led.plotBarGraph(
4,
4
)
basic.pause(500)
led.setBrightness(255)
basic.pause(200)
basic.showLeds(`
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    `)
basic.pause(400)
// Makes the player sprite and sets the brightness of it high
Player = game.createSprite(1, 4)
Player.set(LedSpriteProperty.Brightness, 300)
// This variable is so the sprites dont generate before we are ready. Also, keeps the score going
let GameOn = true
Flip = false
ShkCount = 2
// Creates the obstacle  randomly spaced apart
basic.forever(function () {
    // If the screen needs to be flipped, then the obstacle is created at the top of the screen, else it is created at the bottom of the screen 
    if (Flip) {
        Obstacle = game.createSprite(4, 0)
    } else {
        Obstacle = game.createSprite(4, 4)
    }
    Random = randint(2500, 5000)
    basic.pause(Random)
})
basic.forever(function () {
    // Increases the score by 1 every 10 ms. Eventually, the score will be displayed
    while (GameOn == true) {
        basic.pause(10)
        Score += 1
    }
})
/**
 * Creates player and sets the game on var to true. Also, it shows a loading screen with a box being created and the image being a check mark
 */
// creates obstacle sprites at random times
basic.forever(function () {
    Obstacle2 = game.createSprite(4, 2)
    basic.pause(3000)
    basic.pause(Random)
})
basic.forever(function () {
    // If the obstacle 2 (top) goes off the screen, the obstacle will be deleted
    if (Obstacle2.get(LedSpriteProperty.X) == 0) {
        Obstacle2.delete()
        if (Obstacle2.isDeleted() == false) {
            Obstacle2.delete()
        }
    }
})
// End variable (when true, it shows game over and score)
basic.forever(function () {
    // If the player is touching the second obstacle, it ends the game and shows game over and score
    if (!(!(Player.isTouching(Obstacle2)))) {
        game.pause()
        GameOn = false
        basic.clearScreen()
        basic.showString("GAME OVER")
        basic.pause(100)
        basic.showString("SCORE")
        basic.showNumber(Score)
        EndPls = true
        // Works in accordance with the end var to display messages after the game is over
        while (EndPls == true) {
            basic.clearScreen()
        }
    }
})
basic.forever(function () {
    // If the player is touching the first obstacle (on bottom) then the screen clears and the game over and scores show
    if (!(!(Player.isTouching(Obstacle)))) {
        game.pause()
        GameOn = false
        basic.clearScreen()
        basic.showString("GAME OVER")
        basic.pause(100)
        basic.showString("SCORE")
        basic.showNumber(Score)
        EndPls = true
        while (EndPls == true) {
            basic.clearScreen()
        }
    }
})
// Generates obstacle every 300 ms
basic.forever(function () {
    Obstacle.set(LedSpriteProperty.Brightness, 150)
    Obstacle.change(LedSpriteProperty.X, -1)
    basic.pause(300)
})
basic.forever(function () {
    // If the obstacle (bottom) is going off the screen, delete it.
    if (Obstacle.get(LedSpriteProperty.X) == 0 == true) {
        Obstacle.delete()
        // Double checks if the obstacle is deleted, deleting it if not.
        if (Obstacle.isDeleted() == false) {
            Obstacle.delete()
        }
    }
})
// Seta brightness and repeatedly changes the x of the obstacle by 2 every 200 ms
basic.forever(function () {
    Obstacle2.set(LedSpriteProperty.Brightness, 150)
    Obstacle2.change(LedSpriteProperty.X, -1)
    basic.pause(200)
})
