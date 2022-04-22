import React from 'react';
import './Options.css';
import { BsChatRight as IcChat } from 'react-icons/bs';
import { BsReplyAllFill as IcFeedback } from 'react-icons/bs';
import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';

const Options = () => {
	const { setSubView } = useViewAndSession();
	return (
		<div className='Options'>
			<Option onClick={() => setSubView('Chat')} icon={<IcChat />}>
				Chat
			</Option>
			<Option onClick={() => setSubView('Feedback')} icon={<IcFeedback />}>
				Feedback
			</Option>
		</div>
	);
};

export default Options;

const Option = ({ icon, onClick, children }) => {
	return (
		<div className='Option' onClick={onClick}>
			<div className='icon'>{icon}</div>
			<p>{children}</p>
		</div>
	);
};
