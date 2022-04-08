import './App.css';
import Layout from './Components/Layout';
import Questionnaire from './Components/Questionnaire';
import Tests from './Components/Tests';
import ViewAndSessionContextProvider, { ViewAndSessionContext } from './Contexts/ViewAndSessionContext';

function App() {
	return (
		<ViewAndSessionContextProvider>
			<ViewAndSessionContext.Consumer>
				{({ view, session }) => (
					<Layout view={view} session={session}>
						{view === 'tests' && <Tests />}
						{view === 'pre-questionnaire' && <Questionnaire type='Pre' />}
						{view === 'post-questionnaire' && <Questionnaire type='Post' />}
					</Layout>
				)}
			</ViewAndSessionContext.Consumer>
		</ViewAndSessionContextProvider>
	);
}

export default App;
