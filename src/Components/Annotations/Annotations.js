import React from 'react';
import './Annotations.css';

const Annotations = ({
	session: {
		response: { annotations }
	},
	device
}) => {
	return (
		<div className='Annotations'>
			{annotations
				.filter(item => item.route === window.location.pathname && item.device === device)
				.map((item, index) => (
					<Annotation key={`ant_${index}_${item.message}`} data={item} />
				))}
		</div>
	);
};

export default Annotations;

const Annotation = ({
	data: {
		route,
		point: { mouseX, mouseY },
		message,
		timePosted,
		element: { tag }
	}
}) => {
	return (
		<div style={{ top: mouseY, left: mouseX }} className='Annotation'>
			<div className='annotation_dot'></div>
			<div className='annotation_details'>
				<h4>{tag} annotation</h4>
				<p className='lightText'>{message}</p>
				<span>{new Date(timePosted).toLocaleString()}</span>
			</div>
		</div>
	);
};
