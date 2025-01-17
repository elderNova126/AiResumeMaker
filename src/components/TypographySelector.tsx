import React from 'react';
import { Check } from 'lucide-react';

interface TypographySelectorProps {
  value: { font: string; size: string };
  options: { value: string; label: string }[];
  color?: string;
  onChange: (value: { font: string; size: string }) => void;
}

const TypographySelector = ({ value, options, color = '#10b981', onChange }: TypographySelectorProps) => {
  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'big', label: 'Large' }
  ];

  const getButtonStyles = (isSelected: boolean) => {
    if (isSelected) {
      return {
        backgroundColor: `${color}10`,
        color: color,
        border: `2px solid ${color}`
      };
    }
    return {};
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg p-4 w-64 z-50">
      <div className="space-y-4">
        {/* Font Selection */}
        <div>
          <label className="block text-default-sm font-medium  mb-2">Font</label>
          <select
            className="w-full p-2 border text-default-sm rounded-md focus:outline-none focus:ring-emerald-500"
            value={value.font}
            style={{ height: "2.5rem" }}
            onChange={(e) => onChange({ ...value, font: e.target.value })}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} style={{ fontSize: "medium" }}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Size Selection */}
        <div>
          <label className="block text-default-sm font-medium  mb-2">Size</label>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size.value}
                className="flex-1 px-3 py-1.5 text-default-sm rounded-md font-medium transition-all duration-200"
                style={getButtonStyles(value.size === size.value)}
                onClick={() => onChange({ ...value, size: size.value })}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySelector;