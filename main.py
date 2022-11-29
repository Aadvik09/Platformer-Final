def on_button_pressed_a():
    for index in range(2):
        Player.change(LedSpriteProperty.Y, -1)
        basic.pause(500)
    for index2 in range(2):
        Player.change(LedSpriteProperty.Y, 1)
        basic.pause(200)
input.on_button_pressed(Button.A, on_button_pressed_a)

Obstacle: game.LedSprite = None
Player: game.LedSprite = None
Player = game.create_sprite(1, 4)
Player.set(LedSpriteProperty.BRIGHTNESS, 300)

def on_every_interval():
    global Obstacle
    Obstacle = game.create_sprite(5, 4)
loops.every_interval(randint(1000, 3000), on_every_interval)

def on_forever():
    Obstacle.set(LedSpriteProperty.BRIGHTNESS, 150)
    Obstacle.change(LedSpriteProperty.X, -1)
    basic.pause(500)
    if Obstacle.get(LedSpriteProperty.X) < 1:
        Obstacle.delete()
basic.forever(on_forever)

def on_forever2():
    if Player.is_touching(Obstacle):
        basic.clear_screen()
        basic.show_string("GAME OVER")
basic.forever(on_forever2)
