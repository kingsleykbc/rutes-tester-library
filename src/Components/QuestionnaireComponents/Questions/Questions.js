import { useState } from 'react';
import { useViewAndSession } from '../../../Contexts/ViewAndSessionContext';
import './Questions.css';
import { FaRegQuestionCircle as IcQuestion } from 'react-icons/fa';

const Questions = ({ type, toggle }) => {
	const {
		session: { project, response },
		updateData
	} = useViewAndSession();

	const questions = type === 'Pre' ? project.preQuestionnaire : project.postQuestionnaire;
	const defaultAnswers = type === 'Pre' ? response.preQuestionnaireResponse : response.postQuestionnaireResponse;
	const [answers, setAnswers] = useState(defaultAnswers || []);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	/**
	 * ON CHANGE RESPONSE
	 */
	const onChange = (questionID, answer) => {
		const newAnswers = [...answers];

		const rIndex = newAnswers.findIndex(item => item.questionID === questionID);

		// Change the answer if its already in the response, or add it to response array
		if (rIndex !== -1) newAnswers[rIndex].answer = answer;
		else newAnswers.push({ questionID, answer });

		setAnswers(newAnswers);
	};

	/**
	 * SUBMIT QUESTIONNAIRE
	 */
	const submitQuestionnaire = async e => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		try {
			await updateData('ADD_QUESTIONNAIRE_RESPONSE', { type, answers });
			toggle();
		} catch (e) {
			setError(e.message);
		}
		setIsLoading(false);
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Questions'>
			<div className='questions-title'>{`${type}-questionnaire`.toUpperCase()}</div>
			<div className='questions-content'>
				<form className='rutes-defaults' onSubmit={submitQuestionnaire}>
					{questions.map(item => {
						// Find the answer in the response object and add it
						const answerIndex = answers.findIndex(val => val.questionID === item.id);
						return <Question key={`qq_${item.id}`} data={item} answer={answers[answerIndex]?.answer || ''} onChange={onChange} />;
					})}
					<button disabled={isLoading} className='filled'>
						{isLoading ? 'Submitting...' : 'Submit Questionnaire'}
					</button>
					<div className='aCenter'>{error && <h5>{error}</h5>}</div>
				</form>
			</div>
		</div>
	);
};

export default Questions;

/**
 * QUESTIONS
 */
const Question = ({ data: { id, question, type, options }, answer, onChange }) => {
	return (
		<div className='Question'>
			<div className='question-topSection'>
				<div className='icon'>
					<IcQuestion />
				</div>
				<p>{question}</p>
			</div>
			<div className='question-responseBox'>
				{type === 'multi-choice' ? (
					<div className='question-multichoiceOptions'>
						{options.map(item => (
							<label key={`opt_${item}_${id}`}>
								<input
									required
									type='radio'
									name={`${id}_option`}
									checked={answer === item}
									onChange={e => {
										if (e.target.checked) onChange(id, item);
									}}
								/>
								<p>{item}</p>
							</label>
						))}
					</div>
				) : (
					<textarea required value={answer || ''} placeholder='Answer' onChange={e => onChange(id, e.target.value)} />
				)}
			</div>
		</div>
	);
};
