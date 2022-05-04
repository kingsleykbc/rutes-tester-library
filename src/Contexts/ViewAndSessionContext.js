import React, { Component, createContext, useContext } from 'react';
import apolloClient from '../lib/apollo';
import {
	getSessionQuery,
	updateAnnotations,
	updateCompletedTests,
	updateProjectScreenshotFromSession,
	updateQuestionnaireResponse,
	updateRecordings,
	updateSessionAction,
	updateSessionFeedback
} from '../graphql/queries';

/**
 * IMPORT JS-COOKIE
 * 
 * @reference (package) js-cookie (2022), v3.0.1, https://github.com/js-cookie/js-cookie 
 */
import Cookie from 'js-cookie';

/**
 * SETUP CONTEXT
 */
export const ViewAndSessionContext = createContext(null);
export const useViewAndSession = () => {
	return useContext(ViewAndSessionContext);
};

class ViewAndSessionContextProvider extends Component {
	state = {
		dataReady: false,
		session: null,
		error: '',
		refreshSession: this.getSessionData,
		view: 'tests',
		setView: view => this.setState({ view }),
		subView: null,
		setSubView: subView => this.setState({ subView }),
		updateSession: session => this.setState({ session }), // Dummy function to update the session data
		updateData: this.updateData.bind(this),
		login: this.login.bind(this),
		logout: this.logout.bind(this)
	};

	/**
	 * ON LOAD, GET DEFAULT VIEW AND SESSION
	 */
	async componentDidMount() {
		await this.getData();
	}

	/**
	 * GET SESSION DATA AND CONFIGURE VIEWS
	 */
	async getData(sessionData) {
		this.setState({ dataReady: false });
		const session = sessionData || (await this.getSessionData());
		let view = 'tests';

		if (session.error) {
			this.setState({ session: null, dataReady: true, error: session.error });
			return { error: session.error };
		}

		const { project, response } = session;

		// If pre questionnaire hasn't been done, show it
		if (project.preQuestionnaire?.length > 0 && response.preQuestionnaireResponse?.length === 0) {
			view = 'pre-questionnaire';
		}
		// If all tests have been completed
		else if (response.completedTests.length === project.tests.length) {
			// If post questionnaire hasn't been done, show it
			if (project.postQuestionnaire?.length > 0 && response.postQuestionnaireResponse?.length === 0) view = 'post-questionnaire';
			else view = 'complete';
		}
		this.setState({ session, dataReady: true, error: '', view });
		return session;
	}

	/**
	 * GET SESSION DATA AND UPDATE STATE
	 * @returns Session data and error
	 */
	async getSessionData() {
		try {
			// Check if tester email and error message is present
			const testerEmail = Cookie.get('rutes-tester-library-testerEmail');
			const projectKey = document.querySelector('#rutes-import-script')?.dataset?.projectKey || window.rutes_project_key;
			if (!projectKey) throw Error('No project key entered');
			else if (!testerEmail) throw Error('No tester email');

			// Fetch session data
			const {
				data: { session }
			} = await apolloClient.query({ query: getSessionQuery, variables: { testerEmail, projectKey } });
			return session;
		} catch (e) {
			return { error: e.message };
		}
	}

	/**
	 * UPDATE DATA
	 */
	async updateData(type, data) {
		try {
			let update;
			const { id, projectKey } = this.state.session;

			// Run the mutation for the update type
			switch (type) {
				// Update feedback
				case 'FEEDBACK':
					update = await apolloClient.mutate({
						mutation: updateSessionFeedback,
						variables: { id, feedbackData: data }
					});
					break;

				// Delete feedback
				case 'FEEDBACK_DELETE':
					update = await apolloClient.mutate({
						mutation: updateSessionFeedback,
						variables: { id, feedbackID: data }
					});
					break;

				// Add completed Test
				case 'ADD_COMPLETED_TEST':
					update = await apolloClient.mutate({
						mutation: updateCompletedTests,
						variables: { id, route: data }
					});
					break;

				// Add questionnaire response
				case 'ADD_QUESTIONNAIRE_RESPONSE':
					const { type, answers } = data;
					update = await apolloClient.mutate({
						mutation: updateQuestionnaireResponse,
						variables: { id, type, answers }
					});
					break;

				// Add screenshot
				case 'ADD_SCREENSHOT':
					update = await apolloClient.mutate({
						mutation: updateProjectScreenshotFromSession,
						variables: { id, screenshot: data }
					});
					break;

				// Add recording
				case 'ADD_RECORDING':
					update = await apolloClient.mutate({
						mutation: updateRecordings,
						variables: { id, recording: data }
					});
					break;

				// Add annotation
				case 'ADD_ANNOTATION':
					update = await apolloClient.mutate({
						mutation: updateAnnotations,
						variables: { id, annotationData: data }
					});
					break;

				// Delete feedback
				case 'ANNOTATION_DELETE':
					update = await apolloClient.mutate({
						mutation: updateAnnotations,
						variables: { id, annotationID: data }
					});
					break;

				// Update other things
				default:
					delete data.__typename;
					update = await apolloClient.mutate({
						mutation: updateSessionAction,
						variables: { id, projectKey, sessionUpdateData: { response: data } }
					});
			}

			// Refresh state
			await this.getData(update.data.session);
		} catch (e) {
			console.log(e.networkError.result.errors);
			throw e.message;
		}
	}

	/**
	 * HANDLE LOGGING IN WITH EMAIL
	 * @param {String} testerEmail
	 */
	async login(testerEmail) {
		Cookie.set('rutes-tester-library-testerEmail', testerEmail, { expires: 30 });
		const session = await this.getData();
		if (session.error) {
			throw session.error;
		}
	}

	/**
	 * HANDLE LOGGING OUT
	 */
	logout() {
		Cookie.remove('rutes-tester-library-testerEmail');
		this.setState({ session: null });
	}

	// =======================================================================
	//  RENDER
	// =======================================================================
	render() {
		const { children } = this.props;
		return <ViewAndSessionContext.Provider value={this.state}>{children}</ViewAndSessionContext.Provider>;
	}
}

export default ViewAndSessionContextProvider;
