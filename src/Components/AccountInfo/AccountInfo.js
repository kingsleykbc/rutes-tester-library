import React from 'react';
import { FaRegUser as IcUser } from 'react-icons/fa';
import './AccountInfo.css';

const AccountInfo = ({ session: { testerEmail, project, progress }, device }) => {
	return (
		<div className='AccountInfo'>
			<div className='topSection'>
				{/* ICON */}
				<div className='icon'>
					<IcUser />
				</div>

				{/* DETAILS */}
				<div className='details'>
					<h4>{testerEmail}</h4>
					<p className='lightText'>{project.title}</p>
					<p className='lightText'>{device || 'Undetected device'} screen</p>
				</div>
			</div>

			{/* PROGRESS BAR */}
			<div className='progressSection'>
				<div className='progressBar'>
					<div style={{ width: progress + '%' }}></div>
				</div>
				<p>Progress: {progress.toFixed(0)}%</p>
			</div>
		</div>
	);
};

export default AccountInfo;
