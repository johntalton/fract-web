import { calculateDepth } from './frac.js'

// const width = 100
// const height = 100
// const canvas = new OffscreenCanvas(width, height)




function* xy(width, height, box) {
	const widthM1 = width - 1
	const heightM1 = height - 1

	for (let x = 0; x < width; x++) {
		const cx = box.x1 + (x * (box.x2 - box.x1) / widthM1)

		for (let y = 0; y < height; y++) {
			const cy = box.y1 + (y * (box.y2 - box.y1) / heightM1)

			yield { x:cx, y:cy }
		}
	}
}

async function onmessageAsync(msg) {
	console.log('Worker: message', msg)

	const { data } = msg
	const { box, maxDepth, target } = data
	const { width, height } = target

	for (const point of xy(width, height, box)) {
		const d = calculateDepth(point.x, point.y, maxDepth)
		// console.log(point, d)
		postMessage({
			box, point,
			target,
			maxDepth, depth: d
		})
	}

	console.log('Done.')
}

onmessage = msg => {
	onmessageAsync(msg)
		.then(() => {})
		.catch(e => console.warn(e))
}
