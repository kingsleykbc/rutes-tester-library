import React from 'react';
import { FaRegUser as IcUser } from 'react-icons/fa';
import './AccountInfo.css';
import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';

const AccountInfo = () => {
	const {
		session: { testerEmail, project, progress }
	} = useViewAndSession();

	return (
		<div className='AccountInfo'>
			<div className='topSection'>
				{/* ICON */}
				<div className='icon'>
					<IcUser />
				</div>

				{/* DETAILS */}
				<div className='details'>
					<h3>{testerEmail}</h3>
					<p className='lightText'>{project.title}</p>
				</div>
			</div>

			{/* PROGRESS BAR */}
			<div className='progressSection'>
				<div className='progressBar'>
					<div style={{ width: progress + '%' }}></div>
				</div>
				<p>Progress: {progress}%</p>
			</div>
		</div>
	);
};

export default AccountInfo;
