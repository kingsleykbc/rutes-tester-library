import React from 'react';
import './BeginLightBox.css';
import LightBox from '../../UIComponents/Lightbox/LightBox';

const BeginLightBox = ({ show, toggle, onBegin, route }) => {
	return (
		<LightBox className='BeginLightBox' show={show} toggle={toggle}>
			<h3>
				<b>{route}</b> test
			</h3>
			<p>
				Kindly follow the instructions on the sidebar, and click <b>Mark as done</b> when finished.
				<br />
				<br />
				NOTE: Remember to record the correct screen during the session.
			</p>

			<button
				className='filled'
				onClick={() => {
					onBegin();
					toggle();
				}}
			>
				Begin
			</button>
		</LightBox>
	);
};

export default BeginLightBox;
