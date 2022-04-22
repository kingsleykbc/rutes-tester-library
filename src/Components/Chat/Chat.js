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

	// Get messages
	useEffect(() => {
		const collectionRef = collection(db, 'rutes-message');
		const q = query(collectionRef, where('sessionID', '==', session.id), orderBy('createdAt'));

		// Subscribe query (for real-time update)
		const unsubscribe = onSnapshot(q, snapshot => {
			setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
			<div className='rutes-chat-messages' ref={messagesWrapperRef}>
				{messages.length === 0 && <div className='placeholder'>No messages</div>}
				{messages.map(message => (
					<Message key={message.id} data={message} />
				))}
			</div>
			<ChatForm session={session} />
		</div>
	);
};

export default Chat;
