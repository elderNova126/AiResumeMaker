import { Font } from '@react-pdf/renderer';

const RegisterFonts = () => {

    Font.register({
        family: "Nunito",
        src: "./nunitso.ttf",
      });
      Font.register({
        family: "Archivo Narrow",
        src: "https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Syne",
        src: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "DM Serif Display + DM Sans",
        src: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      });
      Font.register({
        family: "DM Sans",
        src: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Poppins",
        src: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Rubik",
        src: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Fira Sans",
        src: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Josefin Sans",
        src: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Roboto Mono",
        src: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap",
      });
      Font.register({
        family: "Fjalla One + Inter",
        src: "https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap",
      });
      Font.register({
        family: "Inter",
        src: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      });
};

export default RegisterFonts;





