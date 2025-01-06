import React from "react";
import AutoResizeField from "./AutoResizeField"; // Assuming AutoResizeField is a custom component.
import { Trash } from "lucide-react";

interface ExperienceType {
  company: string;
  dateRange: string;
  position: string;
  description: string;
}

const Experiences: React.FC<{
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  experiences: ExperienceType[];
  themeColor: string;
}> = ({ setExperiences, experiences, themeColor }) => {

  
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", dateRange: "", position: "", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-8">
      <h2
        className="text-xl sm:text-2xl font-bold mb-4"
        style={{ color: themeColor }}
      >
        EXPERIENCE
      </h2>
      <div className="p-6">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`relative group p-4 border border-transparent rounded-md hover:border-gray-300 transition-all`}
          >
            <button
              type="button"
              className="absolute top-2 right-8 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
              onClick={addExperience}
              aria-label="Add Experience"
            >
              +
            </button>
            <button
              type="button"
              className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
              onClick={() => removeExperience(index)}
              aria-label="Remove Experience"
            >
              <Trash className="h-4 w-4" />
            </button>

            {/* Experience Content */}
            <div className="flex justify-between mb-2">
              <AutoResizeField
                defaultValue={experience.company}
                className="font-semibold border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Company Name"
              />
              <AutoResizeField
                defaultValue={experience.dateRange}
                className="text-sm text-gray-600 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Date Range"
              />
            </div>
            <AutoResizeField
              defaultValue={experience.position}
              className="text-gray-700 mb-2 border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none w-full"
              placeholder="Position"
            />
            <AutoResizeField
              type="textarea"
              defaultValue={experience.description}
              className="w-full p-2 text-sm text-gray-600 border rounded-md focus:border-emerald-500 focus:outline-none"
              placeholder="Job Description"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
