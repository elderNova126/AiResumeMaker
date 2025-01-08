import React, { ReactNode } from 'react';

interface TemplateWrapperProps {
  children: ReactNode;
  themeColor: string;
  id: string;
}

const TemplateWrapper = ({ children, themeColor, id }: TemplateWrapperProps) => {
  return (
    <div id="resume-template" className="pt-[11px] pb-[50px]" style={{ backgroundColor: themeColor }}>
      {children}
    </div>
  );
};

export default TemplateWrapper;