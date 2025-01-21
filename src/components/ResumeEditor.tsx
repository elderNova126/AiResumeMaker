import SplitLayout from "../pages/layouts/SplitLayout";
import ClassicLayout from "../pages/layouts/ClassicLayout";
import HybridLayout from "../pages/layouts/HybridLayout";
import PreviewResumeSplit from "../resumePDF/PreviewResumeSplit";
import PreviewResumeClassic from "../resumePDF/PreviewResumeClassic";
import PreviewResumeATS from "../resumePDF/PreviewResumeATS";
import TemplateWrapper from "./TemplateWrapper";
import { useUser } from "../context/UserContext";

interface ResumeEditorProps {
  layout: string;
  themeColor: string;
  visibleSections: string[];
  currentTypography: { font: string; size: string };
}

const ResumeEditor = ({
  layout,
  themeColor,
  visibleSections,
  currentTypography,
}: ResumeEditorProps) => {
  const {
    name,
    role,
    location,
    email,
    phone,
    website,
    linkedin,
    other,
    about,
    experiences,
    educations,
    skills,
    languages,
    hobbies,
    avatar,
  } = useUser();
  const renderContent = () => {
    switch (layout) {
      case "split":
        return (
          <SplitLayout
            themeColor={themeColor}
            visibleSections={visibleSections}
          />
        );
      case "classic":
        return (
          <ClassicLayout
            themeColor={themeColor}
            visibleSections={visibleSections}
          />
        );
      case "hybrid":
        return (
          <HybridLayout
            themeColor={themeColor}
            visibleSections={visibleSections}
          />
        );
      case "test_split":
        return (
          <PreviewResumeSplit
            themeColor={themeColor}
            name={name}
            role={role}
            email={email}
            location={location}
            phone={phone}
            websiteLink={website}
            linkedinLink={linkedin}
            other={other}
            summery={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
            hobbies={hobbies}
            avatar={avatar}
            visibleSections={visibleSections}
            currentTypography={currentTypography}
          />
        );
      case "test_classic":
        return (
          <PreviewResumeClassic
            themeColor={themeColor}
            currentTypography={currentTypography}
            name={name}
            role={role}
            email={email}
            location={location}
            phone={phone}
            websiteLink={website}
            linkedinLink={linkedin}
            other={other}
            summery={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
            hobbies={hobbies}
            avatar={avatar}
            visibleSections={visibleSections}
          />
        );
      case "test_ats":
        return (
          <PreviewResumeATS
            themeColor={themeColor}
            currentTypography={currentTypography}
            name={name}
            role={role}
            email={email}
            location={location}
            phone={phone}
            websiteLink={website}
            linkedinLink={linkedin}
            other={other}
            summery={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
            hobbies={hobbies}
            avatar={avatar}
            visibleSections={visibleSections}
          />
        );
      default:
        return (
          <SplitLayout
            themeColor={themeColor}
            visibleSections={visibleSections}
          />
        );
    }
  };

  return (
    <TemplateWrapper themeColor={themeColor}>{renderContent()}</TemplateWrapper>
  );
};

export default ResumeEditor;
