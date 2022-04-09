import React from 'react';
import AccountInfo from '../AccountInfo/AccountInfo';
import Feedback from '../Options/Options';
import './Layout.css';

const Layout = ({ children, view, session }) => {
	return (
		<div className='Layout'>
			<aside>
				<AccountInfo />
				<main>{children}</main>
				{!view.includes('questionnaire') && <Feedback />}
				<ExitButton />
			</aside>
			<div className='toggleButton'>hide/show</div>
		</div>
	);
};

export default Layout;

const ExitButton = () => {
	return <button>Exit test</button>;
};
