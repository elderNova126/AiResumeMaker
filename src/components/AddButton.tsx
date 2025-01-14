import React from 'react';

interface AddButtonProps {
  addFunc: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ addFunc }) => {
  return (
    <span
      className="add-button"
      translate-data="Add"
      data-tooltip="Add"
      onClick={addFunc}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </span>
  );
};

export default AddButton;
