import React from 'react';
import './Options.css';
import { BsChatRight as IcChat } from 'react-icons/bs';
import { BsReplyAllFill as IcFeedback } from 'react-icons/bs';

const Feedback = () => {
	return (
		<div className='Feedback'>
			<Option icon={<IcChat />}>Chat</Option>
			<Option icon={<IcFeedback />}>Feedback</Option>
		</div>
	);
};

export default Feedback;

const Option = ({ icon, onClick, children }) => {
	return (
		<div className='Option' onClick={onClick}>
			<div className='icon'>{icon}</div>
			<p>{children}</p>
		</div>
	);
};
