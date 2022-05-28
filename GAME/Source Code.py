import pygame 
from sys import exit
from time import sleep
from random import randint
from pygame.locals import *

# SCREEN WIDTH AND HEIGHT AND FPS
scr_wid, scr_hei = 1920, 1080
screen = pygame.display.set_mode((scr_wid, scr_hei))
clock = pygame.time.Clock()
FPS = 120

# COLORS (RGB VALUES)
WHITE = (255,255,255)
BLACK = (0,0,0)
CYAN = (0, 234, 255)
DARKERCYAN = (0, 94, 102)
ORANGE = (255, 151, 23)
DARKERORANGE = (135, 62, 30)
GREY = (62, 62, 62)
RED = (255,0,0)
GREEN = (0,255,0)

# PYGAME CONSTRUCTOR 
pygame.font.init()
pygame.init()
pygame.mixer.pre_init(44100 , -16, 2, 512) # FREQUENCY, SIZE, CHANNEL, BUFFER
pygame.mixer.init()

#ICON AND CAPTION
icon = pygame.image.load("IMAGES/ZombieIcon.ico")
icon = pygame.display.set_icon(icon)
pygame.display.set_caption("Corona Mutated")

#IMAGES
menuBackgroundUnscaled = pygame.image.load("IMAGES/MenuBackground.png")
menuBackground_image = pygame.transform.scale(menuBackgroundUnscaled, (scr_wid, scr_hei))
bedUnscaled = pygame.image.load("IMAGES/Bed.png")
bed_image = pygame.transform.scale(bedUnscaled, (scr_wid, scr_hei))
nextUnscaled = pygame.image.load("IMAGES/Next.png")
next_image = pygame.transform.scale(nextUnscaled, (int(scr_wid/7.5), int(scr_hei/6)))
player_image = pygame.image.load("IMAGES/Player.png")
flipPlayer_image = pygame.transform.flip(player_image, 90, 0)
dadUnscaled = pygame.image.load("IMAGES/Dad.png")
dad_image = pygame.transform.scale(dadUnscaled, (int(scr_wid/60), int(scr_hei/12)))
flipDad_image = pygame.transform.flip(dadUnscaled, 90, 0)
car = pygame.image.load("IMAGES/Car.png")
zombie_image = pygame.image.load("IMAGES/Zombie.png")
flipZombie_image = pygame.transform.flip(zombie_image, 90, 0)
roomUnscaled = pygame.image.load("IMAGES/Room.png")
room_image = pygame.transform.scale(roomUnscaled, (scr_wid, scr_hei))
doorUnscaled = pygame.image.load("IMAGES/Door.png")
door_image = pygame.transform.scale(doorUnscaled, (int(scr_wid/21), int(scr_hei/6)))
roadHeliUnscaled = pygame.image.load("IMAGES/RoadWithHeli.png")
roadNoHeliUnscaled = pygame.image.load("IMAGES/RoadWithoutHeli.png")
roadHeli_image = pygame.transform.scale(roadHeliUnscaled, (scr_wid, scr_hei))
roadNoHeli_image = pygame.transform.scale(roadNoHeliUnscaled, (scr_wid, scr_hei))
helicopterUnscaled = pygame.image.load("IMAGES/Helicopter.png")
helicopter_image = pygame.transform.scale(helicopterUnscaled, (int(scr_wid/25), int(scr_hei/5)))
planeUnscaled = pygame.image.load("IMAGES/Plane.png")
plane_image = pygame.transform.scale(planeUnscaled, (int(scr_wid/20), int(scr_hei/20)))

# AUDIO
interaction_sound = pygame.mixer.Sound('SOUNDS/Interaction.mp3')
menu_sound = pygame.mixer.Sound('SOUNDS/Menu.mp3')
indoorAmbience_sound = pygame.mixer.Sound('SOUNDS/Indoor Ambience.mp3')
indoorAmbience_sound2 = pygame.mixer.Sound('SOUNDS/Indoor Ambience2.mp3')
outside_Ambience_sound = pygame.mixer.Sound('SOUNDS/Outside Ambience.mp3')
zombie_sound = pygame.mixer.Sound('SOUNDS/Zombie.mp3')
zombie_sound2 = pygame.mixer.Sound('SOUNDS/Zombie2.mp3')
zombie_sound3 = pygame.mixer.Sound('SOUNDS/Zombie3.mp3')
zombie_sound4 = pygame.mixer.Sound('SOUNDS/Zombie4.mp3')
zombieEating_sound = pygame.mixer.Sound('SOUNDS/Zombie Eating.mp3')
door_sound = pygame.mixer.Sound('SOUNDS/Door Open.mp3')
victory_sound = pygame.mixer.Sound('SOUNDS/Victory.mp3')
dead_sound = pygame.mixer.Sound('SOUNDS/Dead.mp3')
sadTrombone_sound = pygame.mixer.Sound('SOUNDS/Sad Trombone.mp3')
ding_sound = pygame.mixer.Sound('SOUNDS/Ding.mp3')
wrong_sound = pygame.mixer.Sound('SOUNDS/Wrong.mp3')

# FONTS
titleFont = pygame.font.Font("FONTS/ZombieFont.ttf", int(scr_wid/15))
menuFont = pygame.font.SysFont("Arial", int(scr_wid/20))
ArialFont= pygame.font.SysFont("Arial", int(scr_wid/40))


class Player(): # BASE CLASS
    # CLASS VARIABLE
    roomTopWall = scr_hei/6.5
    rightSideOfTheRoad = scr_hei/20
    def __init__(self, name): # NAME IS A MEMBER
        # CLASS ATTRIBUTES 
        if name == "player":
            self.WIDTH, self.HEIGHT = int(scr_wid/36), int(scr_hei/12)
            self.speed = scr_wid/512
            self.x, self.y = self.WIDTH/2, scr_hei/2 - self.HEIGHT/2
            self.playerRect = pygame.Rect(self.x, self.y, self.WIDTH, self.HEIGHT) #left, top, width, height
        elif name == "car":
            self.WIDTH, self.HEIGHT = int(scr_wid/23), int(scr_hei/20)
            self.speedForward, self.speedBackward = scr_wid/2200, scr_wid/3000
            self.x, self.y = self.WIDTH/2, scr_hei/2 - self.HEIGHT/2 + self.rightSideOfTheRoad

    def movement(self, name):
        movementKeys = pygame.key.get_pressed()
        # MOVES PLAYER X AND Y LOCATION BASED ON KEY PRESSED
        if name =="player":
            if movementKeys[pygame.K_UP] or movementKeys[pygame.K_w]:
                if self.y > self.roomTopWall:
                    self.y -= self.speed
            elif movementKeys[pygame.K_DOWN] or movementKeys[pygame.K_s]:
                if self.y < scr_hei - self.HEIGHT:
                    self.y += self.speed
            elif movementKeys[pygame.K_LEFT] or movementKeys[pygame.K_a]:
                if self.x > 0:
                    self.x -= self.speed
            elif movementKeys[pygame.K_RIGHT] or movementKeys[pygame.K_d]:
                if self.x < scr_wid - self.WIDTH:
                    self.x += self.speed

        elif name =="car":
            if movementKeys[pygame.K_LEFT] or movementKeys[pygame.K_a]:
                if self.x > 0:
                    self.x -= self.speedBackward
            elif movementKeys[pygame.K_RIGHT] or movementKeys[pygame.K_d]:
                if self.x < scr_wid - self.WIDTH:
                    self.x += self.speedForward

    def draw(self, name): # X AND Y GETS UPDATED FROM MOVEMENT METHOD
        movementKeys = pygame.key.get_pressed()
        # FLIPS IMAGE 90 DEGREES ON X AXIS IF PLAYER MOVES LEFT
        if name =="player":
            if movementKeys[pygame.K_LEFT] or movementKeys[pygame.K_a]:
                playerScaled = pygame.transform.scale(flipPlayer_image, (self.WIDTH, self.HEIGHT))
                dad_imageScaled = pygame.transform.scale(flipDad_image, (dad_image.get_rect().width, dad_image.get_rect().height))
            else:
                playerScaled = pygame.transform.scale(player_image, (self.WIDTH, self.HEIGHT))
                dad_imageScaled = pygame.transform.scale(dad_image, (dad_image.get_rect().width, dad_image.get_rect().height))

            screen.blit(playerScaled, (self.x,self.y))
            self.playerRect = pygame.Rect(self.x, self.y, self.WIDTH, self.HEIGHT)
            screen.blit(dad_imageScaled, (self.x - dad_image.get_rect().width,self.y))

        elif name == "car":
            carScaled = pygame.transform.scale(car, (self.WIDTH, self.HEIGHT))
            screen.blit(carScaled, (self.x,self.y))

    # USED BY ZOMBIES AND PLAYER CLASS
    def talk(self, name):
            print("I am a " + name + "!")


class Zombies(Player): # USING CLASS VARIABLE roomTopWall AND TALK METHOD FROM CLASS PLAYER
    def __init__(self):
        self.WIDTH, self.HEIGHT = int(scr_wid/32), int(scr_hei/18)
        self.speed = scr_wid/91
        self.x, self.y = randint(int(scr_wid/6.5), scr_wid - self.WIDTH - door_image.get_rect().width), randint(int(self.roomTopWall), scr_hei - self.HEIGHT)
        self.zombieRect = pygame.Rect(self.x, self.y, self.WIDTH, self.HEIGHT)

    def movement(self):
        # MOVES ZOMBIE BASED ON RANDOMNESS 
        randomMovement = randint(1,300)
        if randomMovement == 1:
            if self.y > self.roomTopWall:
                self.y -= self.speed
        elif randomMovement == 2:
            if self.y < scr_hei - self.HEIGHT:
                self.y += self.speed
        elif randomMovement == 3:
            if self.x > 0:
                self.x -= self.speed
        elif randomMovement == 4:
            if self.x < scr_wid - self.WIDTH:
                self.x += self.speed

    def draw(self): # X AND Y GETS UPDATED FROM MOVEMENT METHOD
        zombieScaled = pygame.transform.scale(flipZombie_image, (self.WIDTH, self.HEIGHT))
        screen.blit(zombieScaled, (self.x,self.y))
        self.zombieRect = pygame.Rect(self.x, self.y, self.WIDTH, self.HEIGHT)


def menu():
    # PLAYS SOUND AND SETS VOLUME LEVEL
    menu_sound.play(-1)
    menu_sound.set_volume(0.10)
    interaction_sound.set_volume(1)
    
    # TITLE
    mainMenuTitle = titleFont.render("CORONA MUTATED!", True, WHITE)

    # PLAY AND EXIT BUTTON
    play = menuFont.render("PLAY", True, CYAN, DARKERCYAN)
    exit = menuFont.render("EXIT", True, ORANGE, DARKERORANGE)
    playRect= pygame.Rect(scr_wid/2 - play.get_rect().width/2, scr_hei/2.2, play.get_rect().width, play.get_rect().height) #x,y,width,height
    exitRect= pygame.Rect(scr_wid/2 - exit.get_rect().width/2, scr_hei/1.5, exit.get_rect().width + 50, exit.get_rect().height)

    # ADDS BUTTONS TO THE SCREEN
    screen.blit(menuBackground_image, (0,0))
    screen.blit(mainMenuTitle,(scr_wid/2 - mainMenuTitle.get_rect().width/2, scr_hei/5))
    screen.blit(play,(scr_wid/2 - play.get_rect().width/2, scr_hei/2.2))
    screen.blit(exit,(scr_wid/2 - exit.get_rect().width/2, scr_hei/1.5))
    
    while True:
        # GETS MOUSE X AND Y POSITION
        mouseXY = pygame.mouse.get_pos()

        for event in pygame.event.get():
            # PLAY BUTTON COLLISION
            if playRect.collidepoint(mouseXY):
                if event.type == pygame.MOUSEBUTTONUP:
                    if event.button == 1: # 1 IS LEFT CLICK
                        menu_sound.set_volume(0)
                        interaction_sound.play(0)       
                        return "Play Clicked"

            # EXIT BUTTON COLLISION
            elif exitRect.collidepoint(mouseXY):
                if event.type == pygame.MOUSEBUTTONUP:
                    if event.button == 1:
                        pygame.quit()
                        exit()

            # CHECKS IF PLAY HAS EXITED (ESCAPE KEY EXITS)
            elif event.type == KEYUP:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    exit()
            elif event.type == pygame.QUIT:
                pygame.quit()
                exit()

        # SCREEN GETS UPDATED AT FPS SPEED
        pygame.display.update()
        clock.tick(FPS)


def intro(name):
    # PLAYS SOUND AND SETS VOLUME LEVEL
    indoorAmbience_sound.play(-1)
    indoorAmbience_sound.set_volume(0.30)
    zombie_sound.set_volume(1.50)
    zombie_sound2.set_volume(1.50)
    interaction_sound.set_volume(1)

    # STORY
    story = ArialFont.render("WAKE UP " + name + "! THERE ARE ZOMBIES EVERYWHERE!", True, WHITE, GREY)

    # BACKGROUND IMAGES
    screen.blit(bed_image, (0,0))
    screen.blit(story,(scr_wid/2 - story.get_rect().width/3, scr_hei/6))
    screen.blit(next_image,(scr_wid - scr_wid/7.5, scr_hei - scr_hei/6))

    nextRect= pygame.Rect(scr_wid - scr_wid/7.5, scr_hei - scr_hei/6, next_image.get_rect().width, next_image.get_rect().height)
    while True:
        # GETS MOUSE X AND Y POSITION
        mouseXY = pygame.mouse.get_pos()

        # RANDOM ZOMBIE AUDIO
        randomZombieSound = randint(1,1200)
        if randomZombieSound == 1:
            zombie_sound.play(0)
        randomZombieSound2 = randint(1,1200)
        if randomZombieSound2 == 2:
            zombie_sound2.play(0)

        # CHECKS IF PLAYER CLICKED NEXT
        for event in pygame.event.get():
            if nextRect.collidepoint(mouseXY):
                if event.type == pygame.MOUSEBUTTONUP:
                    if event.button == 1:
                        indoorAmbience_sound.set_volume(0)
                        zombie_sound.set_volume(0) 
                        zombie_sound2.set_volume(0)
                        interaction_sound.play(0)  
                        return "Next Clicked"

            # CHECKS IF PLAY HAS EXITED (ESCAPE KEY EXITS)
            if event.type == KEYUP:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    exit()
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()

        # SCREEN GETS UPDATED AT FPS SPEED
        pygame.display.update()
        clock.tick(FPS)


def roomWithZombies():
    # PLAYS SOUND AND SETS VOLUME LEVEL
    indoorAmbience_sound2.play(-1)
    indoorAmbience_sound2.set_volume(0.30)
    zombie_sound.set_volume(10.0)
    zombie_sound2.set_volume(1)
    zombie_sound3.set_volume(0.15)
    zombie_sound4.set_volume(0.5)
    door_sound.set_volume(1)
    interaction_sound.set_volume(1)

    # TIMER
    timer = 20

    # INSTANCES (RANDOM AMOUNT)
    player = Player("player")
    zombies = []
    for amount in range(randint(20,25)):
        zombies.append(Zombies())

    # TALK METHOD (ZOMBIE DERIVES IT FROM PLAYER CLASS)
    print("")
    player.talk("player")
    print("")
    for zombie in zombies:
        zombie.talk("zombie")
    print("")

    # COUNTS HOW MANY ZOMBIES SPAWNED (PRINTS IT IN THE SHELL)
    totalZombies = 0
    for zombie in zombies:
        totalZombies += 1
    print("Total Zombies: " + str(totalZombies) + "\n")

    doorRect = pygame.Rect(scr_wid - door_image.get_rect().width/2, scr_hei/6, door_image.get_rect().width, door_image.get_rect().height/2)
    while True:
        # RANDOM ZOMBIE AUDIO
        randomZombieSound = randint(1,800)
        if randomZombieSound == 1:
            zombie_sound.play(0)
        randomZombieSound2 = randint(1,800)
        if randomZombieSound2 == 1:
            zombie_sound2.play(0)
        randomZombieSound3 = randint(1,800)
        if randomZombieSound3 == 1:
            zombie_sound3.play(0)
        randomZombieSound4 = randint(1,800)
        if randomZombieSound4 == 1:
            zombie_sound4.play(0)

        # TIMER STARTS COUNTING DOWN
        timer -= 1/FPS
        timerColor = WHITE
        if timer <= 6:
            timerColor = RED # TURNS COLOR RED WHEN TIMER IS UNDER 6 SECONDS
        timerRender = ArialFont.render("MAKE IT TO THE DOOR!: " + str(int(timer)) + " sec", True, timerColor, GREY)

        # DRAWS BACKGROUND
        screen.blit(room_image, (0,0))
        screen.blit(door_image, (scr_wid - door_image.get_rect().width, scr_hei/6))
        screen.blit(timerRender, (scr_wid/384, scr_hei/200))

        # PLAYER AND ZOMBIES MOVEMENTS AND DRAW METHOD
        player.movement("player")
        player.draw("player")
        for zombie in zombies:
            zombie.movement()
            zombie.draw()

        # CHECKS FOR PLAYER AND ZOMBIE COLLISION
        for i in range(len(zombies)):
            zombieRect = zombies[i].zombieRect
            if player.playerRect.colliderect(zombieRect):
                return "Dead from Zombies"

        # CHECKS FOR PLAYER AND DOOR COLLISION
        if player.playerRect.colliderect(doorRect):
            indoorAmbience_sound2.set_volume(0)
            zombie_sound.set_volume(0)
            zombie_sound2.set_volume(0)
            zombie_sound3.set_volume(0)
            zombie_sound4.set_volume(0)
            door_sound.play(0)
            sleep(1.0)
            return "Outside"
        
        # PLAYER DIES IF TIMER RUNS OUT
        if timer <=0:
            return "Time Ran Out!"
        
        # PRESS N TO CHEAT (OR SKIP LEVEL)
        keys = pygame.key.get_pressed()
        if keys[pygame.K_n]:
            indoorAmbience_sound2.set_volume(0)
            zombie_sound.set_volume(0)
            zombie_sound2.set_volume(0)
            zombie_sound3.set_volume(0)
            zombie_sound4.set_volume(0)
            interaction_sound.play(0)  
            return "Outside"
            
        # CHECKS IF PLAY HAS EXITED (ESCAPE KEY EXITS)
        for event in pygame.event.get():
            if event.type == KEYUP:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    exit()
            elif event.type == pygame.QUIT:
                    pygame.quit()
                    exit() 

        # SCREEN GETS UPDATED AT FPS SPEED
        pygame.display.update() 
        clock.tick(FPS)


def outside():
    # PLAYS SOUND AND SETS VOLUME LEVEL
    outside_Ambience_sound.set_volume(1)
    outside_Ambience_sound.play(-1)
    interaction_sound.set_volume(1)
    ding_sound.set_volume(1)
    wrong_sound.set_volume(1)
    
    # PLAYER INSTANCE
    car = Player("car")

    # TIMER
    timer = 20

    # DERTMINES IF HELICOPTER OR GAS STATION LOOT SPAWNS ()
    gasStationLoot = randint(1,2) # 50% CHANCE OF HAPPENING
    gasStationInteracted = "no"
    PoliceHeli = randint(1,4) # 75% CHANCE OF HAPPENING

    # DAD SURVIVING CHANCE AND MIRACLE OF WINNING IF ALL GOES WRONG
    dadSurvives = randint(1,10)# 90% CHANCE OF HAPPENING
    miracle = randint(1,100) # 1% CHANCE OF HAPPENING
            
    while True:
        keys = pygame.key.get_pressed()

        # POLICE STATION
        if PoliceHeli <= 3:
            screen.blit(roadHeli_image, (0,0))
            if car.x >= scr_wid/2 and car.x <= scr_wid/1.5:
                option = ArialFont.render("THERE IS A HELICOPTER, PRESS E TO ENTER!", True, CYAN, GREY)
                screen.blit(option, (car.x - option.get_rect().width/2 + car.WIDTH/2, scr_hei/1.5))
                if keys[pygame.K_e] and dadSurvives <= 9:
                    interaction_sound.play(0)  
                    return "Won With Dad By Helicopter"
                elif keys[pygame.K_e] and dadSurvives == 10:
                    interaction_sound.play(0)  
                    return "Won Without Dad By Helicopter"
        if PoliceHeli == 4:
            screen.blit(roadNoHeli_image, (0,0))
            if car.x >= scr_wid/2 and car.x <= scr_wid/1.5:
                notInteractable = ArialFont.render("THERE ISN'T A HELICOPTER HERE", True, CYAN, GREY)
                screen.blit(notInteractable, (car.x - notInteractable.get_rect().width/2 + car.WIDTH/2, scr_hei/1.5))


        # GAS STATION
        if gasStationInteracted == "no":
            if car.x >= scr_wid/6 and car.x <= scr_wid/3:
                    option = ArialFont.render("PRESS E TO ENTER GAS STATION", True, CYAN, GREY)
                    screen.blit(option, (car.x - option.get_rect().width/2 + car.WIDTH/2, scr_hei/1.5))
                    if keys[pygame.K_e]:
                        if gasStationLoot == 1:
                            timer += 10
                            interaction_sound.play(0)  
                            sleep(2)
                            interactedOutcome = ArialFont.render("THERE WAS LOOT, 10 MINS ADDED", True, GREEN, GREY)
                            gasStationInteracted = "yes"
                            ding_sound.play(0)
                        if gasStationLoot == 2:
                            timer -= 5
                            interaction_sound.play(0)  
                            sleep(2)
                            interactedOutcome = ArialFont.render("THERE WAS NO LOOT, 5 MINS WASTED", True, RED, GREY)
                            gasStationInteracted = "yes"
                            wrong_sound.play(0)

        # AFTER PLAYER HAS INTERACTED WITH THE GAS STATION
        if gasStationInteracted == "yes":
            if car.x >= scr_wid/6 and car.x <= scr_wid/3:
                screen.blit(interactedOutcome, (car.x - interactedOutcome.get_rect().width/2 + car.WIDTH/2, scr_hei/1.5))

        # AIRPORT
        if car.x >= scr_wid - int(scr_wid/5.5) and car.x <= scr_wid:
            option = ArialFont.render("PRESS E TO RISK MAKING IT ON TIME!", True, CYAN, GREY)
            screen.blit(option, (scr_wid -option.get_rect().width - scr_wid/384, scr_hei/1.5))
            if timer >= 11:
                airportPlane = 1
            elif timer <= 9:
                airportPlane = randint(1,2)

            if keys[pygame.K_e] and airportPlane == 1:
                interaction_sound.play(0)  
                return "Won With Dad By Plane"
            elif keys[pygame.K_e] and airportPlane == 2:
                interaction_sound.play(0)  
                return "Didn't Make It To The Airport In Time"

        # PLAYER MOVEMENT AND DRAW METHOD
        car.movement("car")
        car.draw("car")

        # TIMER STARTS COUNTING DOWN
        timer -= 1/FPS
        timerColor = WHITE
        if timer <= 6:
            timerColor = RED
        timerRender = ArialFont.render("FIND AN AIRCRAFT!: " + str(int(timer)) + " min", True, timerColor, GREY)
        screen.blit(timerRender, (scr_wid/384, scr_hei/200))

        # MIRACLE
        if timer <= 0 and miracle == 100:
            return "Miracle"

        # PLAYER DIES IF TIMER RUNS OUT
        if timer <= 0:
            return "Time Ran Out!"

        # CHECKS IF PLAY HAS EXITED (ESCAPE KEY EXITS)
        for event in pygame.event.get():
            if event.type == KEYUP:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    exit()
            elif event.type == pygame.QUIT:
                    pygame.quit()
                    exit() 

        # SCREEN GETS UPDATED AT FPS SPEED
        pygame.display.update() 
        clock.tick(FPS)

def dead(cause = "Time Ran Out!"): # DEFAULT VALUE
    # MUTES AUDIO
    menu_sound.set_volume(0)
    indoorAmbience_sound.set_volume(0)
    indoorAmbience_sound2.set_volume(0)
    outside_Ambience_sound.set_volume(0)
    zombie_sound.set_volume(0)
    zombie_sound2.set_volume(0)
    zombie_sound3.set_volume(0)
    zombie_sound4.set_volume(0)

    # REASON OF DEATH (AND PLAYS SOUND)
    if cause == "Eaten Alive!":
        lost = titleFont.render("YOU DIED!", True, CYAN, BLACK)
        zombieEating_sound.set_volume(1)
        zombieEating_sound.play(0)

    elif cause == "Time Ran Out!":
        lost = titleFont.render("TIME RAN OUT!", True, CYAN, BLACK)
        sadTrombone_sound.set_volume(1)
        sadTrombone_sound.play(0)
        
    elif cause == "Didn't Make It To The Airport In Time":
        lost = titleFont.render("PLANE TOOK OFF, YOU DIED!", True, CYAN, BLACK)
        sadTrombone_sound.set_volume(1)
        sadTrombone_sound.play(0)

    # DISPLAYS THE CAUSE OF DEATH AND SCREEN GETS UPDATED
    screen.blit(lost, (scr_wid/2 - lost.get_rect().width/2, scr_hei/2 - lost.get_rect().height/2))
    pygame.display.update()
    sleep(4)


def victory(cause):
    # MUTES AUDIO
    menu_sound.set_volume(0)
    indoorAmbience_sound.set_volume(0)
    indoorAmbience_sound2.set_volume(0)
    outside_Ambience_sound.set_volume(0)
    zombie_sound.set_volume(0)
    zombie_sound2.set_volume(0)
    zombie_sound3.set_volume(0)
    zombie_sound4.set_volume(0)

    # VICTORY IMAGE
    screen.blit(menuBackground_image, (0,0))

    # CAUSE OF VICTORY (AND IMAGE CORRESPONDING WITH CAUSE)
    if cause == "Won With Dad By Helicopter":
        won = ArialFont.render("YOU WON AND YOUR DAD MADE IT!", True, CYAN, BLACK)
        helicopter_imageScaled = pygame.transform.scale(helicopter_image, (int(scr_wid/3), scr_hei))   
        screen.blit(helicopter_imageScaled, (scr_wid/3,0))

    elif cause == "Won Without Dad By Helicopter":
        won = ArialFont.render("YOU WON BUT YOUR DAD SACRIFICED HIMSELF FOR YOU TO MAKE IT!", True, CYAN, BLACK)
        helicopter_imageScaled = pygame.transform.scale(helicopter_image, (int(scr_wid/3), scr_hei))   
        screen.blit(helicopter_imageScaled, (scr_wid/3,0))

    elif cause == "Won With Dad By Plane":
        won = ArialFont.render("YOU WON WITH YOUR DAD!", True, CYAN, BLACK)
        plane_imageScaled = pygame.transform.scale(plane_image, (int(scr_wid/2), int(scr_hei/2)))
        screen.blit(plane_imageScaled, (0, int(scr_hei/2)))

    elif cause == "Miracle":
        won = ArialFont.render("YOU WON BY A 1% CHANCE MIRACLES! BOTH OF YOU SURVIVED", True, CYAN, BLACK)
        helicopter_imageScaled = pygame.transform.scale(helicopter_image, (int(scr_wid/3), scr_hei))   
        screen.blit(helicopter_imageScaled, (scr_wid/3,0))

    # PLAYS VICTORY SOUND, DISPLAYS THE CAUSE OF VICTORY AND SCREEN GETS UPDATED 
    victory_sound.set_volume(1)
    victory_sound.play(0)
    screen.blit(won, (scr_wid/2 - won.get_rect().width/2, scr_hei/2 - won.get_rect().height/2))
    pygame.display.update() 
    sleep(6)


def main():
    # REPEATS INDEFINITELY (VARIABLES ARE WHAT THE FUNCTION RETURNS)
    while True:
        options = menu()
        if options == "Play Clicked":
            introScreen = intro(str.upper("Son"))
            # introScreen = intro(str.upper(input("Hello, what is your name?: "))) # DOES WORK, HOWEVER YOU NEED TO INPUT THE NAME IN THE SHELL
            if introScreen == "Next Clicked":
                room = roomWithZombies()
                if room == "Dead from Zombies":
                    dead("Eaten Alive!") # RETURNED VALUE
                elif room == "Time Ran Out!":
                    dead() # RETURNED VALUE (DEFAULT ARGUMENT)
                elif room == "Outside":
                    outcome = outside()
                    if outcome == "Time Ran Out!":
                        dead() # RETURNED VALUE (DEFAULT ARGUMENT)
                    elif outcome == "Won With Dad By Helicopter":
                        victory("Won With Dad By Helicopter") # RETURNED VALUE
                    elif outcome == "Won Without Dad By Helicopter":
                        victory("Won Without Dad By Helicopter") # RETURNED VALUE
                    elif outcome == "Won With Dad By Plane":
                        victory("Won With Dad By Plane") # RETURNED VALUE
                    elif outcome == "Didn't Make It To The Airport In Time":
                        dead("Didn't Make It To The Airport In Time") # RETURNED VALUE
                    elif outcome == "Miracle":
                        victory("Miracle") # RETURNED VALUE
main()