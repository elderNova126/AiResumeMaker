import { useState, useEffect } from "react";
import Header from "./components/Header";
import ResumeEditor from "./components/ResumeEditor";
import { getFontFamily, getFontSize } from "./utils/typography";
import { UserProvider } from "./context/UserContext";

function App() {
  const [layout, setLayout] = useState("split");
  const [themeColor, setThemeColor] = useState("#0891b2");
  const [typography, setTypography] = useState({
    font: "nunito",
    size: "medium",
  });
  // console.log(typography.font,typography.size)
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-primary",
      getFontFamily(typography.font)
    );
    document.documentElement.style.setProperty(
      "--font-size",
      getFontSize(typography.size)
    );
  }, [typography]);

  const [visibleSections, setVisibleSections] = useState<string[]>([
    "location",
    "phone",
    "email",
    "website",
    "linkedin",
    "picture",
    "about",
    "role",
    "experience",
    "education",
    "skills",
    "languages",
    "interests",
  ]);

  return (
    <UserProvider>
      <div
        className="font-primary"
        style={{ backgroundColor: `${themeColor}80` }}
      >
        <Header
          onLayoutChange={setLayout}
          currentLayout={layout}
          onColorChange={setThemeColor}
          currentColor={themeColor}
          onTypographyChange={setTypography}
          currentTypography={typography}
          visibleSections={visibleSections}
          setVisibleSections={setVisibleSections}
        />
        <ResumeEditor
          layout={layout}
          themeColor={themeColor}
          currentTypography={typography}
          visibleSections={visibleSections}
        />
      </div>
    </UserProvider>
  );
}

export default App;
