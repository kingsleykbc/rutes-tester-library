import './App.css';
import Layout from './Components/Layout/Layout';
import Questionnaire from './Components/Questionnaire/Questionnaire';
import Tests from './Components/Tests/Tests';
import ViewAndSessionContextProvider, { ViewAndSessionContext } from './Contexts/ViewAndSessionContext';

function App() {
	return (
		<ViewAndSessionContextProvider>
			<ViewAndSessionContext.Consumer>
				{({ view, session }) =>
					session ? (
						<Layout view={view} session={session}>
							{view === 'tests' && <Tests />}
							{view === 'pre-questionnaire' && <Questionnaire type='Pre' />}
							{view === 'post-questionnaire' && <Questionnaire type='Post' />}
						</Layout>
					) : (
						<></>
					)
				}
			</ViewAndSessionContext.Consumer>
		</ViewAndSessionContextProvider>
	);
}

export default App;
