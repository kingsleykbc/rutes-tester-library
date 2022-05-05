import './Chat.css';
import ChatForm from '../ChatComponents/ChatForm/ChatForm';
import Message from '../ChatComponents/Message/Message';
import { db } from '../../lib/firebase';
import { collection, orderBy, where, query, onSnapshot } from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';

const Chat = ({ session }) => {
	const messagesWrapperRef = useRef(null);
	const [mounted, setMounted] = useState(false);
	const [messages, setMessages] = useState(null);
	const [firestoreSession, setFirestoreSession] = useState(null);

	// Get messages
	useEffect(() => {
		const q = query(collection(db, 'rutes-message'), where('sessionID', '==', session.id), orderBy('createdAt'));

		// Subscribe query (for real-time update)
		const unsubscribe = onSnapshot(q, snapshot => {
			setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		});
		return unsubscribe;
	}, []);

	// Get session
	useEffect(() => {
		const q = query(
			collection(db, 'rutes-session'),
			where('projectKey', '==', session.projectKey),
			where('testerEmail', '==', session.testerEmail)
		);
		const unsubscribe = onSnapshot(q, snapshot => {
			const newSessions = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setFirestoreSession(newSessions[0]);
		});
		return unsubscribe;
	}, []);

	// Scroll to bottom when new message is added
	useEffect(() => {
		if (messagesWrapperRef.current && messages) {
			messagesWrapperRef.current.scrollTo({ top: messagesWrapperRef.current.scrollHeight, behavior: mounted ? 'smooth' : 'auto' });
			setMounted(true);
		}
	}, [messages]);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!messages) return <div className='placeholder'>Loading...</div>;
	return (
		<div className='rutes-chat'>
			{/* "IS TYPING" MESSAGE */}
			{firestoreSession?.adminTyping && <i className='rutes-isTyping'>Admin typing...</i>}

			{/* MESSAGES */}
			<div className='rutes-chat-messages' ref={messagesWrapperRef}>
				{messages.length === 0 && <div className='placeholder'>No messages</div>}
				{messages.map(message => (
					<Message key={message.id} data={message} />
				))}
			</div>

			{/* CHAT INPUT */}
			<ChatForm session={session} />
		</div>
	);
};

export default Chat;
