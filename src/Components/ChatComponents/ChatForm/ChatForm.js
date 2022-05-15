import { useState, useEffect } from 'react';
import './ChatForm.css';
import { BiSend as IcSend } from 'react-icons/bi';
import { db } from '../../../lib/firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';

const ChatForm = ({ session: { id, testerEmail } }) => {
	const [message, setMessage] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	/**
	 * LISTEN FOR WHETHER USER IS TYPING AND UPDATE DOC
	 */
	useEffect(() => {
		// Update typing status in firestore (so admin can know when tester is typing)
		const docRef = doc(db, 'rutes-session', id);
		if (message) {
			if (!isTyping) {
				updateDoc(docRef, { testerTyping: true });
				setIsTyping(true);
			}
		} else {
			updateDoc(docRef, { testerTyping: false });
			setIsTyping(false);
		}
	}, [message]);

	/**
	 * SEND THE MESSAGE
	 */
	const sendMessage = async e => {
		e.preventDefault();

		// Send message and update session
		const newMessage = await addDoc(collection(db, 'rutes-message'), {
			createdAt: new Date(),
			message,
			sender: testerEmail,
			sessionID: id
		});
		updateDoc(doc(db, 'rutes-session', id), { lastUpdated: new Date(), lastMessage: newMessage.id });

		// Reset form
		setMessage('');
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<form onSubmit={sendMessage} className='rutes-chatForm whiteboard'>
			<input type='text' value={message} onChange={e => setMessage(e.target.value)} placeholder='Enter message...' required />
			<button className='rutes-defaults sendButton'>
				<IcSend size='1.5rem' />
			</button>
		</form>
	);
};

export default ChatForm;
