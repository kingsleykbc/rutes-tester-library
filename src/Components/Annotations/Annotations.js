import React from 'react';
import './Annotations.css';

const Annotations = ({
	session: {
		response: { annotations }
	},
	updateData,
	device
}) => {
	return (
		<div className='Annotations'>
			{annotations
				.filter(item => item.route === window.location.pathname && item.device === device)
				.map((item, index) => (
					<Annotation key={`ant_${item.id}`} data={item} onDelete={() => updateData('ANNOTATION_DELETE', item.id)} />
				))}
		</div>
	);
};

export default Annotations;

const Annotation = ({
	data: {
		point: { mouseX, mouseY },
		message,
		createdAt,
		element: { tag }
	},
	onDelete
}) => {
	return (
		<div style={{ top: mouseY, left: mouseX }} className='Annotation'>
			<div className='annotation_dot'></div>
			<div className='annotation_details'>
				<div className='topSection'>
					<h4>{tag} annotation</h4>
					<div className='cancel' onClick={onDelete}>
						&times;
					</div>
				</div>
				<p className='lightText'>{message}</p>
				<span>{new Date(createdAt).toLocaleString()}</span>
			</div>
		</div>
	);
};
