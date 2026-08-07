// Hand-authored pixel maps. One character per pixel, keyed to palette.js;
// '.' is transparent. Kept deliberately chunky — they upscale 3–6× on screen.

// ---------------------------------------------------------------- avatar ---
// 12×16. Rust hoodie, ink hair, cocoa pants.
const AVATAR_HEAD = [
  '....KKKK....',
  '...KKKKKK...',
  '..KKKKKKKK..',
  '..KssssssK..',
  '..KsKssKsK..',
  '..KssssssK..',
  '...ssssss...',
]

export const AVATAR_IDLE = [
  ...AVATAR_HEAD,
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '.RRRRRRRRRR.',
  '.sRRRRRRRRs.',
  '..RRRRRRRR..',
  '..CCCCCCCC..',
  '..CCC..CCC..',
  '..CCC..CCC..',
  '.KKK....KKK.',
]

export const AVATAR_WALK_A = [
  ...AVATAR_HEAD,
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '.RRRRRRRRRR.',
  's.RRRRRRRR.s',
  '..RRRRRRRR..',
  '..CCCCCCCC..',
  '.CCC....CCC.',
  'CCC......CCC',
  'KKK......KKK',
]

export const AVATAR_WALK_B = [
  ...AVATAR_HEAD,
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '.RRRRRRRRRR.',
  '.sRRRRRRRRs.',
  '..RRRRRRRR..',
  '..CCCCCCCC..',
  '..CCC.CCC...',
  '..CCC.CCC...',
  '.KKK..KKK...',
]

export const AVATAR_WALK = [AVATAR_WALK_A, AVATAR_IDLE, AVATAR_WALK_B, AVATAR_IDLE]

// Sitting by the campfire, legs stretched to the right.
export const AVATAR_SIT = [
  ...AVATAR_HEAD,
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '.RRRRRRRRRR.',
  '..CCCCCCCC..',
  '..CCCCCCKK..',
]

// Chapter accessories, drawn beside/behind the avatar.
export const SUITCASE = [
  '.KKKKKK.',
  'KCCCCCCK',
  'KCCKKCCK',
  'KCCCCCCK',
  'KCCCCCCK',
  '.KKKKKK.',
]

export const BACKPACK = [
  '.CCCC.',
  'CCCCCC',
  'CYYYYC',
  'CCCCCC',
  'CCCCCC',
  '.CCCC.',
]

export const LAPTOP_HELD = [
  'KKKKKKKK',
  'KLLLLLLK',
  'KKKKKKKK',
]

export const CONTROLLER = [
  '.KKKKKK.',
  'KRRRRRRK',
  'KRfRRfRK',
  '.KK..KK.',
]

// ---------------------------------------------------------------- scenery ---
// 24×14 cottage with chimney and one lit window.
export const HOUSE = [
  '..........KKKK...KEEK...',
  '........KRRRRRRK.KEEK...',
  '......KRRRRRRRRRRKKEEK..',
  '....KRRRRRRRRRRRRRRK....',
  '..KRRRRRRRRRRRRRRRRRRK..',
  'KKKKKKKKKKKKKKKKKKKKKKKK',
  'KMMMMMMMMMMMMMMMMMMMMMMK',
  'KMMMKWWWWKMMMMKffffKMMMK',
  'KMMMKWWWWKMMMMKffffKMMMK',
  'KMMMKWWWWKMMMMKffffKMMMK',
  'KMMMMMMMMMKCCKMMMMMMMMMK',
  'KMMMMMMMMMKCfKMMMMMMMMMK',
  'KMMMMMMMMMKCCKMMMMMMMMMK',
  'KKKKKKKKKKKKKKKKKKKKKKKK',
]

// 12×11 pine, lighter tier over darker.
export const PINE = [
  '.....gg.....',
  '....gggg....',
  '...gggggg...',
  '....gggg....',
  '...gggggg...',
  '..gggggggg..',
  '...GGGGGG...',
  '..GGGGGGGG..',
  '.GGGGGGGGGG.',
  '.....CC.....',
  '.....CC.....',
]

// 10×10 rust mailbox with a little flag.
export const MAILBOX = [
  '.KKKKKKK..',
  'KRRRRRRRKf',
  'KRRRRRRRKf',
  'KRRRRRRRK.',
  '.KKKKKKK..',
  '....CC....',
  '....CC....',
  '....CC....',
  '....CC....',
  '...CCCC...',
]

// 16×11 campfire, three flame frames over the same logs.
const FIRE_LOGS = [
  '..KCCCCCCCCCCK..',
  '.CCCCCCCCCCCCCC.',
  'CCCCC......CCCCC',
]

export const CAMPFIRE_FRAMES = [
  [
    '.......ff.......',
    '......ffff......',
    '.....ffFFff.....',
    '....ffFFFFff....',
    '....fFFFFFFf....',
    '...fFFFRRFFFf...',
    '...fFFRRRRFFf...',
    '....FFRRRRFF....',
    ...FIRE_LOGS,
  ],
  [
    '......ff........',
    '.....ffff.......',
    '.....fFFff......',
    '....ffFFFFf.....',
    '...fFFFFFFff....',
    '...fFFRRFFFFf...',
    '....FFRRRRFFf...',
    '....FFRRRRFF....',
    ...FIRE_LOGS,
  ],
  [
    '........ff......',
    '.......ffff.....',
    '......ffFFf.....',
    '.....fFFFFff....',
    '....ffFFFFFFf...',
    '...fFFFFRRFFf...',
    '...fFFRRRRFF....',
    '....FFRRRRFF....',
    ...FIRE_LOGS,
  ],
]

// 10×10 padlock for the locked co-op level.
export const PADLOCK = [
  '...KKKK...',
  '..KK..KK..',
  '..KK..KK..',
  '.KKKKKKKK.',
  '.KffffffK.',
  '.KffffffK.',
  '.KffKKffK.',
  '.KfffKffK.',
  '.KffffffK.',
  '.KKKKKKKK.',
]

// 14×10 waypoint monument for the quest log.
export const MONUMENT = [
  '.....KKKK.....',
  '....KRRRRK....',
  '....KRRRRK....',
  '.....KKKK.....',
  '.....KYYK.....',
  '.....KYYK.....',
  '.....KYYK.....',
  '....KYYYYK....',
  '...KYYYYYYK...',
  '..KKKKKKKKKK..',
]

// 12×18 tower PC with a rust glass panel and power light.
export const TOWER_PC = [
  'KKKKKKKKKKKK',
  'KCCCCCCCCCCK',
  'KCffCCCCCCCK',
  'KCCCCCCCCCCK',
  'KKKKKKKKKKKK',
  'KCKRRRRRRKCK',
  'KCKRRddRRKCK',
  'KCKRRddRRKCK',
  'KCKRRRRRRKCK',
  'KCKRRRRRRKCK',
  'KCKRRddRRKCK',
  'KCKRRddRRKCK',
  'KCKRRRRRRKCK',
  'KCKKKKKKKKCK',
  'KCCCCCCCCCCK',
  'KCCCCCCCCCCK',
  'KKKKKKKKKKKK',
  '.KK......KK.',
]

// 20×11 open laptop, code lines on the screen.
export const MACBOOK = [
  '..KKKKKKKKKKKKKKKK..',
  '..KLLLLLLLLLLLLLLK..',
  '..KLRRLLLdddLLLLLK..',
  '..KLLLddLLLLRRLLLK..',
  '..KLRRRLLddLLLLLLK..',
  '..KLLLLLLLLLLLLLLK..',
  '..KKKKKKKKKKKKKKKK..',
  '.KYYYYYYYYYYYYYYYYK.',
  'KYYYYYYYYYYYYYYYYYYK',
  'KKKKKKKKKKKKKKKKKKKK',
  '....................',
]

// 12×16 golf flag on its pole, cup at the base.
export const GOLF_FLAG = [
  '....KRRRRR..',
  '....KRRRR...',
  '....KRRR....',
  '....KRR.....',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '....K.......',
  '..KKKKKK....',
  '.KGGGGGGK...',
]

// 6×6 tennis ball.
export const TENNIS_BALL = [
  '.ffff.',
  'ffffWf',
  'fffWff',
  'ffWfff',
  'fWffff',
  '.ffff.',
]

// 24×12 collegiate hall for the Northeastern scene.
export const CAMPUS_HALL = [
  '..........KKKK..........',
  '.......KKKKKKKKKK.......',
  '.....KKBBBBBBBBBBKK.....',
  '...KBBBBBBBBBBBBBBBBK...',
  'KKKKKKKKKKKKKKKKKKKKKKKK',
  'KRRKWWKRRKWWKRRKWWKRRRRK',
  'KRRKWWKRRKWWKRRKWWKRRRRK',
  'KRRRRRRRRRRRRRRRRRRRRRRK',
  'KRRKWWKRRKCCKRRKWWKRRRRK',
  'KRRKWWKRRKCCKRRKWWKRRRRK',
  'KRRKWWKRRKCCKRRKWWKRRRRK',
  'KKKKKKKKKKKKKKKKKKKKKKKK',
]

// 8×8 cloud puff pieces are generated procedurally; this is the small
// chimney-smoke puff.
export const SMOKE_PUFF = [
  '..LLLL..',
  '.LLLLLL.',
  'LLLLLLLL',
  '.LLLLLL.',
  '..LLLL..',
]
