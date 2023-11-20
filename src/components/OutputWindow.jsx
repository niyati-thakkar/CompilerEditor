import React from 'react';
import { FormGroup } from 'react-bootstrap';

const OutputWindow = (prop) => {
  return (
    <FormGroup as="textarea" rows={5} className='output-container' placeholder={prop.output}/>
  );
};

export default OutputWindow;
