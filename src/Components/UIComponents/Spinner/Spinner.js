import './Spinner.css';

const Spinner = ({ margin = '0', scale = 1 }) => {
	return (
		<div className='Rutes-SpinnerContainer' style={{ margin, transform: `scale(${scale})` }}>
			<div className='Rutes-Spinner'></div>
		</div>
	);
};

export default Spinner;
