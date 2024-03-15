import React from "react";

const Terminal = ({
  selectedLanguage,
  iframeContent,
  isSubmited,
  isLoaded,
  showText,
}) => {
  return (
    <div className="h-[50dvh] w-[33dvw]">
      <div className=" bg-gray-200 p-4 border rounded">
        <h1 className="font-bold">Console</h1>
        {selectedLanguage === "html" ? (
  <iframe
  title="HTML Output"
  className="w-[29vw] h-[64vh]"
  style={{ border: "1px solid #718096" }}
  srcDoc={iframeContent}
/>

   
        ) : isSubmited ? (
          <div>
            {isLoaded ? (
              <textarea
                className="output_textarea w-full h-48 p-2 bg-white border rounded"
                readOnly
              >
                {showText}
              </textarea>
            ) : (
              <div className="flex items-center">
                <h6 className="mr-2">प्रोसेसिंग....................</h6>
                <div className="loader"></div>
              </div>
            )}
          </div>
        ) : (
          <h5 className="text-black">परिणाम देखने के लिए चल करें</h5>
        )}
      </div>
    </div>
  );
};

export default Terminal;
