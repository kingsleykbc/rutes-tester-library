import React from 'react';
import { useViewAndSession } from '../Contexts/ViewAndSessionContext';

const Tests = () => {
  const { setView } = useViewAndSession();
	return <div onClick={()=> setView("pre-questionnaire")}>TESTS</div>;
};

export default Tests;
