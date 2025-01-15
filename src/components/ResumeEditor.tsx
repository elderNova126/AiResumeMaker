// import SplitLayout from "./layouts/SplitLayout";
import SplitLayout from "./layouts/SplitLayout_test";
import ClassicLayout from "./layouts/ClassicLayout_test";
import HybridLayout from "./layouts/HybridLayout_test";
import PreviewResumeSplit from "../resumePDF/PreviewResumeSplit";
import PreviewResumeClassic from "../resumePDF/PreviewResumeClassic";
import PreviewResumeATS from "../resumePDF/PreviewResumeATS";
import ResumeExtractor from "../resumePDF/ResumeAnlayzer"
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
    about,
    experiences,
    educations,
    skills,
    languages,
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
            summery={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
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
            summery={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
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
            summery={about}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
            avatar={avatar}
            visibleSections={visibleSections}
          />
        );
      case "test":
        return (<ResumeExtractor />);
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
