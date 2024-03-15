import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";

const Editor = () => {
  const [texteditor, setTextEditor] = useState(
    localStorage.getItem("savedCode") || ""
  );
  const [input, setInput] = useState("");
  const [customInput, setCustomInput] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "python"
  );
  const [iframeContent, setIframeContent] = useState("");

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setSelectedLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
    setShowText("");
    setIsSubmited(false);
    setIframeContent("");
  };

  const handleChange = (e) => {
    const code = e.target.value;
    setTextEditor(code);
    localStorage.setItem("savedCode", code);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const toggleCustomInput = () => {
    setCustomInput(!customInput);
  };

  const handleKeyDown = (evt) => {
    let value = texteditor,
      selStartPos = evt.currentTarget.selectionStart;

    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();
      setTextEditor(value);
    }
  };

  const submitHandler = () => {
    setIsLoaded(false);
    setIsSubmited(true);

    if (selectedLanguage === "html") {
      setIframeContent(texteditor);
    } else {
      const codeTextB64 = btoa(unescape(encodeURIComponent(texteditor)));
      const codeInputB64 = btoa(unescape(encodeURIComponent(input)));
      const inputFlag = customInput ? "PRESENT" : "ABSENT";

      let codeFileName;
      switch (selectedLanguage) {
        case "python":
          codeFileName = "a.py";
          break;
        case "java":
          codeFileName = "Main.java";
          break;
        case "c":
          codeFileName = "a.c";
          break;
        case "html":
          codeFileName = "index.html";
          break;
        default:
          codeFileName = "a.py";
      }

      const postBody = {
        code_file_name: codeFileName,
        code_language: selectedLanguage.toLowerCase(),
        code_input_b64: customInput ? codeInputB64 : null,
        code_text_b64: codeTextB64,
        input_flag: inputFlag,
      };

      axios
        .post("http://20.244.86.231:8000/api/v1/web_ide/", postBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setShowText(res.data);
          setIsLoaded(true);
        });
    }
  };

  return (
    <div className="">
      <div className=" flex m-4 ">
        <div className="mr-6">
        <CodeEditor
          texteditor={texteditor}
          handleChange={handleChange}
          handleLanguageChange={handleLanguageChange}
          handleKeyDown={handleKeyDown} // Add your specific handleKeyDown logic here
          handleInput={handleInput}
          setcustomInput={toggleCustomInput}
          input={input}
          customInput={customInput}
          submitHandler={submitHandler}
          selectedLanguage={selectedLanguage}
        />
        </div>
       <div>
       <Terminal
          selectedLanguage={selectedLanguage}
          iframeContent={iframeContent}
          isSubmited={isSubmited}
          isLoaded={isLoaded}
          showText={showText}
        />
       </div>
      </div>
    </div>
  );
};

export default Editor;
