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
import Languages from "../Languages";
import Hobbies from "../Hobbies";
import Educations from "../Educations";
import Skills from "../Skills";
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

  return (
    <div id="resume" >
      <div className="main-wrapper">
        <div id="name-role">
          <h1
            contentEditable="true"
            translate-data="Your Name"
            placeholder="Your Name"
            id="fullname"
            data-gramm="false"
            spellcheck="false"
            onInput={(e) => setName(e.currentTarget.textContent)}
          >{name}</h1>
          {visibleSections.includes("role") && (
            <h2
              contentEditable="true"
              translate-data="Your Role"
              placeholder="Your Role"
              id="role"
              data-gramm="false"
            // onInput={(e) => setRole(e.currentTarget.textContent)}
            >{role}</h2>
          )}
        </div>
      </div>
      {visibleSections.includes("about") && (
        <AboutMe
          setAbout={setAbout}
          about={about}
          themeColor={themeColor}
        />
      )}
      <h2
        contentEditable="true"
        translate-data="Personal Details"
        placeholder="Personal Details"
        data-gramm="false"
      ></h2>
      <div id="details1" >
        {visibleSections.includes("location") && (
          <div id="location">            
            <p
              contentEditable="true"
              translate-data="Enter Location"
              placeholder="Enter Location"
              data-gramm="false"
              spellcheck="false"
              onInput={(e) => setLocation(e.currentTarget.textContent)}
            >{location}</p>
          </div>
        )}
        {visibleSections.includes("email") && (
          <div id="email">            
            <p
              contentEditable="true"
              translate-data="Enter your email"
              placeholder="Enter your email"
              data-gramm="false"
              spellcheck="false"
              onInput={(e) => setEmail(e.currentTarget.textContent)}
            >{email}</p>
          </div>
        )}
        {visibleSections.includes("phone") && (
          <div id="phone">            
            <p
              contentEditable="true"
              translate-data="Enter your phone"
              placeholder="Enter your phone"
              data-gramm="false"
              onInput={(e) => setPhone(e.currentTarget.textContent)}
            >{phone}</p>
          </div>
        )}
        {visibleSections.includes("website") && (
          <div id="website" translate="no">            
            <p
              contentEditable="true"
              translate-data="Website URL"
              placeholder="Website URL"
              data-gramm="false"
              spellcheck="false"
              onInput={(e) => setWebsite(e.currentTarget.textContent)}
            >{website}</p>
          </div>
        )}
        {visibleSections.includes("linkedin") && (
          <div id="linkedin" translate="no">            
            <p
              contentEditable="true"
              translate-data="LinkedIn URL"
              placeholder="LinkedIn URL"
              data-gramm="false"
              spellcheck="false"
              onInput={(e) => setLinkedin(e.currentTarget.textContent)}
            >{linkedin}</p>
          </div>
        )}

      </div>
      {visibleSections.includes("experience") && (
        <Experiences setExperiences={setExperiences} experiences={experiences} themeColor={themeColor} isSplit={false}/>
      )}
      {visibleSections.includes("education") && (
        <Educations setEducations={setEducations} educations={educations} themeColor={themeColor} isSplit={false}/>
      )}
      {visibleSections.includes("skills") && (
        <Skills
          setSkills={setSkills}
          skills={skills}
          themeColor={themeColor}
          isSplit={false}
        />
      )}
      {visibleSections.includes("languages") && (
        <Languages
          setLanguages={setLanguages}
          languages={languages}
          themeColor={themeColor}
          isSplit={false}

        />
      )}
      {visibleSections.includes("interests") && (
        <Hobbies setHobbies={setHobbies} hobbies={hobbies} themeColor={themeColor} isSplit={false} />
      )}
    </div>
  );
};

export default SplitLayout;
