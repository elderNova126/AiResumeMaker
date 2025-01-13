import React, { useState } from "react";
import { FileUp } from "lucide-react";
import { SvgIcon, MailSvgPath, PhoneSvgPath, LinkedSvgPath, WebsiteSvgPath, LocationSvgPath,} from "../../consts/SvgConst";
import AutoResizeField from "../AutoResizeField";
import AboutMe from "../AboutMe";
import Experiences from "../Experiences";
import Educations from "../Educations";
import Skills from "../Skills";
import LanguagesSection from "../Languages";
import { useUser } from "../../context/UserContext";


interface SplitLayoutProps {
  themeColor: string;
  visibleSections: string[];
}

const SplitLayout: React.FC<SplitLayoutProps> = ({
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
        className="p-1 textEdit text-pad flex-1 bg-transparent border-b hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
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
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      // Set the avatar to the URL of the selected image
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="print:!scale-100 print:mx-0 mb-2 print:mb-0 bg-white flex flex-col justify-between shadow-lg mx-auto mt-8 sm:mt-12 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] p-6 sm:p-10 rounded-md min-h-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Header */}
        <div
          className={`col-span-1 md:col-span-3 p-4 flex items-start ${
            visibleSections.includes("picture") ? "space-x-8" : "justify-start"
          } border-b`}
        >
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

          <div className="flex flex-col justify-center items-center justify-center items-center"
            style={{
              // display: "ruby",
              placeItems: visibleSections.includes("picture")
                ? "center"
                : "start",
              height: "100%",
            }}
          >
            <AutoResizeField
              value={name}
              onChange={(value) => setName(value)}
              className="textEdit text-6xl sm:text-6xl font-bold w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
              style={{
                color: themeColor,
                textAlign: visibleSections.includes("picture")
                  ? "center"
                  : "left",
              }}
              placeholder="Your Name"
            />
            {visibleSections.includes("role") && (
              <AutoResizeField
                value={role}
                onChange={(value) => setRole(value)}
                style={{
                  textAlign: visibleSections.includes("picture")
                    ? "center"
                    : "left",
                }}
                className="textEdit text-lg sm:text-xl  w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
                placeholder="Your Role"
              />
            )}
          </div>
        </div>

        {/* Left Column */}
        <div className="col-span-1 bg-gray-50 p-2 rounded-md shadow-md min-h-[1000px]">
          <h2
            className="text-lg sm:text-xl font-bold py-3"
            style={{ color: themeColor }}
          >
            PERSONAL DETAILS
          </h2>
          <div className="space-y-2 mb-3">
            {visibleSections.includes("location") &&
              renderSection(
                <SvgIcon
                  color={themeColor}
                  path={LocationSvgPath}
                  className="h-5 w-5 text-gray-500"
                />,
                location,
                setLocation,
                "Location"
              )}
            {visibleSections.includes("email") &&
              renderSection(
                <SvgIcon
                  color={themeColor}
                  path={MailSvgPath}
                  className="h-5 w-5 text-gray-500"
                />,
                email,
                setEmail,
                "Email"
              )}
            {visibleSections.includes("phone") &&
              renderSection(
                <SvgIcon
                  color={themeColor}
                  path={PhoneSvgPath}
                  className="h-5 w-5 text-gray-500"
                />,
                phone,
                setPhone,
                "Phone number"
              )}

            {visibleSections.includes("website") &&
              renderSection(
                <SvgIcon
                  color={themeColor}
                  path={WebsiteSvgPath}
                  className="h-5 w-5 text-gray-500"
                />,
                website,
                setWebsite,
                "Website address"
              )}
            {visibleSections.includes("linkedin") &&
              renderSection(
                <SvgIcon
                  color={themeColor}
                  path={LinkedSvgPath}
                  className="h-5 w-5 text-gray-500"
                />,
                linkedin,
                setLinkedin,
                "LinkedIn address"
              )}
          </div>
          {visibleSections.includes("about") && (
            <AboutMe
              setAbout={setAbout}
              about={about}
              themeColor={themeColor}
            />
          )}
          {visibleSections.includes("languages") && (
            <LanguagesSection
              setLanguages={setLanguages}
              languages={languages}
              themeColor={themeColor}
              isSplit={true}
            />
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-2 p-6"  style={{ paddingTop: "0px" }}>
          {visibleSections.includes("experience") && (
            <Experiences
              setExperiences={setExperiences}
              experiences={experiences}
              themeColor={themeColor}
            />
          )}
          {visibleSections.includes("education") && (
            <Educations
              setEducations={setEducations}
              educations={educations}
              themeColor={themeColor}
            />
          )}
          {visibleSections.includes("skills") && (
            <Skills
              setSkills={setSkills}
              skills={skills}
              themeColor={themeColor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;
