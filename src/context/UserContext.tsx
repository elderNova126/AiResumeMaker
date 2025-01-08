import React, { createContext, useState, useContext } from "react";

interface Experience {
    company: string;
  dateRange: string;
  position: string;
  description: string[];
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
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("John Doe");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("New York, USA");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("ss");
  const [website, setWebsite] = useState("ss");
  const [linkedin, setLinkedin] = useState("ss");
  const [about, setAbout] = useState("ss");
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "TechCorp",
      dateRange: "Jan 2020 - Present",
      position: "Senior Software Engineer",
      description: [
        "Led a team of developers to build scalable web applications.",
        "Implemented CI/CD pipelines to streamline deployment processes.",
      ],
    }
  ]);

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
