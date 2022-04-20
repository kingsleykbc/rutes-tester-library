import React, { useState } from 'react';
import LightBox from '../UIComponents/Lightbox/LightBox';
import Spinner from '../UIComponents/Spinner/Spinner';
import { BiErrorAlt as IcError } from 'react-icons/bi';
import Cookie from 'js-cookie';
import './AuthBox.css';

const AuthBox = ({ dataReady, error, login }) => {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop)
	});
	const [testerEmail, setTesterEmail] = useState(params.testerEmail || Cookie.get('rutes-tester-library-testerEmail') || '');
	const [isLoading, setIsLoading] = useState('');
	const [showLB, setShowLB] = useState(true);
	const toggleLB = () => setShowLB(!showLB);

	/**
	 * HANDLE LOGIN
	 */
	const handleLogin = async e => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await login(testerEmail);
		} catch (e) {
			setIsLoading(false);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<LightBox className='rutes-auth-box' show={showLB} toggle={toggleLB}>
			{!dataReady ? (
				<Status type='loading' />
			) : error === 'No project key entered' ? (
				<Status type='noProjectKey' />
			) : (
				// If no testerEmail (if tester email is unauthorized, it will be displayed in the form)
				<form onSubmit={handleLogin}>
					<h3>Enter tester email</h3>
					<input type='email' required value={testerEmail} onChange={e => setTesterEmail(e.target.value)} placeholder='emeka@example.com' />
					<button disabled={isLoading} className='filled'>
						{isLoading ? 'Starting...' : 'Start/resume session'}
					</button>
					{error && <h5>{error}</h5>}
				</form>
			)}
		</LightBox>
	);
};

export default AuthBox;

/**
 * ERROR MESSAGES
 */
const Status = ({ type }) => {
	return (
		<div className='rutes-status'>
			<div className='icon'>{type === 'loading' ? <Spinner scale={2.5} /> : <IcError size='3rem' color='var(--primaryColor)' />}</div>
			<h3>{type === 'loading' ? 'Loading' : 'No project key entered'}</h3>
			<p className='lightText'>{type === 'loading' ? 'Please wait while the extension is loading' : ' Project key not entered'}</p>
		</div>
	);
};
