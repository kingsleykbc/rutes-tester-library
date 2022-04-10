import { useState } from 'react';
import './Expandable.css';
import { AiOutlinePlusCircle as IcExpand } from 'react-icons/ai';
import { AiOutlineMinusCircle as IcCollapse } from 'react-icons/ai';

const Expandable = ({ defaultOpen = false, heading, content }) => {
	const [showContent, setShowContent] = useState(defaultOpen);
	const toggleContent = () => setShowContent(!showContent);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Expandable'>
			<div className='heading' onClick={toggleContent}>
				<div className='expandable-icon'>{showContent ? <IcCollapse /> : <IcExpand />}</div>
				<div className='details'>{heading}</div>
			</div>
			{showContent && <div className={`content`}>{content}</div>}
		</div>
	);
};

export default Expandable;
