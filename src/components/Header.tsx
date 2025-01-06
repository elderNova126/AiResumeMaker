import React, { useState } from 'react';
import {
  FileDown,
  FileUp,
  ScrollText,
  Layout,
  Palette,
  Type,
  Layers
} from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import ImportDialog from './ImportDialog';
import SelectorButton from './SelectorButton';
import SectionsSelector from './SectionsSelector';

interface HeaderProps {
  onLayoutChange: (layout: string) => void;
  currentLayout: string;
  onColorChange: (color: string) => void;
  currentColor: string;
  onTypographyChange: (typography: { font: string; size: string }) => void;
  currentTypography: { font: string; size: string };
  visibleSections: string[];
  setVisibleSections: (sections: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({
  onLayoutChange,
  currentLayout,
  onColorChange,
  currentColor,
  onTypographyChange,
  currentTypography,
  visibleSections,
  setVisibleSections
}) => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const handleImport = (data: Record<string, string>) => {
    console.log('Imported data:', data);
  };

  const layoutOptions = [
    { value: 'split', label: 'Split Layout' },
    { value: 'classic', label: 'Classic Layout' },
    { value: 'hybrid', label: 'Hybrid Layout' },
    { value: 'test', label: 'Test Layout' }
  ];

  const colorOptions = [
    { value: '#7c3aed', label: 'Purple' },
    { value: '#2563eb', label: 'Royal Blue' },
    { value: '#059669', label: 'Emerald' },
    { value: '#dc2626', label: 'Ruby' },
    { value: '#ea580c', label: 'Sunset' },
    { value: '#0891b2', label: 'Ocean' },
    { value: '#1a1a1a', label: 'Charcoal' },
    { value: '#4b5563', label: 'Slate' }
  ];

  const fontOptions = [
    { value: 'nunito', label: 'Nunito' },
    { value: 'archivo-narrow', label: 'Archivo Narrow' },
    { value: 'syne', label: 'Syne' },
    { value: 'dm-serif-display', label: 'DM Serif Display + DM Sans' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'rubik', label: 'Rubik' },
    { value: 'fira-sans', label: 'Fira Sans' },
    { value: 'josefin-sans', label: 'Josefin Sans' },
    { value: 'roboto-mono', label: 'Roboto Mono' },
    { value: 'fjalla-one', label: 'Fjalla One + Inter' }
  ];

  const sectionOptions = [
    { id: 'location', label: 'Location', group: 'Personal Details' },
    { id: 'phone', label: 'Phone Number', group: 'Personal Details' },
    { id: 'email', label: 'Email', group: 'Personal Details' },
    { id: 'website', label: 'Website', group: 'Personal Details' },
    { id: 'linkedin', label: 'LinkedIn', group: 'Personal Details' },
    { id: 'picture', label: 'Profile Picture', group: 'Content Information' },
    { id: 'about', label: 'About Me', group: 'Content Information' },
    { id: 'role', label: 'Current Role', group: 'Content Information' },
    { id: 'experience', label: 'Work Experience', group: 'Content Information' },
    { id: 'education', label: 'Education', group: 'Content Information' },
    { id: 'skills', label: 'Skills', group: 'Content Information' },
    { id: 'languages', label: 'Language', group: 'Content Information' },
    { id: 'interests', label: 'Hobbies', group: 'Content Information' }
  ];

  return (
    <>
      <header className="w-full bg-white shadow-sm py-4 px-6 fixed top-0 z-50  print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          <div className="flex items-center space-x-2" style={{ color: currentColor }}>
            <ScrollText className="h-6 w-6" />
            <span className="text-xl font-semibold">ResumeMaker</span>
          </div>

          <div className="flex items-center justify-center space-x-4" style={{ color: currentColor }}>
            <SelectorButton
              icon={Layout}
              label="Layout"
              value={currentLayout}
              options={layoutOptions}
              onChange={onLayoutChange}
              onDropdownToggle={handleDropdownToggle}
              color={currentColor}
            />
            <SelectorButton
              icon={Palette}
              label="Color"
              value={currentColor}
              options={colorOptions}
              onChange={onColorChange}
              onDropdownToggle={handleDropdownToggle}
              color={currentColor}
            />
            <SelectorButton
              icon={Type}
              label="Typography"
              value={currentTypography.font}
              options={fontOptions}
              onChange={(value) =>
                onTypographyChange({ ...currentTypography, font: value })
              }
              onDropdownToggle={handleDropdownToggle}
              color={currentColor}
            />
            <SelectorButton
              icon={Layers}
              label="Sections"
              value=""
              options={[]}
              color={currentColor}
              onDropdownToggle={handleDropdownToggle}
              customDropdown={
                <SectionsSelector
                  sections={sectionOptions}
                  visibleSections={visibleSections}
                  onChange={setVisibleSections}
                  themeColor={currentColor}
                />
              }
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setShowImportDialog(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all"
              style={{
                backgroundColor: `${currentColor}20`,
                color: currentColor
              }}
            >
              <FileUp className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button
            onClick={globalThis?.print}
              // onClick={() => generatePDF('resume-template')}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-md transition-all hover:opacity-90"
              style={{ backgroundColor: currentColor }}
            >
              <FileDown className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {showImportDialog && (
          <ImportDialog
            onClose={() => setShowImportDialog(false)}
            onImport={handleImport}
          />
        )}
      </header>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/50 mt-[72px] z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
