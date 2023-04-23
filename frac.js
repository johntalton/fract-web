
export function calculateDepth(cx, cy, maxDepth) {
  let count = 0

  let iSqr = 0
  let jSqr = 0
  let i = 0
  let j = 0

  while(((iSqr + jSqr) < 4) && (count < maxDepth)) {
    count += 1

    j = 2 * i * j + cy
    i = iSqr - jSqr + cx

    iSqr = Math.pow(i, 2)
    jSqr = Math.pow(j, 2)
  }

  return count
}









function render() {
  const resCache = {
  }

  let lookups = 0
  let total = 0


  const depth = 1500

  const widthM1 = canvas.width - 1
  const heightM1 = canvas.height - 1

  performance.mark('xy-start')

  for(let x = 0; x < canvas.width; x++) {
    const cx = X1 + (x * (X2 - X1) / widthM1)

    for(let y = 0; y < canvas.height; y++) {
      const cy = Y1 + (y * (Y2 - Y1) / heightM1)

      const count = calcDepth(cx, cy, depth)

      setPixel(x, y, count === depth ? 'black' : pallet(count))
    }
  }

  performance.mark('xy-end')


  const m = performance.measure(
    'xy-duration', 'xy-start', 'xy-end'
  )
  console.log(m.duration)


  const pct = (total - lookups) / total
  // console.warn({ lookups, total, pct })
  console.info('pct', pct * 100)
}
