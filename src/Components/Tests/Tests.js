import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';
import { useState } from 'react';
import './Tests.css';

const Tests = () => {
	const {
		setSubView,
		updateData,
		session: {
			project: { tests },
			response
		}
	} = useViewAndSession();

	const [loading, setLoading] = useState(false);

	// Get the current and next route
	const routeIndex = tests.findIndex(item => item.route === window.location.pathname);
	const test = tests[routeIndex];
	const previousTest = tests[routeIndex - 1];
	const nextTest = tests[routeIndex + 1];

	// If test is done
	const isDone = test ? response.completedTests.includes(test.route) : false;

	/**
	 * MARK TEST AS COMPLETE
	 */
	const completeTest = async () => {
		try {
			setLoading(true);
			await updateData('ADD_COMPLETED_TEST', test.route);
		} catch (e) {
			console.log(e);
		}
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
						{previousTest && (
							<a href={previousTest.fullRoute}>
								<button>Previous Step</button>
							</a>
						)}
						{!isDone ? (
							<button disabled={loading} className="filled" onClick={completeTest}>
								Mark as done
							</button>
						) : (
							<div className='highlight'>Completed</div>
						)}
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
