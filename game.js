kaboom({
  global:true,
  fullscreen:true,
  scale: 1,
  debug: true,
  clearColor: [0,0,0,1]
})
const MOVE_SPEED = 120
const SLICER_SPEED = 120
const SKELETOR_SPEED = 90
//loading sprites
loadRoot('https://i.imgur.com/')
loadSprite('Link-going-left', 'NkPa4HM.png')
loadSprite('Link-going-right', 'BNQ1gRV.png')
loadSprite('Link-going-down', 'vyMdJAX.png')
loadSprite('Link-going-up', 'pyyH6ON.png')
loadSprite('Left-wall', '3tiH0Jl.png')
loadSprite('Right-wall', '3tiH0Jl.png')
loadSprite('Top-wall', '3tiH0Jl.png')
loadSprite('Bottom-wall', '3tiH0Jl.png')
loadSprite('bottom-left-wall', '3tiH0Jl.png')
loadSprite('bottom-right-wall', '3tiH0Jl.png')
loadSprite('Bottom-wall', '3tiH0Jl.png')
loadSprite('top-left-wall', '3tiH0Jl.png')
loadSprite('top-right-wall', '3tiH0Jl.png')
loadSprite('top-door', '07xxo7B.png')
loadSprite('left-door', '8rzbJhN.png')
loadSprite('fire-pot', 'S0WgQUn.png')
loadSprite('lanterns', 'eTHfYpD.png')
loadSprite('slicer', 'fuIoSaJ.png')
loadSprite('skeletor', 'pyX7nBB.gif')
loadSprite('stairs', 'hMkb3iz.png')
loadSprite('bg', 'zdWivqr.jpg')
loadSprite('kaboom', 'YFm4o6M.png' )

scene('game', ({level, score }) => {
layers(['bg', 'obj', 'ui'], 'obj')
const maps = [
[  //design of game layout
'ycc)ccc^cccw',
'a          b',
'a       *  b',
'a    (     b',
'a          b',
'%          b',
'a     (    b',
'a    *     b',
'a          b',
'xd)dddd)dddz',
],
  [
'ycc^ccc^cccw',
'a          b',
'a     $    b',
')          b',
'a          )',
'%       $  b',
'a          b',
')   }      )',
'a          b',
'xddddddddddz',
  ]
]

const levelCfg = {
  width: 48,
  height: 48,
  'a' : [sprite('left-wall'), solid(), 'wall'],
  'b' : [sprite('right-wall'), solid(), 'wall'],
  'c' : [sprite('top-wall')], solid(), 'wall',
  'd' : [sprite('bottom-wall'), solid(), 'wall'],
  'w' : [sprite('top-right-wall'), solid(), 'wall'],
  'x' : [sprite('bottom-left-wall'), solid(), 'wall'],
  'y' : [sprite('top-left-wall'), solid(), 'wall'],
  'z' : [sprite('bottom-right-wall'), solid(), 'wall'],
  '%' : [sprite('left-door'), 'next-level'],
  '^' : [sprite('top-door'),'next-level'],
  '$' : [sprite('stairs'), 'next-level'],
  '*' : [sprite('slicer'), 'slicer', 'dangerous' {dir: -1, timer: 0}],
  '}' : [sprite('skeletor'), 'skeletor','dangerous' {dir: -1}],
  ')' : [sprite('lanterns'), solid(), 'wall'],
  '(' : [sprite('fire-pot'), solid()],
}

addLevel(maps[level], levelCfg)
//background
add[sprite('bg'), layer('bg')])

const scoreLabel = add([
  text('0'),
  pos(400,450),
  layer('ui'),
  {
    value: score,
  },
  scale(4)
])
//innitial start for player
const player = add([ 
  sprite('link-going-right'),
   pos(5,190),
    {
      dir:vec2(1,0)
    }
   ])

//physics for player, not running into anything
player.action(() => {
  player.resolve()
})
player.overlaps('next-level', ()=>{
  go('game',{
    //continuous loops of level
    level: (level + 1) % map.length,
    level: level+ 1,
    score scoreLabel.value
  })
})
//link (player) movement

keyDown('left', () => {
  player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1,0)
  })
  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(1,0)
    })
    keyDown('up', () => {
       player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0,-1)
    })
      keyDown('down', () => {
        player.changeSprite('link-going-down')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0,1)
  })

function spawnKaboom (p) {
  const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
  wait(1,() =>{
    destroy(obj)
  })
}

keyPress('space', () =>{
  spawnKaboom(player.pos.add(player.dir.scale(48)))
})

  //monster (splicer) movement

  action('slicer', (s)=>{
    s.move(s.dir*SLICER_SPEED,0)
  })
  //slicer hits wall and change direction
  collides('sdangerous', 'wall', (s) => {
    s.dir = -s.dir

  })

  actions('skeletor', (s) =>{
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer-=dt()
    if(s.timer<=0) {
      s.dir = -s.dir
      //assign new value/ random direction
      s.timer = rand(5)
    }
  })

    collides('kaboom', 'skeletor', (k,s) => {
      camShake(4)
      wait(1,() =>{
        destroy(k)
      })
      destroy(s)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })

//player dies
  player.overlaps('dangerous', () =>{
      go('lose', {score: scoreLabel.values})
  })
})

scene('lose', ({score})=> {
  add([text(score, 32), origin ('center'), pos(width()/2, height()/2)])
})
 
  start('game',{ level: 0, score: 0 })