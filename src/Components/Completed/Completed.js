import React from 'react';
import './Completed.css';
import { MdOutlineCelebration as IcCelebration } from 'react-icons/md';

/**
 * "COMPLETED" MESSAGE
 */
const Completed = () => (
	<div className='Completed'>
		<IcCelebration size='3.5rem' color='var(--primaryColor)' />
		<h3>Congratulations!</h3>
		<p className='lightText'>
			You have completed all tests sessions. You can exit the test now or leave more feedback and annotations. Thank you.
		</p>
	</div>
);

export default Completed;
