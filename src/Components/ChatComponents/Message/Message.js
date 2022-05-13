import React, { useState } from 'react';
import './Message.css';
import { MdDeleteOutline as IcDelete } from 'react-icons/md';
import { db } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Message = ({ data: { id, createdAt, sender, message } }) => {
	const fromSelf = sender !== 'Admin';
	const isDeleted = message === '<--unsent-->';
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * DELETE MESSAGE
	 */
	const deleteMessage = async () => {
		setIsLoading(true);
		try {
			await updateDoc(doc(db, 'rutes-message', id), { message: '<--unsent-->' });
			setIsLoading(false);
		} catch (e) {}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className={`rutes-Message ${fromSelf && 'fromSelf'}`}>
			{isLoading || isDeleted ? (
				<div className='rutes-message-deletedMessage'>
					<i>{isLoading ? 'Deleting...' : 'Message deleted'}</i>
				</div>
			) : (
				<>
					{fromSelf && !(isLoading || isDeleted) && (
						<div className='rutes-delIcon' onClick={deleteMessage}>
							<IcDelete />
						</div>
					)}
					<div className='rutes-Message-messageContent'>
						{!fromSelf && <h4>Admin</h4>}
						<p>{message}</p>
						<span>{createdAt.toDate().toLocaleString()}</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Message;
