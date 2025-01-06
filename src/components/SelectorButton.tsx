import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import ColorSelector from './ColorSelector';
import TypographySelector from './TypographySelector';

interface SelectorButtonProps {
  icon: LucideIcon;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: { font: string; size: string }) => void;
  color?: string;
  className?: string;
  onDropdownToggle?: (isOpen: boolean) => void;
  customDropdown?: React.ReactNode;
}

const SelectorButton = ({ 
  icon: Icon, 
  label, 
  value, 
  options, 
  onChange, 
  color,
  className = '',
  onDropdownToggle,
  customDropdown 
}: SelectorButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typographyValue, setTypographyValue] = useState({ font: 'nunito', size: 'medium' });
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        if (onDropdownToggle) {
          onDropdownToggle(false);
        }
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onDropdownToggle) {
      onDropdownToggle(newIsOpen);
    }
  };

  return (
    <div className="relative" ref={buttonRef}>
      <button 
        className={`flex items-center space-x-2 py-2 hover:opacity-80 transition-colors ${className}`}
        onClick={handleToggle}
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
        <ChevronDown className="h-4 w-4 opacity-60" />
      </button>
      
      {isOpen && customDropdown ? (
        customDropdown
      ) : isOpen && label === 'Color' ? (
        <ColorSelector
          value={value}
          options={options}
          onChange={onChange}
        />
      ) : isOpen && label === 'Typography' ? (
        <TypographySelector
          value={typographyValue}
          color={color}
          options={options}
          onChange={(newValue) => {
            setTypographyValue(newValue);
            onChange(newValue);
          }}
        />
      ) : isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-1 w-48 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
              onClick={() => {
                if (onDropdownToggle) {
                  onDropdownToggle(false);
                }
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <Check className="w-4 h-4 text-emerald-600 ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectorButton;