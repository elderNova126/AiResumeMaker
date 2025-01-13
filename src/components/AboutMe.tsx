import React, {useState} from "react";
import AutoResizeField from "./AutoResizeField";
import Ai_Modal from "./../components/Ai_Modal";

interface AboutMeProps {
  setAbout: React.Dispatch<React.SetStateAction<string>>; // Expecting a string to be passed in
  about: string;
  themeColor: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ setAbout, about, themeColor }) => {
  const [showAiDialog, setShowAiDialog] = useState(false);
  return (
    <div className="py-2 relative">      
      <h2 className="text-lg sm:text-xl font-bold py-3" style={{ color: themeColor }}>
        ProFile
      </h2>
      
      <div className="relative group border-transparent rounded-md hover:border-gray-300 transition-all">
      <button
        type="button"
        className="zorder-top absolute -top-3 right-2 hidden text-default-sm group-hover:flex items-center justify-center h-6 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all"
        onClick={() => setShowAiDialog(true)}
        aria-label="Add AI"
        style={{ width: "145px"}}>✧ Writing Assistant</button>
        <AutoResizeField
        type="textarea"
        onChange={(value: string) => setAbout(value)} // Ensure onChange works with string type
        value={about}
        className="textEdit w-full  bg-gray-100 p-3 rounded-md border border-gray-300 focus:border-emerald-500 focus:outline-none transition-all"
        placeholder="Professional Summary"
      />
      </div>
      {showAiDialog && (
          <Ai_Modal
            onClose={() => setShowAiDialog(false)}
            // onImport={handleImport}
            headerText={'About Me'}
          />
        )}
    </div>
  );
};

export default AboutMe;
