import React, { useRef, useEffect, ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface AutoResizeFieldProps {
  type?: 'input' | 'textarea';
  value: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  flag?:false;
}

const AutoResizeField: React.FC<AutoResizeFieldProps> = ({
  type = 'input',
  value,
  placeholder,
  className,
  style,
  onChange,
  flag,
}) => {
  const fieldRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  const getTextWidth = (text: string, font: string) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width; // Returns the width in pixels
    }
    return 0;
  };
  // Adjust height for textarea dynamically
  const adjustHeight = () => {
    const field = fieldRef.current;
    if (type === 'textarea' && field instanceof HTMLTextAreaElement) {
      field.style.height = 'auto'; // Reset height to auto to recalculate
      field.style.height = `${field.scrollHeight+10}px`; // Set height to scrollHeight
    } else if (type === 'input' && field instanceof HTMLInputElement && flag) {
      const inputStyles =getComputedStyle(field);
      const font = `${inputStyles.fontSize} ${inputStyles.fontFamily}`;
      const text = field.value || field.placeholder || "";
      const textWidth = getTextWidth(text, font);
      field.style.width =`${textWidth + 20}px`; // Set width to scrollWidth
      // alert(textWidth)
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height/width whenever `value` changes
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    adjustHeight(); // Adjust height or width on input change
  };

  const baseClasses =
    'w-full bg-transparent border-b border-transparent hover:border-dashed focus:border-dashed focus:outline-none transition-all duration-200 resize-none overflow-hidden';

  if (type === 'textarea') {
    return (
      <textarea
        ref={fieldRef as React.RefObject<HTMLTextAreaElement>}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={twMerge(baseClasses, className)}
        style={{
          minHeight: '1.5em',
          ...style,
        }}
      />
    );
  }

  return (
    <input
      ref={fieldRef as React.RefObject<HTMLInputElement>}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className={className}
      style={{
        ...style,
      }}
    />
  );
};

export default AutoResizeField;
