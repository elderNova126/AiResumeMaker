import React, { createContext, useState, useContext } from "react";
import type { ExperienceType, EducationType, SkillType, LanguageType, HobbyType } from '../types/resume';


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
  other: string;
  setOther: React.Dispatch<React.SetStateAction<string>>;
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
  experiences: ExperienceType[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  educations: EducationType[];
  setEducations: React.Dispatch<React.SetStateAction<EducationType[]>>;
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  languages: LanguageType[];
  setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  hobbies: HobbyType[]
  setHobbies: React.Dispatch<React.SetStateAction<HobbyType[]>>;
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
  const [other, setOther] = useState("");
  const [about, setAbout] = useState("");
  const [experiences, setExperiences] = useState<ExperienceType[]>([
    {
      company: "",
      dateRange: "",
      position: "",
      location:"",
      description: [],
    }
  ]);
  const [educations, setEducations] = useState<EducationType[]>([
    {
      school: "",
      dateRange: "",
      degree: "",
    }
  ]);
  const [skills, setSkills] = useState([{ skillname: "" }]);
  const [languages, setLanguages] = useState([{ name: "" }]);
  const [hobbies, setHobbies] = useState([{ name: "" }]);
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
