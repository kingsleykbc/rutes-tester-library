import React from 'react';
import './Message.css';

const Message = ({ data: { createdAt, sender, message } }) => {
	const fromSelf = sender !== 'Admin';
	return (
		<div className={`rutes-Message ${fromSelf && 'fromSelf'}`}>
			<div className='rutes-Message-messageContent'>
				{!fromSelf && <h4>Admin</h4>}
				<p>{message}</p>
				<span>{createdAt.toDate().toLocaleString()}</span>
			</div>
		</div>
	);
};

export default Message;
