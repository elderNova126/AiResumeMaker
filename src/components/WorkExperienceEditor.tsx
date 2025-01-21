import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { ExperienceType } from '../types/resume';

interface WorkExperienceEditorProps {
  initialDescription: string[];
  updateExperience: (
    index: number,
    key: keyof ExperienceType,
    updatedDescription: string[]
  ) => void; // Callback to handle changes
  index: number;
}

const WorkExperienceEditor: React.FC<WorkExperienceEditorProps> = ({
  initialDescription,
  updateExperience,
  index,
}) => {
  // Generate HTML list from the description array
  const generateHTMLFromDescription = (description: string[]) => {
    return (`<ul>${description.map((item) => `<li>${item}</li>`).join("")}</ul>`);
  }

  // Parse HTML list back into an array
  const parseDescriptionFromHTML = (html: string) =>
    html
      .replace(/<\/?ul>/g, "") // Remove <ul> tags
      .split("<li>") // Split by <li> tags
      .filter((item) => item.trim() !== "") // Remove empty items
      .map((item) => item.replace(/<\/li>/g, "").trim()); // Remove </li> tags and trim

  // Initial value as HTML
  const [value, setValue] = useState<string>(
    generateHTMLFromDescription(initialDescription)
  );

  // Sync value with initialDescription changes
  useEffect(() => {
    setValue(generateHTMLFromDescription(initialDescription));
  }, [initialDescription]);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    // Convert HTML to description array and update the parent
    const updatedDescription = parseDescriptionFromHTML(newValue);
    updateExperience(index, "description", updatedDescription);
  };

  return (
    <div className="work-experience-editor">
      <ReactQuill
        className="textEdit rounded-md w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
        modules={{ toolbar: false }}
        style={{ border: "none", paddingLeft: "0px" }}
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder="Enter Your Work Experience Description"
      />
    </div>
  );
};

export default WorkExperienceEditor;