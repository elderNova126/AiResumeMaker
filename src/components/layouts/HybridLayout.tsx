import React, { useState } from "react";
import { Mail, MapPin, Phone, Globe, Linkedin } from 'lucide-react';
import AutoResizeField from "../AutoResizeField";
// import AboutMe from "../AboutMe";
import ProExperiences from "../ProExperiences";
import ProEducations from "../ProEducations";
import Skills from "../Skills";
import LanguagesSection from "../Languages";
interface HybridLayoutProps {
  themeColor: string;
  visibleSections:string[];
}

const HybridLayout: React.FC<HybridLayoutProps> = ({
  themeColor,
  visibleSections,
}) => {
  const [proexperiences, setProExperiences] = useState([
      {
        position: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        dateRange: "2018 - Present",
        district:"Nashvialle",
        country:"united state",
        description: "",
      },
    ]);
  
    const [proeducations, setProEducations] = useState([
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        dateRange: "2014 - 2018",        
      },
    ]);
    const [skills, setSkills] = useState([{ skillname: "", skilllevel: "" }]);
    const [languages, setLanguages] = useState([{ name: "", level: "" }]);

    const [name, setName] = useState("Cristopher Gonan");
    const [role, setRole] = useState("Finanicial Analyst");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [about, setAbout] = useState("");
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
          className="textEdit flex-1 bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
          placeholder={placeholder}
        />
      </div>
    );
  return (
    <div className="bg-white shadow-lg mx-auto mt-24 p-8 w-[60vw]">
      <div className="flex items-start space-x-2 mb-2"> 
        <div className="flex-grow">
          <input
            type="text"
            className="p-l-2 text-5xl font-bold w-full border-transparent hover:border-gray-200 focus:outline-none"
            style={{ color: themeColor }}
            defaultValue={name}
            placeholder="Your Name"
          />          
          <div className="flex pd-2">
            {visibleSections.includes("location") &&
              renderSection(
                <MapPin className="text-gray-500" style={{ color: themeColor }} />,
                location,
                setLocation,
                "Location"
              )}
            {visibleSections.includes("email") &&
              renderSection(
                <Mail className="h-5 w-5 text-gray-500" style={{ color: themeColor }} />,
                email,
                setEmail,
                "Email"
              )}
            {visibleSections.includes("phone") &&
              renderSection(
                <Phone className="h-5 w-5 text-gray-500" style={{ color: themeColor }} />,
                phone,
                setPhone,
                "Phone number"
              )}
            {visibleSections.includes("website") &&
              renderSection(
                <Globe className="h-5 w-5 text-gray-500" style={{ color: themeColor }} />,
                website,
                setWebsite,
                "Website address"
              )}
            {visibleSections.includes("linkedin") &&
              renderSection(
                <Linkedin className="h-5 w-5 text-gray-500" style={{ color: themeColor }} />,
                linkedin,
                setLinkedin,
                "LinkedIn address"
              )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-3">
          {/* About Me */}
          <div className="my-3 py-2">
            <h2 className="text-lg sm:text-xl font-bold py-3" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <AutoResizeField
              type="textarea"
              onChange={(value: string) => setAbout(value)} // Ensure onChange works with string type
              value={about}
              className="textEdit w-full text-gray-600 p-3 rounded-md focus:border-emerald-500 focus:outline-none transition-all"
              placeholder="Professional Summary"
            />
          </div>
          {/* Experience */}
          {visibleSections.includes('experience') && (
            <ProExperiences setProExperiences={setProExperiences} proexperiences={proexperiences} themeColor={themeColor} />
          )}
          {/* Education */}
          {visibleSections.includes('education') && (
            <ProEducations setProEducations={setProEducations} proeducations={proeducations} themeColor={themeColor} />
          )}
          {/* Skills */}
          {visibleSections.includes('skills') && (
            <Skills setSkills={setSkills} skills={skills} themeColor={themeColor} />
          )}
          <div className="flex">
            {/* Languages */}
            {visibleSections.includes('languages') && (
              <LanguagesSection setLanguages={setLanguages} languages={languages} themeColor={themeColor} />       
            )}
          </div>
          
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-400">
        Created for free by: <a href="https://airesumemaker.online" className="hover:text-gray-600 transition-colors">airesumemaker.online</a>
      </div>
    </div>
  );
};

export default HybridLayout;