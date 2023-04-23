import { calculateDepth } from './frac.js'

function pallet(index) {
	// return `rgb(${index}, 0, 255)`
	return `hsl(${index * 2.5} 80% 50%)`
}

const setPixel = (context, x, y, c) => {
	context.fillStyle = c
	context.fillRect(x, y, 1, 1)
}

function* xy(width, height, box) {
	const widthM1 = width - 1
	const heightM1 = height - 1

	for (let x = 0; x < width; x++) {
		const cx = box.x1 + (x * (box.x2 - box.x1) / widthM1)

		for (let y = 0; y < height; y++) {
			const cy = box.y1 + (y * (box.y2 - box.y1) / heightM1)

			yield { x:cx, y:cy, tx:x, ty:y }
		}
	}
}

async function onmessageAsync(msg) {
	console.log('Worker: message', msg)

	const { data } = msg
	const { box, maxDepth, target } = data
	const { width, height } = target

	const canvas = new OffscreenCanvas(width, height)
	const context = canvas.getContext('2d', { colorSpace: 'display-p3' })
	context.imageSmoothingEnabled = true

	for (const point of xy(width, height, box)) {
		const d = calculateDepth(point.x, point.y, maxDepth)

		const color = d === maxDepth ? 'black' : pallet(d)

		setPixel(context, point.tx, point.ty, color)
	}

	//const imageData = context.getImageData(0, 0, width, height, { colorSpace: 'display-p3' })
	const imageBitmap = await createImageBitmap(canvas)

	postMessage({
		box, target, maxDepth,

		imageBitmap
		}, { transfer: [ imageBitmap ] })

	console.log('Done.')
}

onmessage = msg => {
	onmessageAsync(msg)
		.then(() => {})
		.catch(e => console.warn(e))
}
