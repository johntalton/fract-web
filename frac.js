
export function calculateDepth(cx, cy, maxDepth) {
	let count = 0

	let iSqr = 0
	let jSqr = 0
	let i = 0
	let j = 0

	while (((iSqr + jSqr) < 4) && (count < maxDepth)) {
		count += 1

		j = 2 * i * j + cy
		i = iSqr - jSqr + cx

		iSqr = Math.pow(i, 2)
		jSqr = Math.pow(j, 2)
	}

	return count
}
