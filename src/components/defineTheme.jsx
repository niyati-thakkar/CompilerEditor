import { loader } from "@monaco-editor/react";
import monacoThemes from "../../node_modules/monaco-themes/themes/themelist.json"
const defineTheme = (theme) => {
  // console.log(theme);
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`../../node_modules/monaco-themes/themes/${theme[1]}.json`),
    ]).then(([monaco, themeData]) => {
      // console.log(monaco);
      monaco.editor.defineTheme(theme[0], themeData);
      res();
    });
  });
};

export { defineTheme };