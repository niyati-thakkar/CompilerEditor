import React from "react";
import { useEffect, useState, useRef } from "react";
import DropDownLanguage from "./DropDownLanguage";
import DropDownTheme from "./DropDownTheme";
import EditorWindow from "./EditorWindow";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { defineTheme } from "./defineTheme";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { decode as base64_decode, encode as base64_encode } from "base-64";
import axios from "axios";
import OutputWindow from "./OutputWindow.jsx";
import { FormGroup } from 'react-bootstrap';

function ContainerPage() {
    // ******************************************Theme***************************
    const [themes, setThemes] = React.useState([]);
    const [theme, setTheme] = React.useState([]);

    const handleThemeChange = (theme) => {
        defineTheme(theme).then((_) => setTheme(theme));
        setTheme(theme);
    };

    useEffect(() => {
        const thms = [];
        Object.keys(monacoThemes).forEach((key) =>
            thms.push([key, monacoThemes[key]]),
        );
        setThemes(thms);
        defineTheme(thms[0]).then((_) => setTheme(thms[0]));
        // console.log(base64_decode("VHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOgogIEZpbGUgInNj\ncmlwdC5weSIsIGxpbmUgMSwgaW4gPG1vZHVsZT4KICAgIHN0ciA9IElucHV0\nKCJlbnRlciBzb21ldGhpbmciKTsKTmFtZUVycm9yOiBuYW1lICdJbnB1dCcg\naXMgbm90IGRlZmluZWQK"))
    }, []);

    // ***********************Language*************************************
    const [language, setLanguage] = React.useState({});
    const [languages, setLanguages] = React.useState([]);

    const handleLanguageChange = (id) => {
        const selectedLanguage = languages.find((lang) => lang.id === id);
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
        }
    };

    useEffect(() => {
        (async function () {
            const resp = await fetch(`https://ce.judge0.com/languages/all`);
            const lngs = await resp.json();
            setLanguages(lngs);
            setLanguage(lngs[0]);
        })();
    }, []);

    // *********************************code and onchange ******************************
    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                // setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    // ***********************************monaco editor***************************************
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [stdInput, setInput] = useState("");
    const [token, setToken] = useState("");
    const [outputDetails, setOutputDetails] = useState({});
    // ******************************compile and execute************************************
    const handleCompile = async () => {
        setCode(base64_encode(editorRef.current.getValue()));
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            },
            data: {
                language_id: language.id,
                source_code: code,
                stdin: stdInput,
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data.token);
            setToken(response.data.token);
            // checkStatus();
            handleOutput();
        } catch (error) {
            console.error(error);
        }
    };

    // ************************************* statuses **********************************************
    const [statuses, setStatuses] = useState({});
    const checkStatus = async () => {
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/statuses",
            headers: {
                "X-RapidAPI-Key":
                    "f61814bd39msh631c7dd2474d560p1435f0jsn48cfbfeb9295",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setStatuses(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleOutput = async () => {
        console.log("https://judge0-ce.p.rapidapi.com/submissions/" + token);
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "X-RapidAPI-Key":
                    "f61814bd39msh631c7dd2474d560p1435f0jsn48cfbfeb9295",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setOutput(base64_decode(response.data.stdout===null?response.data.stderr:response.data.stdout));
            setOutputDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // **********************************input******************************
    const handleInput = (event) => {
        setInput(base64_encode(event.target.value));
}



    // **********************************return******************************
    return (
        <div>
            <Container>
                <Row>
                    <Col md="auto">
                        <DropDownLanguage
                            languages={languages}
                            language={language}
                            handleLanguageChange={handleLanguageChange}
              />
            </Col>
            <Col md="auto">
                        <DropDownTheme
                            themes={themes}
                            theme={theme}
                            handleThemeChange={handleThemeChange}
                        />
                    </Col>
                </Row>
                <Row className="editor-border">
                    <Col md={{ span: 12, offset: 0 }} className="editor-border">
                    <EditorWindow
                        handleEditorDidMount={handleEditorDidMount}
                        code={code}
                        onChange={onChange}
                        language={language}
                        theme={theme}
                        />
                        </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Button onClick={handleCompile}>Compile and Execute</Button>
                        </Col>
                </Row>
                <Row >
                    <h3>Standard Input:</h3>
                    <Col md={{ span: 6, offset: 0 }}>
                        <FormGroup as="textarea" rows={5} className='output-container' name="stdinput" onChange={handleInput}/>
                    </Col>
                    <Col md={{ span: 6, offset: 0 }}>
                        <FormGroup as="textarea" rows={5} className='output-container'
                            placeholder={`Status: ${outputDetails?.status?.description}\nMemory: ${outputDetails?.memory}\nTime: ${outputDetails?.time}`}
                            disabled
        readOnly/>
                    </Col>

                </Row>
                <Row>
                    <h3>Output:</h3>
                    <Col  md={{ span: 12, offset: 0 }}>
                        <OutputWindow output={output} />
                        </Col>
                </Row>
            </Container>

            
        </div>
    );
}

export default ContainerPage;
