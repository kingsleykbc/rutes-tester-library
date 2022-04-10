import { useState } from 'react';
import './AddFeedback.css';

/**
 * FORM TO ADD NEW FEEDBACK
 */
const AddFeedback = () => {
	const [type, setType] = useState('');
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');

	/**
	 * HANDLE POSTING FEEDBACK
	 */
	const postFeedback = e => {
		e.preventDefault();
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<form className='AddFeedback' onSubmit={postFeedback}>
			{/* FEEDBACK TYPE */}
			<select value={type} onChange={e => setType(e.target.value)} required>
				<option value='' disabled>
					Feedback type
				</option>
				<option>note</option>
				<option>feature request</option>
				<option>error report</option>
			</select>

			{/* TITLE */}
			<input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' required />

			{/* ACTUAL FEEDBACK */}
			<textarea required value={message} onChange={e => setMessage(e.target.value)} placeholder='Describe note'></textarea>
			{/* SUBMIT BUTTON */}
			<button>Add feedback</button>
		</form>
	);
};

export default AddFeedback;
