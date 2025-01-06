import React from 'react';
import SplitLayout from './layouts/SplitLayout';
import ClassicLayout from './layouts/ClassicLayout';
import HybridLayout from './layouts/HybridLayout';
import { generatePDF } from '../utils/pdfGenerator';
import TemplateWrapper from './TemplateWrapper';

interface ResumeEditorProps {
  layout: string;
  themeColor: string;
  visibleSections:string[];
}

const ResumeEditor = ({ layout, themeColor,visibleSections }: ResumeEditorProps) => {
  const renderContent = () => {
    switch (layout) {
      case 'split':
        return <SplitLayout themeColor={themeColor} visibleSections={visibleSections} />;
      case 'classic':
        return <ClassicLayout themeColor={themeColor} visibleSections={visibleSections} />;
      case 'hybrid':
        return <HybridLayout themeColor={themeColor} visibleSections={visibleSections} />;
      default:
        return <SplitLayout themeColor={themeColor} visibleSections={visibleSections} />;
    }
  };

  return (
    <TemplateWrapper themeColor={themeColor} id="resume-template">
      {renderContent()}
    </TemplateWrapper>
  );
};

export default ResumeEditor;