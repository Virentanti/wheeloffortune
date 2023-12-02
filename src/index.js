const sectors = [
  { color: '#f82', label: '11' },
  { color: '#0bf', label: '8' },
  { color: '#fb0', label: '1' },
  { color: '#bf0', label: '5' },
  { color: '#fb0', label: '7' },
  { color: '#0fb', label: '6' },
  { color: '#f0b', label: '2' },
  { color: '#fb0', label: '4' },
  { color: '#0fb', label: '9' },
  { color: '#f0b', label: '3' },
  { color: '#bf0', label: '10' },
]











18
19
// const sectors = [
//   { color: '#f82', label: 'Disaster Tech Innovation' },
//   { color: '#0bf', label: 'Environmental Tech Solutions' },
//   { color: '#fb0', label: 'Local Tourism Tech Transformation' },
//   { color: '#0fb', label: 'Smart Campus Integration' },
//   { color: '#b0f', label: 'Student Safety Tech Advancements' },
//   { color: '#f0b', label: 'Multilingual EdTech Innovation' },
//   { color: '#bf0', label: 'Innovation Hub for Tech Excellence' },
//   { color: '#f82', label: 'Cloud Computing and Scalability' },
//   { color: '#0bf', label: 'AR/VR Experiences' },
//   { color: '#fb0', label: 'AI for Social Good' },
//   { color: '#0fb', label: 'E-commerce Optimization' },
//   { color: '#b0f', label: 'Virtual Collaboration Tools' },
//   { color: '#f0b', label: 'HealthTech Innovations' },
//   { color: '#bf0', label: 'Voice and Natural Language Processing' },
//   { color: '#fb0', label: 'Social Networking for Positive Impact' },
//   { color: '#0fb', label: 'Blockchain for Social Innovation' },
//   { color: '#b0f', label: 'MetaReality Experiences' },
//   { color: '#f0b', label: 'Sustainable Tech Solutions' },
//   { color: '#bf0', label: 'Open Innovation' },
// ]


const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
  const ang = arc * i
  ctx.save()
  // COLOR
  ctx.beginPath()
  ctx.fillStyle = sector.color
  ctx.moveTo(rad, rad)
  ctx.arc(rad, rad, rad, ang, ang + arc)
  ctx.lineTo(rad, rad)
  ctx.fill()
  // TEXT
  ctx.translate(rad, rad)
  ctx.rotate(ang + arc / 2)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 30px sans-serif'
  ctx.fillText(sector.label, rad - 10, 10)
  //
  ctx.restore()
}

function rotate() {
  const sector = sectors[getIndex()]
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
  spinEl.textContent = !angVel ? 'SPIN' : sector.label
  spinEl.style.background = sector.color
}

function frame() {
  if (!angVel) return
  angVel *= friction // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0 // Bring to stop
  ang += angVel // Update angle
  ang %= TAU // Normalize angle
  rotate()
}

function engine() {
  frame()
  requestAnimationFrame(engine)
}

function init() {
  sectors.forEach(drawSector)
  rotate() // Initial rotation
  engine() // Start engine
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.45)
  })
}

init()
