import { useState } from 'react';
import './AddFeedback.css';

/**
 * FORM TO ADD NEW FEEDBACK
 */
const AddFeedback = ({ updateData }) => {
	const [type, setType] = useState('');
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	/**
	 * HANDLE POSTING FEEDBACK
	 */
	const postFeedback = async e => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			await updateData('FEEDBACK', { type, title, message });
		} catch (e) {
			console.log(e.networkError.result.errors);
			setError(e.message);
		}
		setLoading(false);

		// Reset fields
		setType('');
		setTitle('');
		setMessage('');
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
			<textarea value={message} onChange={e => setMessage(e.target.value)} placeholder='Describe note' required />

			{/* SUBMIT BUTTON */}
			<button disabled={loading}>{loading ? 'Adding...' : 'Add feedback'}</button>

			{error && <h5>{error}</h5>}
		</form>
	);
};

export default AddFeedback;
