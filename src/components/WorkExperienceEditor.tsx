import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ExperienceType {
  company: string;
  dateRange: string;
  position: string;
  description: string[];
}

interface WorkExperienceEditorProps {
  initialDescription: string[];
  updateExperience: (index: number, key: keyof ExperienceType, updatedDescription: string[]) => void; // Callback to handle changes
  index: number;
}

const WorkExperienceEditor: React.FC<WorkExperienceEditorProps> = ({
  initialDescription,
  updateExperience,
  index,
}) => {
  // Initial value is a string with <ul> and <li> elements
  const initialValue = initialDescription.length
    ? initialDescription.map(item => `<li>${item}</li>`).join("")
    : "<ul><li></li></ul>"; // Default to a list with one bullet point if empty

  const [value, setValue] = useState<string>(`<ul>${initialValue}</ul>`);

  useEffect(() => {
    const container = document.querySelector(".ql-container");
    if (container) {
      container.classList.remove("ql-container");
    }
    const allDivs = document.querySelectorAll(".jodit_editor_wrapper__vNSpv");

    allDivs.forEach((div) => {
      const targetDiv = div.querySelector(".text-5xl");
      if (targetDiv) {
        targetDiv.classList.remove("text-5xl");
        targetDiv.classList.remove("sm:text-5xl");
      }
    });
  }, []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  
    // Convert HTML content to an array of descriptions by extracting <li> items
    const newDescription = newValue
      .replace(/<\/?ul>/g, "") // Remove <ul> tags
      .split("<li>") // Split by <li> tags
      .filter(item => item.trim() !== "") // Remove empty items
      .map(item => item.replace(/<\/li>/g, "").trim()); // Remove </li> tags and trim
  
    // Update experience using the passed callback
    updateExperience(index, "description", newDescription); // Update the description of the experience at `index`
  };
  
  return (
    <div className="jodit_editor_wrapper__vNSpv">
      <div
        className="text-resume-800 text-xs mb-1"
        style={{ padding: "8px 16px 0px" }}
      ></div>
      <ReactQuill
        className="textEdit rounded-md text-5xl sm:text-5xl w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
        modules={{ toolbar: false }}
        style={{ border: "none", paddingLeft: "0px" }}
        theme="snow"
        value={value}
        onChange={handleChange} // Call handleChange when content changes
      />
    </div>
  );
};

export default WorkExperienceEditor;
