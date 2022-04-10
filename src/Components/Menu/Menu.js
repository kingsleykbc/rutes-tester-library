import { useEffect, useState } from 'react';
import './Menu.css';
import html2canvas from 'html2canvas';

const Menu = ({ xpos, ypos, device, session, updateSession, toggleMenu, e }) => {
	const [message, setMessage] = useState('');
	useEffect(() => {
		e.target.style.outline = '3px dashed var(--primaryColor)';
		return () => {
			e.target.style.outline = '';
		};
	}, []);

	/**
	 * ADD ANNOTATION
	 */
	const addAnnotation = async e => {
		e.preventDefault();
		toggleMenu();

		// Prevent annotation form from showing in the screenshot
		document.querySelector('#AnnotationMenu').style.display = 'none';

		// If no screenshot taken, take screenshot and update the session
		if (!session.project.screenshots[device]) {
			const canvas = await html2canvas(document.querySelector('body'));

			canvas.toBlob(blob => {
				// Update session
				const imageData = new FormData();
				imageData.append('screen_shot', blob, device + '.png');

				// Replace this bottom with storing the image on Firebase, saving the URL to the DB, and updating the session with the URL
				const newSession = session;
				newSession.project.screenshots[device] = URL.createObjectURL(blob);
				updateSession(newSession);
			}, 'image/png');
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div id='AnnotationMenu' className='Menu' style={{ top: ypos, left: xpos }}>
			<h4>Place annotation</h4>
			<div className='AnnotationMenu_target'>
				<b>{e.target.tagName}</b> element
			</div>
			<form onSubmit={addAnnotation} id='AnnotationMenu_form'>
				<div className='textareaSection'>
					<textarea
						id='AnnotationMenu_input'
						placeholder='Annotation note'
						required
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
				</div>
				<button id='AnnotationMenu_button'>Post annotation</button>
			</form>
		</div>
	);
};

export default Menu;
