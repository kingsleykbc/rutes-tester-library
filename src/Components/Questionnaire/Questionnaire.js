import { useState } from 'react';
import Questions from '../QuestionnaireComponents/Questions/Questions';
import LightBox from '../UIComponents/Lightbox/LightBox';
import './Questionnaire.css';

const Questionnaire = ({ type }) => {
	const [showLB, setShowLB] = useState(false);
	const toggleLB = () => setShowLB(!showLB);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Questionnaire whiteboard'>
			<h3>{type}-questionnaire</h3>
			<p className='lightText'>Before proceeding you must complete a questionnaire.</p>
			<button className='filled questionnaire-button' onClick={toggleLB}>
				Start Now
			</button>

			<LightBox show={showLB} toggle={toggleLB}>
				<Questions type={type} toggle={toggleLB} />
			</LightBox>
		</div>
	);
};

export default Questionnaire;
