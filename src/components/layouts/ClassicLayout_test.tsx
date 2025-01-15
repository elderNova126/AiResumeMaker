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
    <div id="resume" data-text="Created for free at www.resumemaker.online">
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
        style={{ color: themeColor }}
      ></h2>
      <div id="details1" >


        {visibleSections.includes("location") && (
          <div id="location">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.364 16.364L12 22.7279L5.63604 16.364C2.12132 12.8492 2.12132 7.15076 5.63604 3.63604C9.15076 0.12132 14.8492 0.12132 18.364 3.63604C21.8787 7.15076 21.8787 12.8492 18.364 16.364ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                fill="currentColor"
              ></path>
            </svg>
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"
                fill="black"
              ></path>
            </svg>
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16.9111V20.8401C22 21.4234 21.549 21.9074 20.9672 21.9486C20.4812 21.9829 20.0848 22 19.7778 22C9.95933 22 2 14.0407 2 4.22222C2 3.91523 2.01717 3.51874 2.0515 3.03278C2.09263 2.45098 2.5766 2 3.15984 2H7.089C7.3742 2 7.61307 2.21602 7.6417 2.49978C7.66741 2.75452 7.69131 2.95904 7.71341 3.11336C7.93817 4.68302 8.39726 6.17707 9.05411 7.55892C9.15954 7.78072 9.09079 8.04621 8.89094 8.18896L6.49283 9.902C7.9528 13.3123 10.6877 16.0472 14.098 17.5072L15.8079 15.1132C15.9524 14.911 16.2211 14.8414 16.4456 14.948C17.8273 15.6043 19.3212 16.0629 20.8907 16.2871C21.044 16.3091 21.2472 16.3328 21.5002 16.3583C21.784 16.387 22 16.6259 22 16.9111Z"
                fill="currentColor"
              ></path>
            </svg>
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0484 15.5242L17.2863 13.762L19.0484 12C20.9947 10.0536 20.9947 6.89805 19.0484 4.95171C17.102 3.00537 13.9463 3.00537 12 4.95171L10.2379 6.71378L8.47587 4.95171L10.2379 3.18963C13.1575 0.270122 17.891 0.270122 20.8104 3.18963C23.7299 6.10913 23.7299 10.8426 20.8104 13.762L19.0484 15.5242ZM15.5242 19.0484L13.762 20.8104C10.8426 23.7299 6.10913 23.7299 3.18963 20.8104C0.270122 17.891 0.270122 13.1575 3.18963 10.2379L4.95171 8.47587L6.71378 10.2379L4.95171 12C3.00537 13.9463 3.00537 17.102 4.95171 19.0484C6.89805 20.9947 10.0536 20.9947 12 19.0484L13.762 17.2863L15.5242 19.0484ZM15.5242 6.71378L17.2863 8.47587L8.47587 17.2863L6.71378 15.5242L15.5242 6.71378Z"
                fill="currentColor"
              ></path>
            </svg>
            <p
              contentEditable="true"
              translate-data="Enter URL"
              placeholder="Enter URL"
              data-gramm="false"
              spellcheck="false"
              onInput={(e) => setWebsite(e.currentTarget.textContent)}
            >{website}</p>
          </div>
        )}
        {visibleSections.includes("linkedin") && (
          <div id="linkedin" translate="no">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.94048 4.00091C6.94011 4.81522 6.44608 5.548 5.69134 5.85371C4.9366 6.15943 4.07187 5.97703 3.5049 5.39253C2.93793 4.80802 2.78195 3.93813 3.1105 3.19305C3.43906 2.44797 4.18654 1.97648 5.00048 2.00091C6.08155 2.03336 6.94097 2.91935 6.94048 4.00091ZM7.00048 7.48091H3.00048V20.0009H7.00048V7.48091ZM13.3205 7.48091H9.34048V20.0009H13.2805V13.4309C13.2805 9.77088 18.0505 9.43088 18.0505 13.4309V20.0009H22.0005V12.0709C22.0005 5.90091 14.9405 6.13091 13.2805 9.16088L13.3205 7.48091Z"
                fill="currentColor"
              ></path>
            </svg>
            <p
              contentEditable="true"
              translate-data="Enter URL"
              placeholder="Enter URL"
              data-gramm="false"
              spellcheck="false"
              onInput={(e) => setLinkedin(e.currentTarget.textContent)}
            >{linkedin}</p>
          </div>
        )}

      </div>
      {visibleSections.includes("experience") && (
        <Experiences setExperiences={setExperiences} experiences={experiences} themeColor={themeColor} />
      )}
      {visibleSections.includes("education") && (
        <Educations setEducations={setEducations} educations={educations} themeColor={themeColor} />
      )}
      {visibleSections.includes("skills") && (
        <Skills
          setSkills={setSkills}
          skills={skills}
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
  );
};

export default SplitLayout;
