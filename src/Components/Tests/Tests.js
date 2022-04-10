import './Tests.css';
import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';

const Tests = () => {
	const {
		setSubView,
		session: {
			project: { tests },
			response
		}
	} = useViewAndSession();

	// Get the current and next route
	const routeIndex = tests.findIndex(item => item.route === window.location.pathname);
	const test = tests[routeIndex];
	const nextTest = tests[routeIndex + 1];

	// If test is done
	const isDone = response.completedTests.includes(test.route);

	/**
	 * MARK TEST AS COMPLETE
	 */
	const completeTest = () => {
		// Handle completion and refresh here
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Tests'>
			<div className='topSection'>
				<h4>Test</h4>
				<div className='textButton' onClick={() => setSubView('All tests')}>
					All steps
				</div>
			</div>

			{!test?.instructions?.length > 0 ? (
				<div className='placeholder'>No tests specified for this route, try another page</div>
			) : (
				<div className='tests-instructions'>
					{test.instructions.map((item, index) => (
						<Instruction key={item + index}>{item}</Instruction>
					))}
					<div className='options'>
						{!isDone ? <button onClick={completeTest}>Mark as done</button> : <div className='highlight'>Completed</div>}
						{nextTest && (
							<a href={nextTest.fullRoute}>
								<button>Next Step</button>
							</a>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Tests;

const Instruction = ({ children }) => {
	return <div className='Instruction whiteboard'>{children}</div>;
};
