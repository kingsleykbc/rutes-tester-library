export const session = {
	testerEmail: 'john@example.com',
	progress: 20,
	project: {
		title: 'The sample website',
		description: 'An e-parking solution for handling automatic parking lot allocation',
		tests: [
			{
				route: '/',
				fullRoute: 'http://localhost:3000',
				instructions: ['Do the first thing', 'Scroll to the bottom of the second page', 'leave a comment']
			},
			{
				route: '/about',
				fullRoute: 'http://localhost:3000/about',
				instructions: ['Interact with the about page', 'Do something cool here']
			}
		],
		preQuestionnaire: [
			{ id: '34252323', type: 'text', question: 'What is the biggest challenge you face with existing systems?' },
			{
				id: 'IG35G873',
				type: 'multi-choice',
				question: 'How often do you use similar systems?',
				options: ['very often', 'rarely', 'not at all']
			},
			{ id: '3459K323', type: 'text', question: 'What is the biggest challenge you face with existing systems?' }
		],
		postQuestionnaire: [
			{ id: '403jnund', type: 'text', question: 'What else would you like to see in the system?' },
			{
				id: '43undius9',
				type: 'multi-choice',
				question: 'How good was the interaction with UI elements?',
				options: ['Very good', 'good', 'Poor', 'Very poor']
			}
		]
	},
	response: {
		feedback: [
			{
				id: '1',
				title: 'Microscope note title',
				type: 'feature request',
				message: 'Can we add a microscope',
				route: '/',
				testerName: 'susan',
				timePosted: new Date()
			},
			{
				id: '1pisd',
				title: 'Tracker title',
				type: 'feature request',
				message: 'Have a tracker',
				route: '/',
				testerName: 'John',
				timePosted: new Date()
			}
		],
		annotations: [
			{
				route: '/',
				point: { mouseX: 200, mouseY: 399 },
				message: 'This is the first message',
				timePosted: new Date(),
				testerName: 'John frank',
				sessionID: '#378463'
			}
		],
		preQuestionnaireResponse: [
			{ questionID: '34252323', answer: 'It is difficult to navigate' },
			{ questionID: 'IG35G873', answer: 'rarely' }
		],
		postQuestionnaireResponse: null
	}
};
