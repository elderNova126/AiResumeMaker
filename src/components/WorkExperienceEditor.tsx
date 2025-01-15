import React, { useState, useEffect } from "react";
import Contenteditable from "./Contenteditable";

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
  // Convert description array to plain text with bullet points, if there's content
  const generateTextFromDescription = (description: string[]) =>
    description.length > 0
      ? description.map((item) => `• ${item}`).join("\n")
      : ""; // Empty string when no description

  // Parse plain text back into an array
  const parseDescriptionFromText = (text: string) => {
    return text
      .split("•") // Split by the bullet point
      .filter((line) => line.trim() !== "") // Remove empty lines
      .map((line) => line.trim()); // Trim each line
  };

  // State for the editable content
  const [value, setValue] = useState<string>(
    generateTextFromDescription(initialDescription)
  );

  // Synchronize value with initialDescription if it changes
  useEffect(() => {
    setValue(generateTextFromDescription(initialDescription));
    console.log("bbbbbbbb", initialDescription, generateTextFromDescription(initialDescription));
  }, [initialDescription]);
  console.log("aaaa", initialDescription);
  const handleChange = (newValue: string) => {
    setValue(newValue);

    // Convert plain text back to description array
    const updatedDescription = parseDescriptionFromText(newValue);
    updateExperience(index, "description", updatedDescription);
  };

  return (
    <Contenteditable
      value={value} // Pass plain text with \n for newlines
      onChange={(updatedContent) => {
        handleChange(updatedContent); // Handle updates
      }}
      as="p"
      placeholder="Enter your work experience description"
      style={{
        whiteSpace: "pre-line", // Render \n as newlines in plain text
        wordWrap: "break-word", // Ensure long words wrap correctly
      }}
    />
  );
};

export default WorkExperienceEditor;
