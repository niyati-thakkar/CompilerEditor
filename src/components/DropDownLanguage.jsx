import React from 'react'
import '../../node_modules/react-bootstrap/dist/react-bootstrap';
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
export default function DropDownLanguage(prop) {
  const language = prop.language;
    const languages = prop.languages;
    const handleLanguageChange = prop.handleLanguageChange;    

  return (
    <Dropdown>
      <Dropdown.Toggle as={Dropdown.Button} id="dropdown-basic" variant="primary">
        {language.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((data,index) => (
          <Dropdown.Item eventKey={data.id} value={data.name} onClick={() => handleLanguageChange(data.id)} key={index}>
            {data.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}