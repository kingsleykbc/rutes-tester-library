import Layout from './Components/Layout/Layout';
import Questionnaire from './Components/Questionnaire/Questionnaire';
import Tests from './Components/Tests/Tests';
import ViewAndSessionContextProvider, { ViewAndSessionContext } from './Contexts/ViewAndSessionContext';
import AuthBox from './Components/AuthBox/AuthBox';
import Completed from './Components/Completed/Completed';

// Setup up Apollo client (frontend graphQL client )
import apolloClient from './lib/apollo';
import { ApolloProvider } from '@apollo/client';

/**
 * MAIN APP
 */
function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<div className='Rutes'>
				<ViewAndSessionContextProvider>
					<ViewAndSessionContext.Consumer>
						{/* GLOBAL STATES (REACT CONTEXT VALUES) */}
						{({ view, session, subView, updateData, dataReady, error, login, logout }) =>
							session ? (
								<Layout view={view} subView={subView} session={session} updateData={updateData} logout={logout}>
									{view === 'tests' && <Tests />}
									{view === 'pre-questionnaire' && <Questionnaire type='Pre' />}
									{view === 'post-questionnaire' && <Questionnaire type='Post' />}
									{view === 'complete' && <Completed />}
								</Layout>
							) : (
								<AuthBox dataReady={dataReady} error={error} login={login} />
							)
						}
					</ViewAndSessionContext.Consumer>
				</ViewAndSessionContextProvider>
				<div id='portal'></div>
			</div>
		</ApolloProvider>
	);
}

export default App;
