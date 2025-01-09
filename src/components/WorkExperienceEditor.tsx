import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WorkExperienceEditor = () => {
  const [value, setValue] = useState("<ul><li></li></ul>");
  useEffect(() => {
      const container = document.querySelector(".ql-container");
      if (container) {
        container.classList.remove("ql-container");
      }
      const allDivs = document.querySelectorAll(".jodit_editor_wrapper__vNSpv");

      allDivs.forEach((div) => {
        const targetDiv = div.querySelector(".text-5xl");
        if (targetDiv) {
          // Remove the classes from the target div
          targetDiv.classList.remove("text-5xl");
          targetDiv.classList.remove("sm:text-5xl");
        }
      });  
  },[]);

  return (
    <div className="jodit_editor_wrapper__vNSpv">
      <div
        className="text-resume-800 text-xs mb-1"
        style={{ padding: "8px 16px 0px" }}
      >
      </div>      
      <ReactQuill
      className="textEdit rounded-md text-5xl sm:text-5xl w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
        modules={{toolbar: false,}}
        style={{border: "none", paddingLeft:"0px",}}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      
    </div>
  );
};

export default WorkExperienceEditor;