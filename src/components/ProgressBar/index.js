import ProgressBar from 'react-bootstrap/ProgressBar';

function ProgressBarComp({now}) {  
  return (
  <ProgressBar 
  now={now} 
  label={`${now}%`}   
  visuallyHidden 
  />
  );
}

export default ProgressBarComp;