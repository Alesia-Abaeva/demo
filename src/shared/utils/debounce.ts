export function debounce<T extends (...args: Parameters<T>) => void>(fn: T, delay: number) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null

	return function (...args: Parameters<T>) {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			fn(...args)
			timeoutId = null
		}, delay)
	}
}
