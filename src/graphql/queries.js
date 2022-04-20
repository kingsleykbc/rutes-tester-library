import { gql } from '@apollo/client';

const queryFilters = `
	id
	testerEmail
	progress
	projectKey
	project {
		title
		description
		screenshots
		tests {
			route
			fullRoute
			instructions
		}
		preQuestionnaire {
			id
			type
			question
			options
		}
		postQuestionnaire {
			id
			type
			question
			options
		}
	}
	response {
		annotations {
			id
			element {
				tag
			}
			message
			point {
				mouseX
				mouseY
			}
		}
		feedback {
			id
			title
			type
			message
			createdAt
		}
		preQuestionnaireResponse {
			questionID
			answer
		}
		postQuestionnaireResponse {
			questionID
			answer
		}
		completedTests
	}
`;

export const getSessionQuery = gql`
	query ($testerEmail: String!, $projectKey: String!) {
		session(testerEmail: $testerEmail, projectKey: $projectKey) {
			${queryFilters}
		}
	}
`;

// ===================================================================================================================
//  MUTATIONS
// ===================================================================================================================
export const updateSessionAction = gql`
	mutation ($id: ID!, $projectKey: String!, $sessionUpdateData: SessionUpdateData!) {
		updateSession(id: $id, projectKey: $projectKey, sessionUpdateData: $sessionUpdateData) {
			${queryFilters}
		}
	}
`;

export const updateSessionFeedback = gql`
	mutation ($id: ID!, $feedbackID: ID) {
		updateSessionFeedback(id: $id, feedbackID: $feedbackID, feedbackData: $feedbackData) {
			${queryFilters}
		}
	}
`;

export const updateCompletedTests = gql`
	mutation ($id: ID!, $route: String!) {
		updateCompletedTests(id: $id, route: $route) {
			${queryFilters}
		}
	}
`;

export const updateQuestionnaireResponse = gql`
	mutation ($id: ID!, $type: String!, $answers: [QuestionnaireResponseData]!) {
		updateQuestionnaireResponse(id: $id, type: $type, answers: $answers) {
			${queryFilters}
		}
	}
`;
