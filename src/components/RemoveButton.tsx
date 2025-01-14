import React from 'react';

interface RemoveButtonProps {
  index: number;
  removeFunc: (index: number) => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ index, removeFunc }) => {
  return (
    <span
      className="remove-button"
      translate-data="Remove"
      data-tooltip="Remove"
      onClick={() => removeFunc(index)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </span>
  );
};

export default RemoveButton;
