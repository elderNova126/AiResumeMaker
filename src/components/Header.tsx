import React, { useState } from "react";
import { FileDown, FileUp, ScrollText, Layout, Palette, Type, Layers, Phone, } from "lucide-react";
// import { generatePDF } from '../utils/pdfGenerator';
import ImportDialog from "./ImportDialog";
import SelectorButton from "./SelectorButton";
import SectionsSelector from "./SectionsSelector";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import ResumePDF from "../resumePDF/ResumeSplitPDF";
// import ResumeClassicPDF from "../resumePDF/ResumeClassicPDF";
// import ResumeATSPDF from "../resumePDF/ResumeATSPDF";
import { useUser } from "../context/UserContext";

import ResumeATSPDF from "../resumePDF/PreviewResumeATS";
import ResumeClassicPDF from "../resumePDF/PreviewResumeClassic";
import ResumePDF from "../resumePDF/PreviewResumeSplit";

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
  setVisibleSections,
}) => {
  const {
    name,
    setName,
    role,
    setRole,
    location,
    setLocation,
    email,
    setEmail,
    phone,
    setPhone,
    website,
    setWebsite,
    linkedin,
    setLinkedin,
    other,
    setOther,
    about,
    setAbout,
    experiences,
    setExperiences,
    educations,
    setEducations,
    skills,
    setSkills,
    languages,
    setLanguages,
    hobbies,
    setHobbies,
    avatar,
    setAvatar,
  } = useUser();
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [downloadingLoading, setDownloadingLoading] = useState(false);

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };
  const printPdf = () => {
    document.body.style.paddingTop = '0px';
    const header = document.querySelector('header'); // or document.getElementById('header');
    if (header) {
      header.classList.add('print:hidden');
    }
    window.print();
    if (header) {
      header.classList.remove('print:hidden');
    }
    document.body.style.paddingTop = 'calc(6.4rem + 4.8rem)';
  }
  const handleImport = (data: string[]) => {
    setName(data.Name);
    setRole(data.Role);
    setLocation(data.Location);
    setEmail(data.Email);
    setPhone(data.Phone);
    setWebsite(data.Website);
    setLinkedin(data.Linkedin);
    setOther(data.Other);
    setAbout(data.Profile);


    const formattedSkills = data.Skill.length>0?data.Skill.map((item) => ({
      skillname: item,
    })):[{skillname:""}];
    setSkills(formattedSkills);

    const transformedLng = data.Language.length>0?data.Language.map((item) => ({
      name: item.Name,
      level: item.Level,
    })): [{name:"", level:""}];
    setLanguages(transformedLng);

      const transformedHob = data.Interest.length>0?data.Interest.map((item) => ({
        name: item,
      })):[{name:""}];

      setHobbies(transformedHob);
    

    const transformedExperiences = data.Experience.length>0?data.Experience.map(exp => ({
      company: exp.Company,
      dateRange: exp.DateRange,
      position: exp.Position,
      description: exp.Description,
    })):[{company:"", dateRange:"", position:"", description:[]}];
    
    setExperiences(transformedExperiences);
    

    const transformedEducation = data.Education.length>0?data.Education.map((item) => ({
      school: item.School,
      dateRange: item.DateRange,
      degree: item.Degree,
    })):[{school:"", dateRange:"", degree:""}];
    setEducations(transformedEducation);
  };

  const layoutOptions = [
    { value: "split", label: "Split Layout" },
    { value: "classic", label: "Classic Layout" },
    { value: "hybrid", label: "ATS Layout" },
    // { value: "test_split", label: "Preview Split" },
    // { value: "test_classic", label: "Preview Classic" },
    // { value: "test_ats", label: "Preview ATS" },
    // { value: "test", label: "Test" },
  ];

  const colorOptions = [
    { value: "#7c3aed", label: "Purple" },
    { value: "#2563eb", label: "Royal Blue" },
    { value: "#059669", label: "Emerald" },
    { value: "#dc2626", label: "Ruby" },
    { value: "#ea580c", label: "Sunset" },
    { value: "#0891b2", label: "Ocean" },
    { value: "#1a1a1a", label: "Charcoal" },
    { value: "#4b5563", label: "Slate" },
  ];

  const fontOptions = [
    { value: "Nunito", label: "Nunito" },
    { value: "Sans-Serif", label: "Calibri" },
    { value: "Arial", label: "Arial" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Georgia", label: "Georgia" },
    { value: "Garamond", label: "Garamond" },
    { value: "Verdana", label: "Verdana" },
    { value: "Tahoma", label: "Tahoma" },
    { value: "Cambria", label: "Cambria" },
    { value: "trebuchet MS", label: "Trebuchet MS" },
    { value: "roboto-mono", label: "Roboto Mono" },
    { value: "poppins", label: "Poppins" },
  ];

  const sectionOptions = [
    { id: "location", label: "Location", group: "Personal Details" },
    { id: "phone", label: "Phone Number", group: "Personal Details" },
    { id: "email", label: "Email", group: "Personal Details" },
    { id: "website", label: "Website", group: "Personal Details" },
    { id: "linkedin", label: "LinkedIn", group: "Personal Details" },
    { id: "other", label: "Other", group: "Personal Details" },
    { id: "picture", label: "Profile Picture", group: "Content Information" },
    { id: "about", label: "About Me", group: "Content Information" },
    { id: "role", label: "Current Role", group: "Content Information" },
    {
      id: "experience",
      label: "Work Experience",
      group: "Content Information",
    },
    { id: "education", label: "Education", group: "Content Information" },
    { id: "skills", label: "Skills", group: "Content Information" },
    { id: "languages", label: "Language", group: "Content Information" },
    { id: "interests", label: "Hobbies", group: "Content Information" },
  ];
  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-2 fixed top-[10px] z-50 scale-[1.82]">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          <div
            className="flex items-center space-x-2"
            style={{ color: currentColor }}
          >
            <ScrollText className="h-6 w-6" />
            <span className="text-xl font-semibold">aiResumeMaker.Online</span>
          </div>

          <div
            className="flex items-center justify-center space-x-4"
            style={{ color: currentColor }}
          >
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
              onChange={(value) => onTypographyChange(value)}
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
              className="flex items-center text-default-sm space-x-2 px-4 py-2 rounded-md transition-all"
              style={{
                backgroundColor: `${currentColor}20`,
                color: currentColor,
                height: "20px",
              }}
            >
              <FileUp className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button onClick={printPdf} style={{ display: "none" }}>
              print
            </button>
            {/* Use PDFDownloadLink for downloading */}
            {currentLayout === "split" &&
              <PDFDownloadLink
                document={
                  <ResumePDF
                    themeColor={currentColor}
                    name={name}
                    role={role}
                    location={location}
                    email={email}
                    phone={phone}
                    other={other}
                    websiteLink={website}
                    linkedinLink={linkedin}
                    summery={about}
                    experiences={experiences}
                    educations={educations}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    avatar={avatar}
                    visibleSections={visibleSections}
                    currentTypography={currentTypography}
                  />
                }
                fileName={'split_Resume_' + name + '.pdf'}
              >   <button
                className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${downloadingLoading ? "opacity-50" : ""
                  }`}
                style={{ backgroundColor: currentColor, height: "20px", }}
                disabled={downloadingLoading}

              >
                  <FileDown className="h-4 w-4" />
                  <span>
                    {downloadingLoading ? "Preparing..." : "Download"}
                  </span>
                </button>
              </PDFDownloadLink>}
            {currentLayout === "classic" &&
              <PDFDownloadLink
                document={
                  <ResumeClassicPDF
                    themeColor={currentColor}
                    name={name}
                    role={role}
                    location={location}
                    email={email}
                    phone={phone}
                    websiteLink={website}
                    linkedinLink={linkedin}
                    summery={about}
                    experiences={experiences}
                    educations={educations}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    avatar={avatar}
                    visibleSections={visibleSections}
                    currentTypography={currentTypography}
                  />
                }
                fileName={'Classic_Resume_' + name + '.pdf'}
              >
                <>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${downloadingLoading ? "opacity-50" : ""
                      }`}
                    style={{ backgroundColor: currentColor, height: "20px", }}
                    disabled={downloadingLoading}
                  >
                    <FileDown className="h-4 w-4" />
                    <span>
                      {downloadingLoading ? "Preparing..." : "Download"}
                    </span>
                  </button>
                </>
              </PDFDownloadLink>}
            {currentLayout === "hybrid" &&
              <PDFDownloadLink
                document={
                  <ResumeATSPDF
                    themeColor={currentColor}
                    name={name}
                    role={role}
                    location={location}
                    email={email}
                    phone={phone}
                    websiteLink={website}
                    linkedinLink={linkedin}
                    summery={about}
                    experiences={experiences}
                    educations={educations}
                    skills={skills}
                    languages={languages}
                    hobbies={hobbies}
                    avatar={avatar}
                    visibleSections={visibleSections}
                    currentTypography={currentTypography}
                  />
                }
                fileName={'ATS_Resume' + name + '.pdf'}
              >
                <>

                  <button
                    className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${downloadingLoading ? "opacity-50" : ""
                      }`}
                    style={{ backgroundColor: currentColor, height: "20px", }}
                    disabled={downloadingLoading}
                  >
                    <FileDown className="h-4 w-4" />
                    <span>
                      {downloadingLoading ? "Preparing..." : "Download"}
                    </span>
                  </button>

                </>

              </PDFDownloadLink>}
          </div>
        </div>


      </header>
      {showImportDialog && (
        <ImportDialog
          onClose={() => setShowImportDialog(false)}
          onImport={handleImport}
        />
      )}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/50 mt-[50px] z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
