import Layout from './Components/Layout/Layout';
import Questionnaire from './Components/Questionnaire/Questionnaire';
import Tests from './Components/Tests/Tests';
import ViewAndSessionContextProvider, { ViewAndSessionContext } from './Contexts/ViewAndSessionContext';
import apolloClient from './lib/apollo';
import { ApolloProvider } from '@apollo/client';
import AuthBox from './Components/AuthBox/AuthBox';
import Completed from './Components/Completed/Completed';

function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<div className='Rutes'>
				<ViewAndSessionContextProvider>
					<ViewAndSessionContext.Consumer>
						{({ view, session, subView, updateSession, dataReady, error, login, logout }) =>
							session ? (
								<Layout view={view} subView={subView} session={session} updateSession={updateSession} logout={logout}>
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
					<div id='portal'></div>
				</ViewAndSessionContextProvider>
			</div>
		</ApolloProvider>
	);
}

export default App;
