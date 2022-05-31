import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';
import { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { BsRecordCircle as IcRecord } from 'react-icons/bs';
import './Tests.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import BeginLightBox from '../TestsComponents/BeginLightBox/BeginLightBox';
import { storage } from '../../lib/firebase';

const Tests = () => {
	// Get context state
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
	const routeIndex = tests.findIndex(item => item.route === '/' + window.location.pathname.split('/').pop());
	const test = tests[routeIndex];
	const previousTest = tests[routeIndex - 1];
	const nextTest = tests[routeIndex + 1];

	// If test is done
	const isDone = test ? response.completedTests.includes(test.route) : false;

	// States
	const [loading, setLoading] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [recordingBlob, setRecordingBlob] = useState(null);
	const [showLB, setShowLB] = useState(!isDone);
	const toggleLB = () => setShowLB(!showLB);

	/**
	 * SAVE THE RECORDING TO DATABASE
	 */
	const saveRecording = async () => {
		// Store in firebase
		const storageRef = ref(storage, `recordings/r_${testerEmail}_${projectKey}_${new Date().getTime()}.wav`);
		await uploadBytes(storageRef, recordingBlob);
		const recording = await getDownloadURL(storageRef);

		// Store in database
		await updateData('ADD_RECORDING', { route: test.route, recording });
	};

	/**
	 * RECORD SCREEN
	 *
	 * @reference (Package) react-media-recorder, thousand-petalled (2021), https://github.com/0x006F/react-media-recorder
	 */
	const { status, startRecording, stopRecording } = useReactMediaRecorder({
		screen: true,
		onStop: (blobURL, blob) => setRecordingBlob(blob)
	});

	/**
	 * STOP RECORDING WHEN MARKED AS COMPLETE
	 */
	useEffect(() => {
		if (isComplete) stopRecording();
	}, [isComplete]);

	/**
	 * WHEN THE RECORDING IS COMPLETE, SAVE IT OR SHOW ERROR IF IT WAS CANCELLED
	 */
	useEffect(() => {
		if (recordingBlob) {
			if (!isComplete) alert("Recording cancelled, please reload the page or recording won't be saved.");
			else saveRecording();
		}
	}, [recordingBlob]);

	/**
	 * SHOW A WARNING IF THE PAGE IS BEING UNLOADED BEFORE MARKING AS COMPLETE
	 */
	useEffect(() => {
		const onUnload = e => {
			if (!isComplete && test?.instructions?.length > 0) {
				e.preventDefault();
				(e || window.event).returnValue = 'Changes unsaved';
			}
		};
		window.addEventListener('beforeunload', onUnload);
		return () => window.removeEventListener('beforeunload', onUnload);
	}, [isComplete]);

	/**
	 * MARK TEST AS COMPLETE
	 */
	const completeTest = async () => {
		try {
			setLoading(true);
			setIsComplete(true);

			// Update database
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
							<button disabled={loading} className='filled' onClick={completeTest}>
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

					{!isDone && (
						<span className='rutes_tests_warningMessage'>
							Please mark as done before leaving page. {status !== 'recording' && <b>Not recording!</b>}
						</span>
					)}

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
