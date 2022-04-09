import { useState } from 'react';
import './Tests.css';
import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';
import AllTests from '../TestsComponents/AllTests/AllTests';
import SubLayout from '../SubLayout/SubLayout';

const Tests = () => {
	const {
		session: {
			project: { tests }
		}
	} = useViewAndSession();

	// Toggle
	const [showLB, setShowLB] = useState(false);
	const toggleLB = () => setShowLB(!showLB);

	// Get the route
	const test = tests.find(item => item.route === window.location.pathname);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Tests'>
			<div className='topSection'>
				<h4>Test</h4>
				<div className='textButton' onClick={toggleLB}>
					All steps
				</div>
			</div>

			{!test?.instructions?.length > 0 ? (
				<div className='placeholder'>No tests specified for this route, try another page</div>
			) : (
				<div>
					{test.instructions.map((item, index) => (
						<Instruction key={item + index}>{item}</Instruction>
					))}
				</div>
			)}

			<SubLayout title='All tests' show={showLB} toggle={toggleLB}>
				<AllTests />
			</SubLayout>
		</div>
	);
};

export default Tests;

const Instruction = ({ children }) => {
	return <div className='Instruction whiteboard'>{children}</div>;
};
