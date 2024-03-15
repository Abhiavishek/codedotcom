import React, { useState, useRef } from "react";

const CodeEditor = ({
  texteditor,
  handleChange,
  input,
  handleInput,
  customInput,
  setcustomInput,
  handleLanguageChange,
  handleKeyDown,
  submitHandler,
  selectedLanguage,
}) => {
  const [lines, setLines] = useState(1);
  const [currentLine, setCurrentLine] = useState(1);

  const handleLineChange = (event) => {
    const lines = event.target.value.split("\n").length;
    setLines(lines);
    handleChange(event);
  };

  const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);

  const firstDivRef = useRef();
  const secondDivRef = useRef();
  const inputRef = useRef(null);

  const handleScrollFirst = (scroll) => {
    secondDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  const handleScrollSecond = (scroll) => {
    firstDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  const handleKeyDownLocal = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const { current } = inputRef;
      const { selectionStart, selectionEnd } = current;
      const value = current.value;
      current.value =
        value.substring(0, selectionStart) +
        "    " +
        value.substring(selectionEnd);
      current.selectionStart = current.selectionEnd = selectionStart + 4;
    }
  };

  const handleTextAreaChange = () => {
    const textArea = document.querySelector("#code");
    if (textArea) {
      const lineNumber = textArea.value
        .substr(0, textArea.selectionStart)
        .split("\n").length;
      if (lineNumber !== currentLine) setCurrentLine(lineNumber);
    }
  };

  return (
    <div className="h-[50dvh] w-[60dvw]">
      <div className="EditorArea bg-gray-200 p-4 border rounded">
        <label
          htmlFor="languageSelect"
          className="text-lg font-semibold block mb-2"
        >
          Choose a language:
        </label>
        <select
          id="languageSelect"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="w-full p-2 border rounded"
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="html">HTML</option>
        </select>

        <div className=" bg-gray-200 text-black">
          <div className=" mx-2 flex h-[40dvh] w-[65dvw] ">
            <div
              className=" mt-1 overflow-y-auto text-gray-500 border-r border-gray-600"
              onScroll={handleScrollFirst}
              ref={firstDivRef}
            >
              {lineNumbers.map((num) => (
                <div key={num} className={num === currentLine ? "font-bold" : ""}>
                  {num}
                </div>
              ))}
            </div>

            <textarea
              id="code"
              onScroll={handleScrollSecond}
              ref={(el) => {
                secondDivRef.current = el;
                inputRef.current = el;
              }}
              onKeyDown={(e) => {
                handleKeyDownLocal(e);
                handleKeyDown(e);
              }}
              rows={lines}
              value={texteditor}
              onChange={(e) => {
                handleLineChange(e);
                handleTextAreaChange();
              }}
              className="editor_class mt-1 multi-input p-1 col-10 bg-slate-100 focus:outline-none"
            />
          </div>

          <div className="d-flex justify-content-start mt-1">
            <div>यूजर इनपुट</div>
            <div
              onClick={setcustomInput}
              className="ml-2 cursor-pointer text-green-500"
            >
              {customInput ? "FileCheck Icon" : "[]"}
            </div>
          </div>
          {customInput && (
            <textarea
              className="custom_input mt-1 multi-input p-1 bg-slate-100 focus:outline-none"
              value={input}
              onChange={handleInput}
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="buttonStyle bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            onClick={submitHandler}
          >
            चल
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
