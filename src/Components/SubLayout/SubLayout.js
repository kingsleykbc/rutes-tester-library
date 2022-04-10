import { useViewAndSession } from '../../Contexts/ViewAndSessionContext';
import './SubLayout.css';

const SubLayout = ({ title, children }) => {
	const { setSubView } = useViewAndSession();
	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className={`SubLayout`}>
			<div className='topSection'>
				<h3>{title}</h3>
				<div onClick={() => setSubView(null)} className='iconButton'>
					<span>&times;</span>
				</div>
			</div>
			<div className='content'>{children}</div>
		</div>
	);
};

export default SubLayout;
