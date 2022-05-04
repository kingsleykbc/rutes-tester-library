import React from 'react';
import './WarningBar.css';
import { TiWarningOutline as IcWarning } from 'react-icons/ti';

/**
 * THE WARNING FLASH MESSAGE THAT APPEARS WHEN THE MACHINE OR WINDOW'S WIDTH IS UNSUPPORTED
 */
const WarningBar = () => (
	<div className='WarningBar'>
		<div className='icon'>
			<IcWarning />
		</div>
		<span>
			This screen dimension is unsupported and may lead to inaccurate annotation positioning. Kindly resize your browser window or use
			another device
		</span>
	</div>
);

export default WarningBar;
