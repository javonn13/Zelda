kaboom({
  global:true,
  fullscreen:true,
  scale: 1,
  debug: true,
  clearColor: [0,0,0,1]
})
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

scene('game', (
 //{level, score }
  ) => {
layers(['bg', 'obj', 'ui'], 'obj')
const map = [
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
]

const levelCfg = {
  width: 48,
  height: 48,
  'a' : [sprite('left-wall')],
  'b' : [sprite('right-wall')],
  'c' : [sprite('top-wall')],
  'd' : [sprite('bottom-wall')],
  'w' : [sprite('top-right-wall')],
  'x' : [sprite('bottom-left-wall')],
  'y' : [sprite('top-left-wall')],
  'z' : [sprite('bottom-right-wall')],
  '%' : [sprite('left-door')],
  '^' : [sprite('top-door')],
  '$' : [sprite('stairs')],
  '*' : [sprite('slicer')],
  '}' : [sprite('skeletor')],
  ')' : [sprite('lanterns')],
  '(' : [sprite('fire-pot')],
}

addLevel(map, levelCfg)

add[sprite('bg'), layer('bg')])

})

 
  start('game',
   //{ level: 0, score: 0 }
   )