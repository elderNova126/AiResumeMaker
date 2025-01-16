import React from 'react';
import { Check, MapPin, Phone, Mail, Globe, Linkedin, Nfc } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  group?: string;
  icon?: string;
}

interface SectionsSelectorProps {
  sections: Section[];
  visibleSections: string[];
  onChange: (sections: string[]) => void;
  themeColor?: string;
}

const SectionsSelector = ({ sections, visibleSections, onChange, themeColor = '#10b981' }: SectionsSelectorProps) => {
  const getIcon = (id: string) => {
    const icons: Record<string, React.ReactNode> = {
      location: <MapPin className="w-4 h-4" style={{ color: themeColor }} />,
      phone: <Phone className="w-4 h-4" style={{ color: themeColor }} />,
      email: <Mail className="w-4 h-4" style={{ color: themeColor }} />,
      website: <Globe className="w-4 h-4" style={{ color: themeColor }} />,
      linkedin: <Linkedin className="w-4 h-4" style={{ color: themeColor }} />,
      other: <Nfc className="w-4 h-4" style={{ color: themeColor }} />
    };
    return icons[id];
  };

  const toggleSection = (sectionId: string) => {
    const newSections = visibleSections.includes(sectionId)
      ? visibleSections.filter(id => id !== sectionId)
      : [...visibleSections, sectionId];
    onChange(newSections);
  };

  const personalDetails = sections.filter(s => s.group === 'Personal Details');
  const contentInfo = sections.filter(s => s.group === 'Content Information');

  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg p-2 w-[360px] z-50">
      <div className="flex space-x-3">
        <div className="flex-1">
          <h3 className="text-[0.7rem] font-medium text-gray-500 mb-1.5">Personal Details</h3>
          <div className="space-y-1">
            {personalDetails.map((section) => (
              <button
                key={section.id}
                className="w-full flex items-center px-1 py-0.5 text-[0.7rem]  hover:bg-gray-50 rounded gap-2"
                onClick={() => toggleSection(section.id)}
              >
                {/* {getIcon(section.id)} */}
                <div
                  className={`w-6 h-3 rounded-full p-0.5 transition-colors mr-1.5 ${visibleSections.includes(section.id) ? '' : 'bg-gray-200'
                    }`}
                  style={{ backgroundColor: visibleSections.includes(section.id) ? themeColor : '' }}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-white transition-transform ${visibleSections.includes(section.id) ? 'translate-x-[0.6rem]' : 'translate-x-0'
                      }`}
                  />
                </div>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-[0.7rem] font-medium text-gray-500 mb-1.5">Content Information</h3>
          <div className="space-y-1">
            {contentInfo.map((section) => (
              <button
                key={section.id}
                className="w-full flex items-center px-1 py-0.5 text-[0.7rem]  hover:bg-gray-50 rounded"
                onClick={() => toggleSection(section.id)}
              >
                <div
                  className={`w-6 h-3 rounded-full p-0.5 transition-colors mr-1.5 ${visibleSections.includes(section.id) ? '' : 'bg-gray-200'
                    }`}
                  style={{ backgroundColor: visibleSections.includes(section.id) ? themeColor : '' }}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-white transition-transform ${visibleSections.includes(section.id) ? 'translate-x-[0.6rem]' : 'translate-x-0'
                      }`}
                  />
                </div>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionsSelector;