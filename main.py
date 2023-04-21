def on_b_pressed():
    global myDart
    myDart = darts.create(img("""
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
        """),
        SpriteKind.player)
    myDart.set_kind(SpriteKind.projectile)
    myDart.throw_dart()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_countdown_end():
    if info.score() > 10:
        game.game_over(True)
    else:
        game.game_over(False)
info.on_countdown_end(on_countdown_end)

def on_on_overlap(sprite2, otherSprite2):
    otherSprite2.destroy(effects.cool_radial, 100)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy(effects.rings, 100)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap2)

projectile2: Sprite = None
projectile: Sprite = None
myDart: Dart = None
game.splash("Ok, você é João Guilherme... ",
    "Teu objetivo é matar os otário e pegar as glock")
mySprite = sprites.create(assets.image("""
    Guilherme Joao
"""), SpriteKind.player)
controller.move_sprite(mySprite, 0, 100)
mySprite.set_stay_in_screen(True)
scene.set_background_image(assets.image("""
    Freeway
"""))
scroller.scroll_background_with_speed(-50, 0)
info.start_countdown(15)
animation.run_image_animation(mySprite,
    assets.animation("""
        Joao Guilherme
    """),
    150,
    True)
game.set_game_over_message(True, "Boa!!")
game.set_game_over_message(False, "Noob?")

def on_forever():
    global projectile
    projectile = sprites.create_projectile_from_side(assets.image("""
        pistola
    """), -90, 0)
    projectile.y = randint(10, 115)
    animation.run_image_animation(projectile, assets.animation("""
        pistola
    """), 300, True)
    pause(1000)
forever(on_forever)

def on_forever2():
    global projectile2
    projectile2 = sprites.create_projectile_from_side(assets.image("""
        Tourist
    """), -90, 0)
    projectile2.y = randint(15, 115)
    projectile2.set_kind(SpriteKind.enemy)
    animation.run_image_animation(projectile2,
        assets.animation("""
            Animated Tourist
        """),
        150,
        True)
    pause(2100)
forever(on_forever2)
