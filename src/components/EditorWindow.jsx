import React from 'react'
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

export default function EditorWindow({ onChange, language, code, theme, handleEditorDidMount }){
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  
  

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={"hello world"}
        theme={theme[0]}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};
