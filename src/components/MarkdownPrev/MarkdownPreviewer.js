import React, { useState } from "react";
import "./Markdownpreviewer.css";
import marked from "marked";
import placeholder from "./placeholder";

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
export default function MarkdownPreviewer() {
  const [text, setText] = useState(placeholder);
  const textChange = (e) => {
    let value = e.target.value;
    setText(value);
  };
  return (
    <div className="App">
      <div id="wrapper">
        <div className="epwrapper">
          <h2 className="centerText">Editor</h2>
          <textarea
            id="editor"
            placeholder="editor"
            onChange={textChange}
            value={text}
          ></textarea>
        </div>

        <div className="epwrapper">
          <h2 className="centerText">Preview</h2>
          <div
            id="preview"
            placeholder="preview"
            dangerouslySetInnerHTML={{
              __html: marked(text),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
