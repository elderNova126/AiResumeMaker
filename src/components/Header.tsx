import React, { useState } from "react";
import {
  FileDown,
  FileUp,
  ScrollText,
  Layout,
  Palette,
  Type,
  Layers,
  Phone,
} from "lucide-react";
// import { generatePDF } from '../utils/pdfGenerator';
import ImportDialog from "./ImportDialog";
import SelectorButton from "./SelectorButton";
import SectionsSelector from "./SectionsSelector";
import { PDFDownloadLink } from "@react-pdf/renderer";

// import ResumePDF from "../resumePDF/ResumeSplitPDF";
// import ResumeClassicPDF from "../resumePDF/ResumeClassicPDF";
// import ResumeATSPDF from "../resumePDF/ResumeATSPDF";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
    let title = "";
    document.body.style.paddingTop = "0px";
    const header = document.querySelector("header"); // or document.getElementById('header');
    if (header) {
      header.classList.add("print:hidden");
    }
    const template = document.querySelector("#resume-template"); // or document.getElementById('header');
    if (template) {
      template.classList.remove("print:hidden");
    }
    if (currentLayout == "split") title = "split_Resume_" + name + ".pdf";
    else if (currentLayout == "classic")
      title = "Classic_Resume_" + name + ".pdf";
    else if (currentLayout == "hybrid") title = "ATS_Resume_" + name + ".pdf";
    document.title = title;
    window.print();
    if (header) {
      header.classList.remove("print:hidden");
    }
    if (template) {
      template.classList.add("print:hidden");
    }
    document.body.style.paddingTop = "calc(6.4rem + 4.8rem)";
    document.title = "aiResumeMaker.Online";

    toast.success("Please share it on Facebook or Twitter.", {
      style: {
        fontSize: "18px",
        padding: "20px",
        width: "150%",
        textAlign: "center",
      },
    });
    // reg_google();
  };

  

  const reg_google = async () => {
    try {
      const response = await fetch("http://localhost:5000/log-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: name || "Anonymous",
          action: "Resume Download",
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        console.log("Download logged successfully!");
      } else {
        console.error("Error logging download:", result.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  const confirmID = (sectionId: string) => {
    const newSections = visibleSections.includes(sectionId)
      ? visibleSections.filter(id => id !== sectionId)
      : [...visibleSections, sectionId];
    setVisibleSections(newSections);
  };
  const handleImport = (data: string[]) => {
    setName(data.Name);
    if (data.Role != "") setRole(data.Role); else { confirmID("role"); setRole(""); }

    if (data.Location != "") setLocation(data.Location); else { confirmID("location"); setLocation(""); }
    if (data.Email != "") setEmail(data.Email); else { confirmID("email"); setEmail(""); }
    if (data.Phone != "") setPhone(data.Phone); else { confirmID("phone"); setPhone(""); }
    if (data.Website != "") setWebsite(data.Website); else { confirmID("website"); setWebsite(""); }
    if (data.Linkedin != "") setLinkedin(data.Linkedin); else { confirmID("linkedin"); setLinkedin(""); }
    if (data.Other != "") setOther(data.Other); else { confirmID("other"); setOther(""); }
    if (data.Profile != "") setAbout(data.Profile); else { confirmID("about"); setAbout(""); }


    const formattedSkills =
      Array.isArray(data.Skill) && data.Skill.length > 0
        ? data.Skill.map((item) => ({
          skillname: typeof item === "string" ? [item] : item,
        }))
        : [{ skillname: "" }];
    setSkills(formattedSkills);

    const transformedLng =
      Array.isArray(data.Language) && data.Language.length > 0
        ? data.Language.map((item) => ({
          name: typeof item.Name === "string" ? [item.Name] : item.Name,
          level: item.Level,
        }))
        : [{ name: "", level: "" }];
    setLanguages(transformedLng);

    const transformedHob =
      Array.isArray(data.Interest) && data.Interest.length > 0
        ? data.Interest.map((item) => ({
          name: typeof item === "string" ? [item] : item,
        }))
        : [{ name: "" }];

    setHobbies(transformedHob);

    const transformedExperiences =
      Array.isArray(data.Experience) && data.Experience.length > 0
        ? data.Experience.map((exp) => ({
          company: exp.Company,
          dateRange: exp.DateRange,
          position: exp.Position,
          location: exp.Location,
          description:
            typeof exp.Description === "string"
              ? [exp.Description]
              : exp.Description,
        }))
        : [{ company: "", dateRange: "", position: "", location: "", description: [] }];

    setExperiences(transformedExperiences);

    const transformedEducation =
      Array.isArray(data.Education) && data.Education.length > 0
        ? data.Education.map((item) => ({
          school: item.School,
          dateRange: item.DateRange,
          degree: item.Degree,
        }))
        : [{ school: "", dateRange: "", degree: "" }];
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
    { id: "interests", label: "Activities", group: "Content Information" },
    { id: "other", label: "Other", group: "Content Information" },
  ];
  return (
    <>
      <header
        className="w-full bg-white shadow-sm px-6 py-2 fixed top-[10px] z-50 scale-[1.82]"
        style={{ fontFamily: "Nunito" }}
      >
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
            <button
              onClick={printPdf}
              className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${downloadingLoading ? "opacity-50" : ""
                }`}
              style={{ backgroundColor: currentColor, height: "20px" }}
              disabled={downloadingLoading}
            >
              <FileDown className="h-4 w-4" />
              <span>{downloadingLoading ? "Preparing..." : "Download"}</span>
            </button>

            {/* Use PDFDownloadLink for downloading
            {currentLayout === "split" && (
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
                fileName={"split_Resume_" + name + ".pdf"}
              >
                {" "}
                <button
                  className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${
                    downloadingLoading ? "opacity-50" : ""
                  }`}
                  style={{ backgroundColor: currentColor, height: "20px" }}
                  disabled={downloadingLoading}
                >
                  <FileDown className="h-4 w-4" />
                  <span>
                    {downloadingLoading ? "Preparing..." : "Download"}
                  </span>
                </button>
              </PDFDownloadLink>
            )}
            {currentLayout === "classic" && (
              <PDFDownloadLink
                document={
                  <ResumeClassicPDF
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
                fileName={"Classic_Resume_" + name + ".pdf"}
              >
                <>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${
                      downloadingLoading ? "opacity-50" : ""
                    }`}
                    style={{ backgroundColor: currentColor, height: "20px" }}
                    disabled={downloadingLoading}
                  >
                    <FileDown className="h-4 w-4" />
                    <span>
                      {downloadingLoading ? "Preparing..." : "Download"}
                    </span>
                  </button>
                </>
              </PDFDownloadLink>
            )}
            {currentLayout === "hybrid" && (
              <PDFDownloadLink
                document={
                  <ResumeATSPDF
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
                fileName={"ATS_Resume" + name + ".pdf"}
              >
                <>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 text-default-sm text-white rounded-md transition-all hover:opacity-90 ${
                      downloadingLoading ? "opacity-50" : ""
                    }`}
                    style={{ backgroundColor: currentColor, height: "20px" }}
                    disabled={downloadingLoading}
                  >
                    <FileDown className="h-4 w-4" />
                    <span>
                      {downloadingLoading ? "Preparing..." : "Download"}
                    </span>
                  </button>
                </>
              </PDFDownloadLink>
            )} */}
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
