import React from "react";
import AutoResizeField from "./AutoResizeField"; // Assuming AutoResizeField is a custom component.
import { Trash } from "lucide-react";

interface EducationType {
  school: string;
  dateRange: string;
  degree: string;
}

const Educations: React.FC<{
  setEducations: React.Dispatch<React.SetStateAction<EducationType[]>>;
  educations: EducationType[]; // Change `experiences` to `educations`
  themeColor: string;
}> = ({ setEducations, educations, themeColor }) => {
  // Add education function
  const addEducation = () => {
    setEducations([
      ...educations,
      { school: "", dateRange: "", degree: "" }, // Initialize with empty strings for a new education entry
    ]);
  };

  // Remove education by index
  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2
        className="text-xl sm:text-2xl font-bold mb-4"
        style={{ color: themeColor }}
      >
        EDUCATION
      </h2>
      <div>
        {educations.map((education, index) => (
          <div
            key={index}
            className={`relative group p-4 border border-transparent rounded-md hover:border-gray-300 transition-all`}
          >
            {/* Add Education Button */}
            <button
              type="button"
              className="absolute top-2 right-8 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
              onClick={addEducation}
              aria-label="Add Education"
            >
              +
            </button>

            {/* Remove Education Button */}
            <button
              type="button"
              className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
              onClick={() => removeEducation(index)}
              aria-label="Remove Education"
            >
              <Trash className="h-4 w-4" />
            </button>
            <div className="flex justify-between mb-2">
              <AutoResizeField
                defaultValue={education.school}
                className="font-semibold border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="School Name"
              />
              <AutoResizeField
                defaultValue={education.dateRange}
                className="text-sm text-gray-600 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Date Range"
              />
            </div>
            <AutoResizeField
              defaultValue={education.degree}
              className="text-gray-700 mb-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none w-full"
              placeholder="Degree"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Educations;
