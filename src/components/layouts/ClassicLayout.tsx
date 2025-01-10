import React from "react";
import {
  SvgIcon,
  MailSvgPath,
  PhoneSvgPath,
  LinkedSvgPath,
  WebsiteSvgPath,
  LocationSvgPath,
} from "../../consts/SvgConst";
import AutoResizeField from "../AutoResizeField";
import AboutMe from "../AboutMe";
import Experiences from "../Experiences";
import Educations from "../Educations";
import Skills from "../Skills";
import LanguagesSection from "../Languages";
import { FileUp } from "lucide-react";
import { useUser } from "../../context/UserContext";

interface ClassicLayoutProps {
  themeColor: string;
  visibleSections: string[];
}

const ClassicLayout: React.FC<ClassicLayoutProps> = ({
  themeColor,
  visibleSections,
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
    avatar,
    setAvatar,
  } = useUser();

  const renderSection = (
    icon: React.ReactNode,
    value: string,
    onChange: (value: string) => void,
    placeholder: string
  ) => (
    <div className="flex items-center space-x-3">
      {icon}
      <AutoResizeField
        value={value}
        onChange={onChange}
        className="p-2 textEdit flex-1 bg-transparent border-b border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
        placeholder={placeholder}
      />
    </div>
  );

  const handleUpload = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="mb-2 print:mb-0 bg-white flex flex-col shadow-lg mx-auto mt-8 sm:mt-12 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] p-6 sm:p-10 rounded-md min-h-[1200px]">
      <div className="col-span-1 md:col-span-3 p-4 flex items-start space-x-8 border-b">
        <div className="flex-1">
          <AutoResizeField
            value={name}
            onChange={(value) => setName(value)}
            className="textEdit text-6xl font-bold w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
            style={{ color: themeColor }}
            placeholder="Your Name"
          />
          {visibleSections.includes("role") && (
            <AutoResizeField
              value={role}
              onChange={(value) => setRole(value)}
              className="textEdit text-lg sm:text-xl text-gray-600 w-full my-5 bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
              placeholder="Your Role"
            />
          )}
        </div>
        {visibleSections.includes("picture") && (
          <div
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-md relative bg-gray-300 group cursor-pointer"
            onClick={handleUpload}
          >
            <img
              src={avatar}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FileUp className="h-6 w-6 text-white mb-2" />
              <span className="text-white font-semibold text-sm">
                Select Your Picture
              </span>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="mb-2">
        <h2
          className="text-lg sm:text-xl font-bold py-3"
          style={{ color: themeColor }}
        >
          PERSONAL DETAILS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 text-gray-600">
          {visibleSections.includes("location") &&
            renderSection(
              <div className="flex justify-center items-center">
                {/* For testing, use a default SVG path */}
                <SvgIcon
                  path={
                    LocationSvgPath ||
                    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  }
                  color={themeColor}
                  className="h-6 w-6 text-blue-500" // Adjust size and color
                />
              </div>,
              location,
              setLocation,
              "Location"
            )}
          {visibleSections.includes("email") &&
            renderSection(
              <div className="flex justify-center items-center">
                <SvgIcon
                  path={
                    MailSvgPath ||
                    "M20 2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H4V8l8 4 8-4v10z"
                  }
                  color={themeColor}
                  className="h-6 w-6 text-blue-500"
                />
              </div>,
              email,
              setEmail,
              "Email"
            )}
          {visibleSections.includes("phone") &&
            renderSection(
              <div className="flex justify-center items-center">
                <SvgIcon
                  path={
                    PhoneSvgPath ||
                    "M6.62 10.79c.53 0 1.04.21 1.41.59l2.83 2.83c.56.56.85 1.33.85 2.12v4.24c0 1.66-1.34 3-3 3H3c-1.66 0-3-1.34-3-3v-4.24c0-.79.29-1.56.85-2.12l2.83-2.83c.37-.38.88-.59 1.41-.59z"
                  }
                  color={themeColor}
                  className="h-6 w-6 text-blue-500"
                />
              </div>,
              phone,
              setPhone,
              "Phone number"
            )}
          {visibleSections.includes("website") &&
            renderSection(
              <div className="flex justify-center items-center">
                <SvgIcon
                  path={
                    WebsiteSvgPath ||
                    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  }
                  color={themeColor}
                  className="h-6 w-6 text-blue-500"
                />
              </div>,
              website,
              setWebsite,
              "Website address"
            )}
          {visibleSections.includes("linkedin") &&
            renderSection(
              <div className="flex justify-center items-center">
                <SvgIcon
                  path={
                    LinkedSvgPath ||
                    "M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46c0 .98.79 1.77 1.77 1.77h20.46c.98 0 1.77-.79 1.77-1.77V1.77c0-.98-.79-1.77-1.77-1.77zm-7.35 17.65h-3.67v-7.63c0-1.85-1.25-2.83-2.88-2.83-1.65 0-2.84 1.07-2.84 2.84v7.62H6.65v-14h3.34v1.9c.88-1.38 2.45-2.22 4.07-2.22 3.09 0 5.45 2.57 5.45 5.61v8.99z"
                  }
                  color={themeColor}
                  className="h-6 w-6 text-blue-500"
                />
              </div>,
              linkedin,
              setLinkedin,
              "LinkedIn address"
            )}
        </div>
      </div>

      {visibleSections.includes("about") && (
        <AboutMe about={about} setAbout={setAbout} themeColor={themeColor} />
      )}
      {visibleSections.includes("experience") && (
        <Experiences
          experiences={experiences}
          setExperiences={setExperiences}
          themeColor={themeColor}
        />
      )}
      {visibleSections.includes("education") && (
        <Educations
          educations={educations}
          setEducations={setEducations}
          themeColor={themeColor}
        />
      )}
      {visibleSections.includes("skills") && (
        <Skills skills={skills} setSkills={setSkills} themeColor={themeColor} />
      )}
      {visibleSections.includes("languages") && (
        <LanguagesSection
          languages={languages}
          setLanguages={setLanguages}
          themeColor={themeColor}
        />
      )}
    </div>
  );
};

export default ClassicLayout;
