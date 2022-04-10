import React, { Component, createContext, useContext } from 'react';
import { session as sessionData } from '../dummybase';

export const ViewAndSessionContext = createContext(null);

export const useViewAndSession = () => {
	return useContext(ViewAndSessionContext);
};

class ViewAndSessionContextProvider extends Component {
	state = {
		session: null,
		refreshSession: this.getSessionData,
		view: 'tests',
		setView: view => this.setState({ view }),
		subView: null,
		setSubView: subView => this.setState({ subView }),
		updateSession: session => this.setState({ session }) // Dummy function to update the session data
	};

	componentDidMount() {
		const session = this.getSessionData();
		const { project, response } = session;
		let view = 'tests';

		// GET DEFAULT VIEW

		// If pre questionnaire hasn't been done, show it
		if (project.preQuestionnaire && !response.preQuestionnaireResponse) {
			view = 'pre-questionnaire';
		}
		// If all tests have been completed
		else if (response.completedTests.length === project.tests.length) {
			// If post questionnaire hasn't been done, show it
			if (project.postQuestionnaire && !response.postQuestionnaireResponse) view = 'post-questionnaire';
			else view = 'complete';
		}

		this.setState({ session, view });
	}

	// Get session data and update state
	getSessionData() {
		const session = sessionData;

		// GET SESSION HERE
		this.setState({ session });
		return session;
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
