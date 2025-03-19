// Основная функция отрисовки.
export function drawChart(data, w, h, ctx, config) {
  ctx.clearRect(0, 0, w, h)

  // Рисуем сетку.
  drawGrid(ctx, config, Object.keys(data).length)

  // Рисуем график.
  ctx.beginPath()
  ctx.font = config.font
  ctx.fillStyle = config.fillColor

  Object.keys(data).forEach((text, index) => {
    ctx.fillStyle = config.fillTextColor
    ctx.fillText(text, 0, 30 + index * config.paddingRect)
    ctx.fillStyle = config.fillRectColor
    ctx.fillRect(90, 10 + index * config.paddingRect, data[text], 28)
    ctx.fillStyle = config.fillTextColor
    ctx.fillText(data[text], 90 + data[text] + 10, 30 + index * config.paddingRect)
  })
}

// Отрисовка сетки и осей.
function drawGrid(ctx, config, arrayCount) {
  // Ось Y.
  ctx.beginPath()
  ctx.strokeStyle = config.gridColor
  ctx.lineWidth = 1
  ctx.moveTo(90, 0)
  ctx.lineTo(90, config.paddingRect * arrayCount + 20)
  ctx.stroke()
}
