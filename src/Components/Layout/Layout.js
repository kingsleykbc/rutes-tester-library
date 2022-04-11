import React, { useState, useEffect } from 'react';
import AccountInfo from '../AccountInfo/AccountInfo';
import Options from '../Options/Options';
import './Layout.css';
import { AiOutlineMenuFold as IcHide } from 'react-icons/ai';
import { AiOutlineMenuUnfold as IcShow } from 'react-icons/ai';
import AllTests from '../TestsComponents/AllTests/AllTests/AllTests';
import SubLayout from '../SubLayout/SubLayout';
import Feedback from '../Feedback/Feedback';
import Menu from '../Menu/Menu';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import useWindowSize from '../../hooks/useWindowSize';
import WarningBar from '../WarningBar/WarningBar';
import { DEVICE_SCREENS } from '../../config';
import Annotations from '../Annotations/Annotations';

const Layout = ({ children, view, subView, session, updateSession }) => {
	const [show, setShow] = useState(true);
	const [device, setDevice] = useState('loading..');
	const toggle = () => setShow(!show);
	const { x, y, showMenu, event, toggleMenu, mouseX, mouseY } = useRightClickMenu();
	const { width, height } = useWindowSize();

	/**
	 * TAKE SCREENSHOT OF PAGE IN THIS RESOLUTION (IF NONE ALREADY EXISTS)
	 */
	useEffect(() => {
		/**
		 * GET DEVICE RESOLUTION AND CAPTURE SCREEN (IF NOT DONE)
		 * Height checking is excluded for now to keep it simpler
		 */
		const getDevice = () => {
			// Loop through the configured devices
			for (let dev in DEVICE_SCREENS) {
				const { width: deviceWidth } = DEVICE_SCREENS[dev];

				// If it matches resolution
				if (
					parseInt(width) >= deviceWidth - 50 &&
					parseInt(width) <= deviceWidth + 50 /* && (height >= deviceHeight - 200 && height <= deviceHeight + 200)*/
				) {
					return dev;
				}
			}
			return null;
		};

		setDevice(getDevice());
	}, [width, height, session]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Layout'>
			{/* ANNOTATION MENU */}
			{showMenu && (
				<Menu
					xpos={x}
					ypos={y}
					mouseX={mouseX}
					mouseY={mouseY}
					e={event}
					device={device}
					session={session}
					updateSession={updateSession}
					toggleMenu={toggleMenu}
				/>
			)}

			{/* UN-SUPPORTED RESOLUTION WARNING */}
			{!device && <WarningBar />}

			{/* MAIN WIDGET */}
			<aside className={show && !showMenu ? 'layout-aside' : 'layout-aside hide'}>
				<div className='layout-content'>
					<AccountInfo session={session} device={device} />
					<main>
						{/* <pre>{JSON.stringify({ screenshots: session.project.screenshots, annotations: session.response.annotations }, null, 2)}</pre> */}
						{children}
					</main>
					{!view.includes('questionnaire') && <Options />}
					<ExitButton />
				</div>

				{subView && (
					<div id='sub-layout-content'>
						<SubLayout title={subView}>
							{/* SET THE SUB VIEW */}
							{subView === 'All tests' && <AllTests session={session} />}
							{subView === 'Feedback' && <Feedback session={session} />}
						</SubLayout>
					</div>
				)}

				<div className='toggleButton iconButton filled' onClick={toggle}>
					{show ? <IcHide /> : <IcShow />}
				</div>
			</aside>

			{/* ANNOTATIONS */}
			<Annotations session={session} device={device} />
		</div>
	);
};

export default Layout;

const ExitButton = () => {
	return <button>Exit test</button>;
};
