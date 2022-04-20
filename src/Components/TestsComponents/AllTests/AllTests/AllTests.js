import React from 'react';
import './AllTests.css';
import Expandable from '../../../UIComponents/Expandable/Expandable';
import { ImCheckboxUnchecked as IcUnchecked } from 'react-icons/im';
import { BsCheck2Square as IcChecked } from 'react-icons/bs';

const AllTests = ({
	session: {
		project: { tests, preQuestionnaire, postQuestionnaire },
		response
	}
}) => {

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='AllTests'>
			{preQuestionnaire.length !== 0 && (
				<Expandable
					defaultOpen={true}
					heading={
						<Heading done={response.preQuestionnaireResponse} isBold>
							Pre-session questionnaire
						</Heading>
					}
					content={<div className='lightText'>{preQuestionnaire.length}-question questionnaire</div>}
				/>
			)}

			{/* TESTS */}
			{tests.map((item, index) => (
				<Expandable
					key={`ex_${item.route}`}
					heading={
						<Heading done={response.completedTests.includes(item.route)}>
							<b>{item.route}</b> test
						</Heading>
					}
					content={<HiddenContent data={item} />}
				/>
			))}

			{postQuestionnaire.length !== 0 && (
				<Expandable
					defaultOpen={true}
					heading={
						<Heading done={response.postQuestionnaireResponse} isBold>
							Post-session questionnaire
						</Heading>
					}
					content={<div className='lightText'>{postQuestionnaire.length}-question questionnaire</div>}
				/>
			)}
		</div>
	);
};

export default AllTests;

const Heading = ({ done, children, isBold }) => {
	return (
		<div className='Heading'>
			<p style={{ fontWeight: isBold ? 'bold' : 'normal' }}>{children}</p>
			<div className={`icon ${done && 'done'}`}>{done ? <IcChecked /> : <IcUnchecked />}</div>
		</div>
	);
};

const HiddenContent = ({ data, data: { fullRoute, instructions } }) => {
	// NOTE: fullRoute =  window.location.protocol + '//' + window.location.host + route
	return (
		<div className='HiddenContent'>
			<h4>Full route</h4>
			<a className='textButton' href={fullRoute}>
				{fullRoute}
			</a>

			<h4>Instructions</h4>
			<ul>
				{instructions.map((item, index) => (
					<li key={`hd_${item}_${index}`}>{item}</li>
				))}
			</ul>
		</div>
	);
};
