import React, { useRef, useEffect, ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface AutoResizeFieldProps {
  type?: 'input' | 'textarea';
  value: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const AutoResizeField: React.FC<AutoResizeFieldProps> = ({ 
  type = 'input',
  value,
  placeholder,
  className,
  style,
  onChange,
}) => {
  const fieldRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Adjust height for textarea dynamically
  const adjustHeight = () => {
    const field = fieldRef.current;
    if (type === 'textarea' && field instanceof HTMLTextAreaElement) {
      field.style.height = 'auto'; // Reset height to auto to recalculate
      field.style.height = `${field.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height whenever `value` changes
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    adjustHeight(); // Adjust height on input change
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
          // backgroundColor: value ? 'gray' : 'transparent', // Set background color based on value presence
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
      className={twMerge(baseClasses, className)}
      style={{
        ...style,
      }}
    />
  );
};

export default AutoResizeField;
