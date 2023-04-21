namespace SpriteKind {
    export const dart = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    myDart = darts.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 4 5 5 5 4 . . . . . . 
        . . . . . 5 e e 5 5 4 . . . . . 
        . . . . . 4 5 5 5 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player, 10, 110)
    myDart.setKind(SpriteKind.dart)
    if (info.score() < 1) {
        myDart.throwDart()
        info.changeScoreBy(-1)
    }
})
info.onCountdownEnd(function () {
    if (info.score() > 10) {
        game.gameOver(true)
    } else {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    otherSprite2.destroy(effects.coolRadial, 100)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.rings, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.dart, function (sprite, otherSprite) {
    otherSprite.destroy(effects.rings, 100)
    sprite.destroy(effects.rings, 100)
})
let projectile2: Sprite = null
let projectile: Sprite = null
let myDart: Dart = null
game.splash("Ok, você é João Guilherme... ", "Teu objetivo é matar os otário e pegar as glock")
let mySprite = sprites.create(assets.image`Guilherme Joao`, SpriteKind.Player)
controller.moveSprite(mySprite, 0, 100)
mySprite.setStayInScreen(true)
scene.setBackgroundImage(assets.image`Freeway`)
scroller.scrollBackgroundWithSpeed(-50, 0)
info.startCountdown(15)
animation.runImageAnimation(
mySprite,
assets.animation`Joao Guilherme`,
150,
true
)
game.setGameOverMessage(true, "Boa!!")
game.setGameOverMessage(false, "Noob?")
forever(function () {
    projectile = sprites.createProjectileFromSide(assets.image`pistola`, -90, 0)
    projectile.y = randint(10, 115)
    animation.runImageAnimation(
    projectile,
    assets.animation`pistola`,
    300,
    true
    )
    pause(1000)
})
forever(function () {
    projectile2 = sprites.createProjectileFromSide(assets.image`Tourist`, -90, 0)
    projectile2.y = randint(15, 115)
    projectile2.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    projectile2,
    assets.animation`Animated Tourist`,
    150,
    true
    )
    pause(2100)
})
