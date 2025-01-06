import React, { useState } from "react";
import { Mail, MapPin, Phone, Globe, Linkedin, Trash } from "lucide-react";
import AutoResizeField from "../AutoResizeField";
import Experiences from "../Experiences";
import Educations from "../Educations";
import Skills from "../Skills";
import LanguagesSection from "../Languages";

interface SplitLayoutProps {
  themeColor: string;
  visibleSections: string[];
}

const SplitLayout: React.FC<SplitLayoutProps> = ({
  themeColor,
  visibleSections,
}) => {
  const [experiences, setExperiences] = useState([
    {
      company: "Tech Solutions Inc.",
      dateRange: "2018 - Present",
      position: "Senior Software Engineer",
      description: "",
    },
  ]);

  const [educations, setEducations] = useState([
    {
      school: "University of Technology",
      dateRange: "2014 - 2018",
      degree: "Bachelor of Science in Computer Science",
    },
  ]);
  const [skills, setSkills] = useState([{skillname:"", skilllevel:""},]);
  const [languages, setLanguages] = useState([{name:"", level:""},]);
  
  const [name, setName] = useState('John Doe');
  const [role, setRole] = useState('SENIOR SOFTWARE ENGINEER');
  const [location, setLocation] = useState('New York, USA');
  const [email, setEmail] = useState('john.doe@email.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [website, setWebsite] = useState('johndoe.com');
  const [linkedin, setLinkedin] = useState('in/johndoe');
  const [about, setAbout] = useState('Highly skilled and experienced software engineer with a proven track record in developing scalable applications and leading development teams. Passionate about creating efficient solutions and mentoring junior developers.');
  const renderSection = (
    icon: React.ReactNode,
    value: string,
    placeholder: string
  ) => (
    <div className="flex items-center space-x-2">
      {icon}
      <AutoResizeField
        value={value}
        className="textEdit flex-1 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
  
  return (
    <div className="bg-white shadow-lg mx-auto mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] p-4 sm:p-8">
      {/* Header */}
      <div className="col-span-1 md:col-span-3 p-8 flex items-start space-x-8 border-b">
        <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <AutoResizeField
            value={name}
            onChange={(value) => setName(value)}
            className="p-l-2 textEdit text-3xl sm:text-4xl font-bold w-full"
            style={{ color: themeColor }}
            placeholder="Your Name"
          />
          <AutoResizeField
            value={role}
            onChange={(value) => setRole(value)}
            className="p-l-2 textEdit text-lg sm:text-xl text-gray-600 w-full bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
            placeholder="Your Role"
          />
        </div>
      </div>

      {/* Left Column */}
      <div className="col-span-1 bg-gray-50 p-4">
        <h2 className="text-lg sm:text-xl font-bold" style={{ color: themeColor }}>
          PERSONAL DETAILS
        </h2>
        <div className="space-y-4 text-sm">
          {visibleSections.includes("location") &&
            renderSection(
           <>
              <MapPin className="h-4 w-4" style={{ color: themeColor }}/>
              <AutoResizeField
                value={location}
                onChange={(value) => setLocation(value)}
                className="p-l-2 textEdit bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Location"
              />
            </>        
      
            )}
          {visibleSections.includes("email") &&
            renderSection(
              <>
              <Mail className="h-4 w-4" style={{ color: themeColor }} />
              <AutoResizeField
                value={email}
                onChange={(value) => setEmail(value)}
                className="p-l-2 textEdit bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Email"
              />
              </>
              
            )}
          {visibleSections.includes("phone") &&
            renderSection(
              <>
              <Phone className="h-4 w-4" style={{ color: themeColor }} />
              <AutoResizeField
                value={phone}
                onChange={(value) => setPhone(value)}
                className="p-l-2 textEdit bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Phone number"
              />              
              </>
              
            )}
          {visibleSections.includes("website") &&
            renderSection(
              <>
              <Globe className="h-4 w-4" style={{ color: themeColor }} />
              <AutoResizeField
                value={website}
                onChange={(value) => setWebsite(value)}
                className="p-l-2 textEdit bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="Website address"
              /> 
              </>
              
            )}
          {visibleSections.includes("linkedin") &&
            renderSection(
              <>
              <Linkedin className="h-4 w-4" style={{ color: themeColor }} />
              <AutoResizeField
                value={linkedin}
                onChange={(value) => setLinkedin(value)}
                className="p-l-2 textEdit bg-transparent border-b border-transparent hover:border-gray-200 focus:border-emerald-500 focus:outline-none"
                placeholder="LinkedIn address"
              /> 
              </>
              
            )}
        </div>
        {visibleSections.includes("skills") && (
          <Skills setSkills={setSkills} skills={skills} themeColor={themeColor} />
        )}
        {visibleSections.includes("languages") && (
          <LanguagesSection setLanguages={setLanguages} languages={languages} themeColor={themeColor} />
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-1 md:col-span-2 p-4">
        {visibleSections.includes("about") && (
          <div>
            <h2 className="text-xl sm:text-xl font-bold" style={{ color: themeColor }}>
              ABOUT ME
            </h2>
            <AutoResizeField
              type="textarea"
              onChange={(value) => setAbout(value)}
              value={about}
              className="p-l-2 textEdit w-full text-sm text-gray-600 border rounded-md focus:border-emerald-500 focus:outline-none"
              placeholder="Professional Summary"
            />
          </div>
        )}
        {visibleSections.includes("experience") && (
          <Experiences setExperiences={setExperiences} experiences={experiences} themeColor={themeColor} />
        )}
        {visibleSections.includes("education") && (
          <Educations setEducations={setEducations} educations={educations} themeColor={themeColor} />
        )}
      </div>

      {/* Footer */}
      <div className="col-span-1 md:col-span-3 mt-8 text-center text-xs text-gray-400">
        Created for free by:{" "}
        <a
          href="https://airesumemaker.online"
          className="hover:text-gray-600 transition-colors"
        >
          airesumemaker.online
        </a>
      </div>
    </div>
  );
};

export default SplitLayout;
