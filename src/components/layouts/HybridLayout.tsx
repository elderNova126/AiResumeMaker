import React, { useState } from "react";
import AutoResizeField from "../AutoResizeField";
import Experiences from "../Experiences";
import Educations from "../Educations";
import Skills from "../Skills";
import LanguagesSection from "../Languages";
import { useUser } from "../../context/UserContext";
import {
  SvgIcon,
  MailSvgPath,
  PhoneSvgPath,
  LinkedSvgPath,
  WebsiteSvgPath,
  LocationSvgPath,
} from "../../consts/SvgConst";

interface HybridLayoutProps {
  themeColor: string;
  visibleSections: string[];
}

const HybridLayout: React.FC<HybridLayoutProps> = ({
  themeColor,
  visibleSections,
}) => {
  const {
    name,
    setName,
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
  } = useUser();

  const [proexperiences] = useState([
    {
      position: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      dateRange: "2018 - Present",
      location: "Nashville, US",
      description: "",
    },
  ]);

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
        className="flex-1 bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="bg-white shadow-lg mx-auto mt-24 p-8 w-[60vw] min-h-[1200px]">
      <div className="flex items-start space-x-2 mb-2">
        <div className="flex-grow">
          <input
            type="text"
            className="p-l-2 text-5xl font-bold border-transparent hover:border-gray-200 focus:outline-none"
            style={{ color: themeColor }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
          <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {visibleSections.includes("location") &&
              renderSection(
                <div className="flex items-center">
                  <SvgIcon
                    path={LocationSvgPath}
                    color={themeColor}
                    className="h-4 w-4 text-gray-600"
                  />
                </div>,
                location,
                setLocation,
                "Location"
              )}
            {visibleSections.includes("email") &&
              renderSection(
                <div className="flex items-center">
                  <SvgIcon
                    path={MailSvgPath}
                    color={themeColor}
                    className="h-4 w-4 text-gray-600"
                  />
                </div>,
                email,
                setEmail,
                "Email"
              )}
            {visibleSections.includes("phone") &&
              renderSection(
                <div className="flex items-center">
                  <SvgIcon
                    path={PhoneSvgPath}
                    color={themeColor}
                    className="h-4 w-4 text-gray-600"
                  />
                </div>,
                phone,
                setPhone,
                "Phone number"
              )}
            {visibleSections.includes("website") &&
              renderSection(
                <div className="flex items-center">
                  <SvgIcon
                    path={WebsiteSvgPath}
                    color={themeColor}
                    className="h-4 w-4 text-gray-600"
                  />
                </div>,
                website,
                setWebsite,
                "Website address"
              )}
            {visibleSections.includes("linkedin") &&
              renderSection(
                <div className="flex items-center">
                  <SvgIcon
                    path={LinkedSvgPath}
                    color={themeColor}
                    className="h-4 w-4 text-gray-600"
                  />
                </div>,
                linkedin,
                setLinkedin,
                "LinkedIn address"
              )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="col-span-3">
          {/* Professional Summary */}
          {visibleSections.includes("about") && 
          <div className="my-3 py-2">
            <h2
              className="text-lg sm:text-xl font-bold py-3"
              style={{ color: themeColor }}
            >
              Professional Summary
            </h2>
            <AutoResizeField
              type="textarea"
              value={about}
              onChange={(value) => setAbout(value)}
              className="textEdit w-full text-gray-600 p-3 rounded-md focus:border-emerald-500 focus:outline-none transition-all"
              placeholder="Professional Summary"
            />
          </div>
}

          {/* Experiences */}
          {visibleSections.includes("experience") && (
            <Experiences
              setExperiences={setExperiences}
              experiences={experiences}
              themeColor={themeColor}
              isATS={true}
            />
          )}

          {/* Educations */}
          {visibleSections.includes("education") && (
            <Educations
              setEducations={setEducations}
              educations={educations}
              themeColor={themeColor}
              isATS={true}
            />
          )}

          {/* Skills */}
          {visibleSections.includes("skills") && (
            <Skills
              setSkills={setSkills}
              skills={skills}
              themeColor={themeColor}
            />
          )}

          {/* Languages */}
          <div className="inline-flex">
            {visibleSections.includes("languages") && (
              <LanguagesSection
                setLanguages={setLanguages}
                languages={languages}
                themeColor={themeColor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HybridLayout;
