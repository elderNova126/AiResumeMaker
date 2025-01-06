import React from "react";
import { Trash } from "lucide-react";

interface LanguageType {
  name: string;
  level: string;
}

const LanguagesSection: React.FC<{  
  setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>;
  languages: LanguageType[]; 
    themeColor: string;
}> = ({ setLanguages, languages, themeColor }) => {
  // Add language function

  const proficiencyLevels = [
    'Beginner',
    'Elementary',
    'Intermediate',
    'Upper Intermediate',
    'Advanced',
    'Native'
  ];
  const lngkind = [
    'Chinese (Mandarin)', 'Chinese (Cantonese)','Danish', 'Dutch', 'English','French', 
    'German', 'Hindi','Italian', 'Japanese', 'Korean','Portuguese', 'Russian', 'Spanish'
  ];
  const addLanguages = () => {
    setLanguages([
      ...languages,
      { name: "", level: ""}, // Initialize with empty strings for a new language entry
    ]);
  };

  // Remove language by index
  const removeLanguages = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2
        className="text-xl sm:text-xl font-bold"
        style={{ color: themeColor }}
      >
        LANGUAGE
      </h2>
      <div>
        {languages.map((language, index) => (
          <div
            key={index}
            className={`relative group border border-transparent rounded-md hover:border-gray-300 transition-all`}
          >
            <div className="control-button">  
            {languages.length>1 && (
            <button
              type="button"
              className="absolute top-2 right-10 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
              onClick={() => removeLanguages(index)}
              aria-label="Remove Skill"
            >
              <Trash className="h-4 w-4" />
            </button>
            )}
            <button
              type="button"
              className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all"
              onClick={addLanguages}
              aria-label="Add Skill"
            >
              +
            </button>
            </div>
            <div className="flex justify-between">
              <select
              value={language.name}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Language</option>
              {lngkind.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
              <select
              value={language.level}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select level</option>
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesSection;
