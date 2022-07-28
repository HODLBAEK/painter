const modeBtn = document.getElementById("mode-btn")
const resetBtn = document.getElementById("reset-btn")
const eraserBtn = document.getElementById("eraser-btn")
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
)
const lineWidth = document.getElementById("line-width")
const selectColor = document.getElementById("color")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
ctx.lineWidth = lineWidth.value
let isPainting = false
let isFilling = false

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.moveTo(event.offsetX, event.offsetY)
}

function startPainting() {
  isPainting = true
}
function cancelPainting() {
  isPainting = false
}

function changeWidth(event) {
  ctx.lineWidth = event.target.value
}

function changeColor(event) {
  ctx.strokeStyle = event.target.value
  ctx.fillStyle = event.target.value
}

function onModeClick() {
  if (isFilling) {
    isFilling = false
    modeBtn.innerText = "In Draw Mode"
    canvas.style.cursor = "default"
  } else {
    isFilling = true
    modeBtn.innerText = "In Fill Mode"
    canvas.style.cursor = "pointer"
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, 900, 900)
  }
}

function onEraseAll() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 900, 900)
}

function onErase() {
  ctx.strokeStyle = "white"
  ctx.fillStyle = "white"
  canvas.style.cursor = "cell"
  isPainting = false
  isFilling = false
  selectColor.value = "#ffffff"
}

canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", startPainting)
canvas.addEventListener("mouseup", cancelPainting)
canvas.addEventListener("mouseleave", cancelPainting)
canvas.addEventListener("click", onCanvasClick)
lineWidth.addEventListener("change", changeWidth)
selectColor.addEventListener("change", changeColor)

function onColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color
  ctx.fillStyle = event.target.dataset.color
  selectColor.value = event.target.dataset.color
}

colorOptions.forEach((color) =>
  color.addEventListener("click", onColorClick)
)

modeBtn.addEventListener("click", onModeClick)
resetBtn.addEventListener("click", onEraseAll)
eraserBtn.addEventListener("click", onErase)
