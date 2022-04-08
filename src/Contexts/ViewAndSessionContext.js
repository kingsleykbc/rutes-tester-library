import React, { Component, createContext, useContext } from 'react';

export const ViewAndSessionContext = createContext(null);

export const useViewAndSession = () => {
	return useContext(ViewAndSessionContext);
};

class ViewAndSessionContextProvider extends Component {
	state = { session: null, view: 'tests', setView: view => this.setState({ view }) };

	componentDidMount() {
		// GET SESSION HERE
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
