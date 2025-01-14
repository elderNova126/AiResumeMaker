import React from 'react';

interface ReorderButtonProps {
  provided: any; // Type this according to the actual type of `provided`
}

const ReorderButton: React.FC<ReorderButtonProps> = ({ provided }) => {
  return (
    <span
      className="reorder-button"
      translate-data="Reorder"
      data-tooltip="Reorder"
      {...provided.dragHandleProps}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 15L12 20L17 15M7 9L12 4L17 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </span>
  );
};

export default ReorderButton;
