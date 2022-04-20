import React from 'react';
import './Feedback.css';
import AddFeedback from '../FeedbackComponents/AddFeedback/AddFeedback';
import FeedbackItem from '../FeedbackComponents/FeedbackItem/FeedbackItem';
import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';

const Feedback = ({ session: { response } }) => {
	const { updateData } = useViewAndSession();

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Feedback'>
			<div className='feedbackList'>
				{response.feedback.length === 0 && <div className='placeholder'>No feedback provided</div>}
				{response.feedback.map(item => (
					<FeedbackItem deleteItem={() => updateData('FEEDBACK_DELETE', item.id)} key={item.id} data={item} />
				))}
			</div>
			<div className='addFeedback'>
				<AddFeedback updateData={updateData} />
			</div>
		</div>
	);
};

export default Feedback;
