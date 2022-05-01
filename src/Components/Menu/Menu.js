import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Menu.css';
import html2canvas from 'html2canvas';
import { storage } from '../../lib/firebase';

const Menu = ({ xpos, ypos, device, session, updateData, toggleMenu, e, mouseX, mouseY }) => {
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const route = window.location.pathname;

	/**
	 * ADD OUTLINE TO THE TARGET ELEMENT ON ANNOTATION OPEN
	 */
	useEffect(() => {
		e.target.style.outline = '3px dashed var(--primaryColor)';
		return () => {
			e.target.style.outline = '';
		};
	});

	/**
	 * ADD ANNOTATION
	 */
	const addAnnotation = async event => {
		event.preventDefault();
		setIsLoading(true);
		try {
			// Verify device width
			if (!device) {
				alert('This is viewport is unsupported. Resize browser or use another device');
				return;
			}

			// Prevent annotation form from showing in the screenshot
			toggleMenu();
			document.querySelector('#AnnotationMenu').style.display = 'none';

			// If no screenshot taken, take screenshot and update the session
			if (!includesDeviceScreenshot()) await takeAndStoreScreenShot();

			// Store point
			const newAnnotation = {
				device,
				route,
				point: { mouseX, mouseY },
				message,
				element: {
					tag: e.target.tagName,
					id: e.target.id,
					className: e.target.className
				}
			};
			await updateData('ADD_ANNOTATION', newAnnotation);
		} catch (e) {
			console.log(e);
		}
		setIsLoading(false);
	};

	/**
	 * TAKE AND STORE SCREENSHOT
	 */
	const takeAndStoreScreenShot = async () => {
		/**
		 * CAPTURE ENTIRE PAGE AS HTML CANVAS
		 *
		 * @reference (Library) html2canvas (v1.4.1), Hertzen N. (2022), http://html2canvas.hertzen.com/
		 */
		const canvas = await html2canvas(document.querySelector('body'));
		canvas.toBlob(async blob => {
			// Store in firebase
			const storageRef = ref(storage, `screenshots/screenshot_${device}_${new Date().getTime()}.jpg`);
			await uploadBytes(storageRef, blob);
			const screenshot = await getDownloadURL(storageRef);

			// Store in database
			await updateData('ADD_SCREENSHOT', { device, route, screenshot });
		}, 'image/png');
	};

	/**
	 * SEE IF DEVICE SCREENSHOT EXISTS
	 */
	const includesDeviceScreenshot = () => {
		const { screenshots } = session.project;
		const length = screenshots?.length || 0;

		for (let i = 0; i < length; i++) if (screenshots[i].device === device && screenshots[i].route === route) return true;
		return false;
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
				<button disabled={isLoading} id='AnnotationMenu_button'>
					{isLoading ? 'Loading...' : 'Post annotation'}
				</button>
			</form>
		</div>
	);
};

export default Menu;
