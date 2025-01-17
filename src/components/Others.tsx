import React from "react";
import Contenteditable from "./Contenteditable";

const Other: React.FC<{
  setOther: React.Dispatch<React.SetStateAction<string>>;
  other: string;
}> = ({ setOther, other }) => {


  const updateOther = (
    value: string
  ) => {
    setOther(value);
  };
  return (
    <div
    id="other"
  >
    <h2
      contentEditable="true"
      translate-data="Other"
      placeholder="Other"
      data-gramm="false"
    ></h2>
    <div
      className="sortable-wrapper"
    >
      <Contenteditable
        value={other}
        onChange={(updatedContent) => {
          updateOther(updatedContent);
        }}
        as="p"
        placeholder="Enther Other"
      />
    </div>
  </div>
  );
};

export default Other;
