import { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import Header from "./components/Header";
import ResumeEditor from "./components/ResumeEditor";
import { getFontFamily, getFontSize } from "./utils/typography";
import { UserProvider } from "./context/UserContext";

import Forgot from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterFonts from "./consts/FontRegister";
RegisterFonts();

function App() {

  const [newSize, setNewSize] = useState(8);
  const [preSize, setPreSize] = useState(newSize);
  const [page, setPage] = useState<string>("login");
  const [token, setToken] = useState<string | null>(null);
  const [layout, setLayout] = useState("split");
  const [themeColor, setThemeColor] = useState("#7c3aed");
  const [typography, setTypography] = useState({
    font: "Nunito",
    size: "medium",
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-primary",
      getFontFamily(typography.font)
    );
    if (layout == "split" || layout == "classic" || layout == "hybrid") {
      const tempnewSize = parseFloat(getFontSize(typography.size));
      if (tempnewSize == preSize) return;
      let appSize = 1;
      if (tempnewSize > preSize) {
        appSize = (tempnewSize - preSize);

      } else {
        appSize = (tempnewSize - preSize);
      }
      // alert(preSize + "---" + tempnewSize)
      setNewSize(tempnewSize);
      const element = document.getElementById("resume");
      const elements = element.querySelectorAll('[contenteditable]');
      // alert(parseFloat(getFontSize(typography.size)))
      elements.forEach((el) => {
        const computedStyle = window.getComputedStyle(el);
        const currentFontSize = parseFloat(computedStyle.fontSize);
        const newFontSize = currentFontSize + appSize;
        // alert(currentFontSize);
        (el as HTMLElement).style.fontSize = `${newFontSize}px`;

      });
    }

  }, [typography]);

  useEffect(() => {
    setPreSize(newSize);
  }, [newSize]);
  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
    setToken(auth);
  }, [token]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--main-color",
      themeColor
    );
  }, [themeColor]);
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
    // "interests",
    // "other",
  ]);

  const chosePage = () => {
    switch (page) {
      case "login":
        return <Login setPage={setPage} />;
      case "forgot":
        return <Forgot setPage={setPage} />;
      case "register":
        return <Register setPage={setPage} />;
      default:
        return null;
    }
  };

  const pages = () => {
    if (!token) {
      return (
        <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
            {chosePage()}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <ToastContainer
            position="top-right" // Change position: "top-left", "bottom-right", etc.
            autoClose={5000} // Auto-dismiss after 5 seconds
            hideProgressBar={false} // Show/hide the progress bar
            newestOnTop={true} // New notifications appear on top
            closeOnClick // Close the toast on click
            rtl={false} // Support for right-to-left languages
            pauseOnFocusLoss // Pause auto-dismiss on focus loss
            draggable // Allow drag to dismiss
            pauseOnHover // Pause auto-dismiss on hover
            theme="light" // "light", "dark", or "colored"
          />
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
        </>
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right" // Change position: "top-left", "bottom-right", etc.
        autoClose={5000} // Auto-dismiss after 5 seconds
        hideProgressBar={false} // Show/hide the progress bar
        newestOnTop={true} // New notifications appear on top
        closeOnClick // Close the toast on click
        rtl={false} // Support for right-to-left languages
        pauseOnFocusLoss // Pause auto-dismiss on focus loss
        draggable // Allow drag to dismiss
        pauseOnHover // Pause auto-dismiss on hover
        theme="light" // "light", "dark", or "colored"
      />
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
    </>
  );
}

export default App;
