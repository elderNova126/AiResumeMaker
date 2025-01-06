import React, { useState } from 'react';
import { Check, Pencil } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

interface ColorSelectorProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const ColorSelector = ({ value, options, onChange }: ColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg p-2 w-[3.75rem] z-50">
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <button
            key={option.value}
            className="relative w-9 h-9 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-110"
            style={{ backgroundColor: option.value }}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {value === option.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="w-4 h-4 text-white drop-shadow-md" />
              </div>
            )}
          </button>
        ))}
        <button
          className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-110"
          onClick={() => {
            setShowPicker(true);
          }}
        >
          <Pencil className="w-4 h-4 text-gray-600" />
        </button>
        
        {showPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <HexColorPicker color={value} onChange={onChange} />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={() => setShowPicker(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSelector;