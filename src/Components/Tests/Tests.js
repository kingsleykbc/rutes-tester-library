import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';
import { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { BsRecordCircle as IcRecord } from 'react-icons/bs';
import './Tests.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import BeginLightBox from '../TestsComponents/BeginLightBox/BeginLightBox';
import { storage } from '../../lib/firebase';

const Tests = () => {
	const {
		setSubView,
		updateData,
		session: {
			testerEmail,
			projectKey,
			project: { tests },
			response
		}
	} = useViewAndSession();

	// Get the current and next route
	const routeIndex = tests.findIndex(item => item.route === window.location.pathname);
	const test = tests[routeIndex];
	const previousTest = tests[routeIndex - 1];
	const nextTest = tests[routeIndex + 1];

	// If test is done
	const isDone = test ? response.completedTests.includes(test.route) : false;

	// States
	const [loading, setLoading] = useState(false);
	const [hasRecording, setHasRecording] = useState(false);
	const [isComplete, setisComplete] = useState(false);
	const [showLB, setShowLB] = useState(!isDone);
	const toggleLB = () => setShowLB(!showLB);

	/**
	 * RECORD SCREEN
	 *
	 * @reference (Package) react-media-recorder, thousand-petalled (2021), https://github.com/0x006F/react-media-recorder
	 */
	const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });

	useEffect(() => {
		// Specify whether the this session has screen recording
		if (status === 'recording' && !hasRecording) setHasRecording(true);
		// Show error if recording is cancelled before marking session as complete
		else if (status === 'stopped' && !isComplete) alert("Recording cancelled, please reload the page or recording won't be saved.");
		// If mark as done button is just clicked
		else if (isComplete && status === 'recording') stopRecording();
		// If complete and recording has been captured
		else if (isComplete && (!hasRecording || (hasRecording && mediaBlobUrl))) completeTest();
	}, [status, mediaBlobUrl, isComplete]);

	/**
	 * MARK TEST AS COMPLETE
	 */
	const completeTest = async () => {
		try {
			setLoading(true);
			console.log(mediaBlobUrl);

			if (mediaBlobUrl) await saveRecording();

			// Update database
			await updateData('ADD_COMPLETED_TEST', test.route);
		} catch (e) {
			console.log(e);
		}
	};

	/**
	 * SAVE RECORDING TO FIREBASE STORAGE
	 */
	const saveRecording = async () => {
		// Store in firebase
		const blob = await fetch(mediaBlobUrl).then(r => r.blob());
		const storageRef = ref(storage, `recordings/r_${testerEmail}_${projectKey}_${new Date().getTime()}.wav`);
		await uploadBytes(storageRef, blob);
		const recording = await getDownloadURL(storageRef);

		// Store in database
		await updateData('ADD_RECORDING', { route: test.route, recording });
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
							<button disabled={loading} className='filled' onClick={() => setisComplete(true)}>
								{loading ? 'Saving...' : 'Mark as done'}
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

					{/* RECORDING ICON */}
					{status === 'recording' && (
						<div className='rutes_recordingStatus'>
							<IcRecord />
							<span> Session recording</span>
						</div>
					)}

					<BeginLightBox route={test.route} show={showLB} toggle={toggleLB} onBegin={startRecording} />
				</div>
			)}
		</div>
	);
};

export default Tests;

const Instruction = ({ children }) => {
	return <div className='Instruction whiteboard'>{children}</div>;
};
