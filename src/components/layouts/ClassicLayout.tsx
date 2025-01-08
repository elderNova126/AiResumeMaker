import React, { useState } from "react";
import { Mail, MapPin, Phone, Globe, Linkedin } from "lucide-react";
import AutoResizeField from "../AutoResizeField";
import AboutMe from "../AboutMe";
import Experiences from "../Experiences";
import Educations from "../Educations";
import Skills from "../Skills";
import LanguagesSection from "../Languages";

interface ClassicLayoutProps {
  themeColor: string;
  visibleSections:string[];
}

const ClassicLayout : React.FC<SplitLayoutProps> = ({
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
  const [skills, setSkills] = useState([{ skillname: "", skilllevel: "" }]);
    const [languages, setLanguages] = useState([{ name: "", level: "" }]);
  
    const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [name, setName] = useState("John Doe");
    const [role, setRole] = useState("SENIOR SOFTWARE ENGINEER");
    const [location, setLocation] = useState("New York, USA");
    const [email, setEmail] = useState("john.doe@email.com");
    const [phone, setPhone] = useState("123-456-7890");
    const [website, setWebsite] = useState("johndoe.com");
    const [linkedin, setLinkedin] = useState("in/johndoe");
    const [about, setAbout] = useState(
      "Highly skilled and experienced software engineer with a proven track record in developing scalable applications and leading development teams. Passionate about creating efficient solutions and mentoring junior developers."
    );
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
          className="textEdit flex-1 bg-transparent border-b border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
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
       <div className="col-span-1 md:col-span-3 p-4 flex items-start space-x-8 border-b">
       <div style={{display: "grid",placeItems: "left", width: "100%", height: "100%"}}>
            <AutoResizeField
              value={name}
              onChange={(value) => setName(value)}
              className="textEdit text-6xl sm:text-6xl font-bold w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
              style={{ color: themeColor,width:"100% !important" }}
              placeholder="Your Name"
            />
            <AutoResizeField
              value={role}
              onChange={(value) => setRole(value)}
              style={{width:"100% !important"}}
              className="textEdit text-lg sm:text-xl text-gray-600 w-full bg-transparent border-gray-300 hover:border-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
              placeholder="Your Role"
            />
          </div>
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden flex-shrink-0 shadow-md hover:scale-110 transform transition duration-300 ease-in-out">
            <img
              onClick={handleUpload}
              style={{ cursor: "pointer" }}
              src={avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
        </div>
      <div className="mb-2">
        <h2 className="text-lg sm:text-xl font-bold py-3" style={{ color: themeColor }}>PERSONAL DETAILS</h2>        
        <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
          {visibleSections.includes("location") &&
            renderSection(
              <MapPin className="h-5 w-5 text-gray-500" style={{ color: themeColor }} />,
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
      {/* About Me */}
      {visibleSections.includes('about') && (
        <div className="mb-2">
          <AboutMe setAbout={setAbout} about={about} themeColor={themeColor}/>
        </div>
      )}
      {/* Experience */}
      {visibleSections.includes('experience') && (
        <div className="mb-2">
          {visibleSections.includes("experience") && (
            <Experiences setExperiences={setExperiences} experiences={experiences} themeColor={themeColor} />
          )}
        </div>
      )}
      {/* Education */}
      {visibleSections.includes('education') && (
        <div className="mb-2">
          <Educations setEducations={setEducations} educations={educations} themeColor={themeColor} />
        </div>
      )}
      {/* Skills */}
      {visibleSections.includes('skills') && (
      <div className="mb-2">
        <Skills setSkills={setSkills} skills={skills} themeColor={themeColor} />
      </div>
      )}
      {/* Languages */}
      {visibleSections.includes('skills') && (
      <div>
        <LanguagesSection setLanguages={setLanguages} languages={languages} themeColor={themeColor} />
      </div>
      )}
      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-400 print:hidden">
        Created for free by: <a href="https://airesumemaker.online" className="hover:text-gray-600 transition-colors">airesumemaker.online</a>
      </div>
    </div>
  );
};

export default ClassicLayout;