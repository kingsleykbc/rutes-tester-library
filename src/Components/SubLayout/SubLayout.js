import './SubLayout.css';

const SubLayout = ({ title, children, show, toggle }) => {
	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className={`SubLayout ${show ? '' : 'hide'}`}>
			<div className='topSection'>
				<h3>{title}</h3>
				<div onClick={toggle} className='iconButton'>
					<span>&times;</span>
				</div>
			</div>
			<div className='content'>{children}</div>
		</div>
	);
};

export default SubLayout;
