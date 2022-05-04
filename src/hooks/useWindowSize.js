import { useEffect, useState } from 'react';

/**
 * GET WINDOW WIDTH AND HEIGHT
 */
export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: '100vh',
		height: '100vh'
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth + 'px',
				height: window.innerHeight + 'px'
			});
		}

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}
