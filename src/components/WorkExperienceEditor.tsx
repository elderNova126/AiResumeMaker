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
  const generateHTMLFromDescription = (description: string[]) =>
    `<ul>${description.map((item) => `<li>${item}</li>`).join("")}</ul>`;

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
    console.log(newValue);
    setValue(newValue);

    // Convert HTML to description array and update the parent
    const updatedDescription = parseDescriptionFromHTML(newValue);
    updateExperience(index, "description", updatedDescription);
  };

  return (
    <span>
      <p
        contentEditable="true"
        translate-data="Enter your work experience description"
        placeholder="Enter your work experience description"
        data-gramm="false"
        onInput={(e) => handleChange(e.currentTarget.innerHTML || '')}
        // Use dangerouslySetInnerHTML to display HTML
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </span>
  );
};

export default WorkExperienceEditor;
