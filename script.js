const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const scoreboard = document.querySelector('.score')
const startButton = document.querySelector('button')
let lastHole
let timeUp = false
let score = 0

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length)
	const hole = holes[idx]
	if (hole === lastHole) {
		return randomHole(holes)
	}

	lastHole = hole
	return hole
}

function peep() {
	const time = randomTime(200, 1000)
	const hole = randomHole(holes)
	hole.classList.add('up')
	setTimeout(() => {
		hole.classList.remove('up')
		if (!timeUp) peep()
	}, time)
}

function startGame() {
	score = 0
	scoreboard.textContent = score
	timeUp = false
	peep()
	setTimeout(() => (timeUp = true), 10000)
}

function bonk(e) {
	if (!e.isTrusted) return

	score++
	this.classList.remove('up')
	scoreboard.textContent = score
}

moles.forEach((mole) => mole.addEventListener('click', bonk))
