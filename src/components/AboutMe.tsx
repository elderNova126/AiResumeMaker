import React from "react";
import AutoResizeField from "./AutoResizeField";


interface AboutMeProps {
  setAbout: React.Dispatch<React.SetStateAction<string>>; // Expecting a string to be passed in
  about: string;
  themeColor: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ setAbout, about, themeColor }) => {
  return (
    <div className="my-3 py-2">
      <h2 className="text-lg sm:text-xl font-bold py-3" style={{ color: themeColor }}>
        ABOUT ME
      </h2>
      <AutoResizeField
        type="textarea"
        onChange={(value: string) => setAbout(value)} // Ensure onChange works with string type
        value={about}
        className="textEdit w-full text-sm text-gray-600 bg-gray-100 p-3 rounded-md border border-gray-300 focus:border-emerald-500 focus:outline-none transition-all"
        placeholder="Professional Summary"
      />
    </div>
  );
};

export default AboutMe;
