import React, { useState } from "react";
import Contenteditable from "./Contenteditable";
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
    <div id="summary" className="with-border">
      <h2
        contentEditable="true"
        translate-data="About Me"
        placeholder="About Me"
        style={{ color: themeColor }}
      ></h2>
      <span>
        <Contenteditable
          value={about}
          onChange={(updatedContent) => {
            setAbout(updatedContent);
          }}
          as="p"
          placeholder="Enter your professional summary"
        />
      </span>
      <div className="btn-edit">
        <span className="writing-assistant" onClick="openModal('Summary')">
          <span translate-data="✧ Writing Assistant">✧ Writing Assistant</span>
        </span>
      </div>
    </div>
    // {showAiDialog && (
    //     <Ai_Modal
    //       onClose={() => setShowAiDialog(false)}
    //       // onImport={handleImport}
    //       headerText={'About Me'}
    //     />
    //   )}
  );
};

export default AboutMe;
