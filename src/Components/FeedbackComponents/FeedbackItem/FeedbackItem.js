import React from 'react';
import './FeedbackItem.css';

const FeedbackItem = ({ data: { title, type, message, timePosted } }) => {
	return (
		<div className='FeedbackItem whiteboard'>
			<span className='title'>{title}</span>

			<p>{message}</p>
			<div className='feedbackItem-details'>
				<span>{type}</span>
				<span>{new Date(timePosted).toLocaleDateString()}</span>
			</div>
		</div>
	);
};

export default FeedbackItem;
