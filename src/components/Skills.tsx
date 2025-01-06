import React from "react";
import AutoResizeField from "./AutoResizeField"; // Assuming AutoResizeField is a custom component.
import { Trash } from "lucide-react";

const Skills: React.FC<{  
  themeColor: string;
}> = ({ setSkills, skills, themeColor }) => {
  // Add education function
  const addSkills = () => {
    setSkills([
      ...skills,
      { skillname: "", skilllevel: ""}, // Initialize with empty strings for a new skill entry
    ]);
  };

  // Remove education by index
  const removeSkills = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div style={{marginTop: "8px"}}>
      <h2
        className="text-xl sm:text-xl font-bold mb-2"
        style={{ color: themeColor }}
      >
        SKILLS
      </h2>
      <div>
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all`}
          >
            <div className="control-button">
            
            {skills.length>1 && (
            <button
              type="button"
              className="absolute top-2 right-10 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
              onClick={() => removeSkills(index)}
              aria-label="Remove Skill"
            >
              <Trash className="h-4 w-4" />
            </button>
            )}
            <button
              type="button"
              className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
              onClick={addSkills}
              aria-label="Add Skill"
            >
              +
            </button>
            </div>
            <div className="flex justify-between">
              <AutoResizeField
                value={skills.skillname}
                className="textEdit font-semibold border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Name"
              />
              <AutoResizeField
                value={skills.skilllevel}
                className="textEdit text-sm text-gray-600 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Level"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
