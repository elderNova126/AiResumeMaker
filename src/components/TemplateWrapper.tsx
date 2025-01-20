import React, { ReactNode } from 'react';

interface TemplateWrapperProps {
  children: ReactNode;
  themeColor: string;
  id: string;
}

const TemplateWrapper = ({ children, themeColor, id }: TemplateWrapperProps) => {
  return (
    <div id="resume-template" className="print:hidden">
      {children}
    </div>
  );
};

export default TemplateWrapper;