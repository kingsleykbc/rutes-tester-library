import React from 'react';
import Portal from '../Portal';
import './Lightbox.css';

const LightBox = ({ show, toggle, children }) => {
	return (
		<Portal selector='#portal'>
			<div className={`Lightbox ${show ? 'show' : 'hide'}`}>
				<div className='box'>
					<div className='iconButton lightbox-close' onClick={toggle}>
						<span>&times;</span>
					</div>
					{children}
				</div>
				<div className='backdrop' onClick={toggle}></div>
			</div>
		</Portal>
	);
};

export default LightBox;
