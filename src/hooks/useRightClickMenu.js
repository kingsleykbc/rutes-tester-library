import { useState, useEffect } from 'react';

export default function useRightClickMenu() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);
	const [showMenu, setShowMenu] = useState(false);
	const [event, setEvent] = useState(null);

	const handleContextMenu = e => {
		e.preventDefault();
		const winWidth = window.innerWidth;
		const winHeight = window.innerHeight;

		// Prevent the menu leaving the view port
		e.pageX + 250 > winWidth ? setX(`${winWidth - 280}px`) : setX(e.pageX);
		e.pageY + 250 > winHeight ? setY(`${winHeight - 280}px`) : setY(e.pageY);

		setEvent(e);
		setMouseX(e.pageX);
		setMouseY(e.pageY);

		setShowMenu(true);
	};

	const handleClick = e => {
		if (e.target.id?.includes('AnnotationMenu')) return;
		showMenu && setShowMenu(false);
	};

	const toggleMenu = () => {
		setShowMenu(!setShowMenu);
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);
		document.addEventListener('contextmenu', handleContextMenu);
		return () => {
			document.removeEventListener('click', handleClick);
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	});

	return { x, y, showMenu, event, toggleMenu, mouseX, mouseY };
}
