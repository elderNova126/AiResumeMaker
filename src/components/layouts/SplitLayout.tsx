import React, { useState } from "react";
import { FileUp } from "lucide-react";
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
    <div className="min-h-[92.61rem] w-[74.41rem] bg-white relative mx-auto overflow-hidden text-0 flex flex-col p-[3.3rem] gap-[1.1rem]">
      <div className="flex flex-row gap-8">
        {/* First Column */}
        <div className="flex flex-col gap-16 w-1/4">
          {visibleSections.includes("picture") && (
            <div className="relative aspect-square w-32 sm:w-48 rounded-full cursor-pointer bg-gray-400 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Uploaded avatar"
                  className="w-full h-full object-cover rounded-full"
                  onClick={handleUpload}
                />
              ) : (
                <label
                  className="w-full h-full flex flex-col items-center justify-center text-white font-semibold text-sm bg-gray-400 rounded-full transition-opacity hover:opacity-80"
                  onClick={handleUpload}
                >
                  <span className="opacity-75 mb-2">Select Your Picture</span>
                  <div
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                    style={{
                      backgroundImage: "url('data:image/svg+xml;base64,...')",
                    }}
                  ></div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              )}
            </div>
          )}
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-16 w-3/4">
          <div
            className="flex flex-col justify-center items-center justify-center items-center"
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
      </div>
      {/* main */}
      <div className="flex flex-row gap-8">
        {/* First Column */}
        <div className="flex flex-col gap-16 w-1/4">
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

        {/* Second Column */}
        <div className="flex flex-col gap-16 w-3/4">
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
