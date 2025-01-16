import React, { useState } from "react";
import Contenteditable from "../Contenteditable";
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
import Languages from "../Languages";
import Hobbies from "../Hobbies";
import Picture from "../Picture";
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
    avatar,
    setAvatar,
    hobbies,
    setHobbies,
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
  console.log("*****", hobbies);

  return (
    <div id="resume" data-text="Created by aiResumeMaker.Online">
      <div className="main-wrapper">
        {visibleSections.includes("picture") && (
          <Picture image={avatar} setImage={setAvatar} />
        )}
        <div id="name-role">
          <Contenteditable
            value={name}
            onChange={(updatedContent) => {
              setName(updatedContent);
            }}
            as="h1"
            placeholder="Your Name"
          />

          {visibleSections.includes("role") && (
            <Contenteditable
              value={role}
              onChange={(updatedContent) => {
                setRole(updatedContent);
              }}
              as="h2"
              placeholder="Your Name"
            />
          )}
        </div>
      </div>
      <div className="main-wrapper">
        <div>
          {visibleSections.includes("about") && (
            <AboutMe
              setAbout={setAbout}
              about={about}
              themeColor={themeColor}
            />
          )}
          <div id="details">
            <h2
              contentEditable="true"
              translate-data="Personal Details"
              placeholder="Personal Details"
              data-gramm="false"
            ></h2>
            {visibleSections.includes("location") && (
              <div id="location">
                <Contenteditable
                  value={location}
                  onChange={(updatedContent) => {
                    setLocation(updatedContent);
                  }}
                  as="p"
                  placeholder="Enter Location"
                />
              </div>
            )}
            {visibleSections.includes("email") && (
              <div id="email">
                <Contenteditable
                  value={email}
                  onChange={(updatedContent) => {
                    setEmail(updatedContent);
                  }}
                  as="p"
                  placeholder="Enter your email"
                />
              </div>
            )}
            {visibleSections.includes("phone") && (
              <div id="phone">
                <Contenteditable
                  value={phone}
                  onChange={(updatedContent) => {
                    setPhone(updatedContent);
                  }}
                  as="p"
                  placeholder="Enter your phone"
                />
              </div>
            )}
            {visibleSections.includes("website") && (
              <div id="website" translate="no">
                <Contenteditable
                  value={website}
                  onChange={(updatedContent) => {
                    setWebsite(updatedContent);
                  }}
                  as="p"
                  placeholder="Website URL"
                />
              </div>
            )}
            {visibleSections.includes("linkedin") && (
              <div id="linkedin" translate="no">
                <Contenteditable
                  value={linkedin}
                  onChange={(updatedContent) => {
                    setLinkedin(updatedContent);
                  }}
                  as="p"
                  placeholder="LinkedIn URL"
                />
              </div>
            )}
            {visibleSections.includes("other") && (
              <div id="other" translate="no">
                <Contenteditable
                  value={other}
                  onChange={(updatedContent) => {
                    setOther(updatedContent);
                  }}
                  as="p"
                  placeholder="Other"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          {visibleSections.includes("experience") && (
            <Experiences
              setExperiences={setExperiences}
              experiences={experiences}
              themeColor={themeColor}
              isSplit={false}
            />
          )}
          {visibleSections.includes("education") && (
            <Educations
              setEducations={setEducations}
              educations={educations}
              themeColor={themeColor}
              isSplit={false}
            />
          )}
          {visibleSections.includes("skills") && (
            <Skills
              setSkills={setSkills}
              skills={skills}
              themeColor={themeColor}
            />
          )}
          {visibleSections.includes("languages") && (
            <Languages
              setLanguages={setLanguages}
              languages={languages}
              themeColor={themeColor}
            />
          )}
          {visibleSections.includes("interests") && (
            <Hobbies
              setHobbies={setHobbies}
              hobbies={hobbies}
              themeColor={themeColor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;
