import React, { useState, useEffect } from 'react';
import AccountInfo from '../AccountInfo/AccountInfo';
import Options from '../Options/Options';
import './Layout.css';
import AllTests from '../TestsComponents/AllTests/AllTests';
import SubLayout from '../SubLayout/SubLayout';
import Feedback from '../Feedback/Feedback';
import Menu from '../Menu/Menu';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import useWindowSize from '../../hooks/useWindowSize';
import WarningBar from '../WarningBar/WarningBar';
import { DEVICE_SCREENS } from '../../lib/config';
import Annotations from '../Annotations/Annotations';
import Chat from '../Chat/Chat';

/**
 * IMPORT ICONS
 *
 * @reference (Package) react-icons (2022), https://github.com/react-icons/react-icons
 */
import { AiOutlineMenuFold as IcHide } from 'react-icons/ai';
import { AiOutlineMenuUnfold as IcShow } from 'react-icons/ai';

/**
 * MAIN COMPONENT
 */
const Layout = ({ children, view, subView, session, updateData, logout }) => {
	const [show, setShow] = useState(true);
	const [device, setDevice] = useState('loading..');
	const toggle = () => setShow(!show);
	const { x, y, showMenu, event, toggleMenu, mouseX, mouseY } = useRightClickMenu();
	const { width, height } = useWindowSize();

	/**
	 * GET THE DEVICE FROM WINDOW WIDTH
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
					parseInt(width) >= deviceWidth - 25 &&
					parseInt(width) <= deviceWidth + 25 /* && (height >= deviceHeight - 200 && height <= deviceHeight + 200)*/
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
					updateData={updateData}
					toggleMenu={toggleMenu}
				/>
			)}

			{/* UN-SUPPORTED RESOLUTION WARNING */}
			{!device && <WarningBar />}

			{/* MAIN WIDGET */}
			<aside className={show && !showMenu ? 'layout-aside' : 'layout-aside hide'}>
				<div className='layout-content'>
					<AccountInfo session={session} device={device} />
					<main>{children}</main>

					{/* Show options (Feedback, Chat, etc.) If it isn't time for a pre or post questionnaire */}
					{!view.includes('questionnaire') && <Options />}
					<ExitButton logout={logout} />
				</div>

				{subView && (
					<div id='sub-layout-content'>
						<SubLayout title={subView}>
							{/* SET THE SUB VIEW */}
							{subView === 'All tests' && <AllTests session={session} />}
							{subView === 'Feedback' && <Feedback session={session} />}
							{subView === 'Chat' && <Chat session={session} />}
						</SubLayout>
					</div>
				)}

				<div className='toggleButton iconButton filled' onClick={toggle}>
					{show ? <IcHide /> : <IcShow />}
				</div>
			</aside>

			{/* ANNOTATIONS */}
			<Annotations session={session} device={device} updateData={updateData} />
		</div>
	);
};

export default Layout;

/**
 * EXIT TEST BUTTON TO TRIGGER LOGOUT AND SESSION END
 */
const ExitButton = ({ logout }) => {
	return <button onClick={logout}>Exit test</button>;
};
