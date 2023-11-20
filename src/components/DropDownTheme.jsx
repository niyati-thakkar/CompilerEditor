import React from 'react'
import '../../node_modules/react-bootstrap/dist/react-bootstrap';
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
export default function DropDownLanguage(prop) {
    const theme = prop.theme;
    const themes = prop.themes;
    const handleThemeChange = prop.handleThemeChange;
    return (  
    <Dropdown>
      <Dropdown.Toggle as={Dropdown.Button} id="dropdown-basic" variant="primary">
        {theme[1]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
                {themes.map((item, index) => (
          <Dropdown.Item eventKey={item[0]} value={item[0]} onClick={() => handleThemeChange(item)} key={index}>
                      {item[1]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
