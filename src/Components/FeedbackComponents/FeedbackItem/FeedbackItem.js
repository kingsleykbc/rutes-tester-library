import React, { useState } from 'react';
import './FeedbackItem.css';

const FeedbackItem = ({ data: { title, type, message, createdAt }, deleteItem }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (isDeleting)
		return (
			<div className='FeedbackItem whiteboard'>
				<i className='lightText'>Deleting...</i>
			</div>
		);
	return (
		<div className='FeedbackItem whiteboard'>
			<div className='topSection'>
				<span className='title'>{title}</span>
				<div
					onClick={() => {
						deleteItem();
						setIsDeleting(true);
					}}
					className='del'
				>
					&times;
				</div>
			</div>

			<p>{message}</p>
			<div className='feedbackItem-details'>
				<span style={{ color: type === 'error report' ? 'var(--primaryColor)' : 'var(--lightText)' }}>{type}</span>
				<span>{new Date(createdAt).toLocaleDateString()}</span>
			</div>
		</div>
	);
};

export default FeedbackItem;
