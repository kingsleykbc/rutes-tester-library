import Layout from './Components/Layout/Layout';
import Questionnaire from './Components/Questionnaire/Questionnaire';
import Tests from './Components/Tests/Tests';
import ViewAndSessionContextProvider, { ViewAndSessionContext } from './Contexts/ViewAndSessionContext';

function App() {
	return (
		<div className='Rutes'>
			<ViewAndSessionContextProvider>
				<ViewAndSessionContext.Consumer>
					{({ view, session, subView, updateSession }) =>
						session ? (
							<Layout view={view} subView={subView} session={session} updateSession={updateSession}>
								{view === 'tests' && <Tests />}
								{view === 'pre-questionnaire' && <Questionnaire type='Pre' />}
								{view === 'post-questionnaire' && <Questionnaire type='Post' />}
							</Layout>
						) : (
							<></>
						)
					}
				</ViewAndSessionContext.Consumer>
				<div id='portal'></div>
			</ViewAndSessionContextProvider>
		</div>
	);
}

export default App;
