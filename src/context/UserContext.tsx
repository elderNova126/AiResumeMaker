import React, { createContext, useState, useContext } from "react";

interface Experience {
    company: string;
  dateRange: string;
  position: string;
  description: string[];
}
interface Education {
  school: string;
dateRange: string;
degree: string;
}
interface Skill {
  skillname: string;
}
interface Language {
  name: string;
}
interface UserContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  website: string;
  setWebsite: React.Dispatch<React.SetStateAction<string>>;
  linkedin: string;
  setLinkedin: React.Dispatch<React.SetStateAction<string>>;
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;  
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;  
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;  
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;  
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [about, setAbout] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "",
      dateRange: "",
      position: "",
      description: [],
    }
  ]);
  const [educations, setEducations] = useState<Education[]>([
    {
      school: "",
      dateRange: "",
      degree: "",
    }
  ]);
    const [skills, setSkills] = useState([{ skillname: "" }]);
    const [languages, setLanguages] = useState([{ name: "" }]);
  const [avatar, setAvatar] = useState(
    ""
  );    
  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
