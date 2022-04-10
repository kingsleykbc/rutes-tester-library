import React from 'react';
import './Feedback.css';
import AddFeedback from '../FeedbackComponents/AddFeedback/AddFeedback';
import FeedbackItem from '../FeedbackComponents/FeedbackItem/FeedbackItem';

const Feedback = ({ session: { response } }) => {
	return (
		<div className='Feedback'>
			<div className='feedbackList'>
				{response.feedback.map(item => (
					<FeedbackItem key={item.id} data={item} />
				))}
			</div>
			<div className='addFeedback'>
				<AddFeedback />
			</div>
		</div>
	);
};

export default Feedback;
