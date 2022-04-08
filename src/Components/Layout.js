import React from 'react';
import AccountInfo from './AccountInfo';
import Feedback from './Feedback';

const Layout = ({ children, view, session }) => {
	return (
		<div className='Layout'>
			<aside>
				<AccountInfo />
				<main>{children}</main>
				{!view.includes('questionnaire') && <Feedback />}
			</aside>
			<div className='toggleButton'>hide/show</div>
		</div>
	);
};

export default Layout;
