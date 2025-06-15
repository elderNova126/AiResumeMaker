import { Font } from '@react-pdf/renderer';

const Nunito = new URL('./Nunito.ttf', import.meta.url).href;
const Nunito_bold = new URL('./Nunito_Bold.ttf', import.meta.url).href;
const times_new_roman = new URL('./times_new_roman.ttf', import.meta.url).href;
const times_new_roman_bold = new URL('./times_new_roman_bold.ttf', import.meta.url).href;
const calibri = new URL('./calibri-regular.ttf', import.meta.url).href;
const calibri_bold = new URL('./calibri-bold.ttf', import.meta.url).href;
const Arial = new URL('./ARIAL.ttf', import.meta.url).href;
const Arial_bold = new URL('./ARIALBD.ttf', import.meta.url).href;
const Helvetica = new URL('./Helvetica.ttf', import.meta.url).href;
const Helvetica_bold = new URL('./Helvetica-Bold.ttf', import.meta.url).href;
const Georgia = new URL('./georgia.ttf', import.meta.url).href;
const Georgia_bold = new URL('./georgiab.ttf', import.meta.url).href;
const Garamond = new URL('./garamond_[allfont.ru].ttf', import.meta.url).href;
const Verdana = new URL('./verdana.ttf', import.meta.url).href;
const Verdana_bold = new URL('./verdana-bold.ttf', import.meta.url).href;
const Tahoma = new URL('./tahoma.ttf', import.meta.url).href;
const Tahoma_bold = new URL('./Tahoma-bold.ttf', import.meta.url).href;
const Cambria = new URL('./calibri-regular.ttf', import.meta.url).href; // Using Calibri as Cambria is not available
const Cambria_bold = new URL('./calibri-regular.ttf', import.meta.url).href; // Using Calibri as Cambria is not available
const trebuchet = new URL('./trebuc.ttf', import.meta.url).href;
const trebuchet_bold = new URL('./trebuc.ttf', import.meta.url).href; // No separate bold provided, using the same
const RobotoMono = new URL('./RobotoMono-Regular.ttf', import.meta.url).href;
const RobotoMono_bold = new URL('./RobotoMono-Bold.ttf', import.meta.url).href; // Assuming a separate bold is available
const Poppins = new URL('./Poppins-Regular.ttf', import.meta.url).href;
const Poppins_bold = new URL('./Poppins-Bold.ttf', import.meta.url).href; // Assuming a separate bold is available


const RegisterFonts = () => {
  const fonts = [
    { family: 'Nunito', normal: Nunito, bold: Nunito_bold },
    { family: 'Times New Roman', normal: times_new_roman, bold: times_new_roman_bold },
    { family: 'Calibri', normal: calibri, bold: calibri_bold },
    { family: 'Arial', normal: Arial, bold: Arial_bold },
    { family: 'Helvetica', normal: Helvetica, bold: Helvetica_bold },
    { family: 'Georgia', normal: Georgia, bold: Georgia_bold },
    { family: 'Garamond', normal: Garamond, bold: Garamond }, // No separate bold provided
    { family: 'Verdana', normal: Verdana, bold: Verdana_bold },
    { family: 'Cambria', normal: Cambria, bold: Cambria_bold },
    { family: 'Tahoma', normal: Tahoma, }, //bold: Tahoma_bold 
    { family: 'Trebuchet', normal: trebuchet, bold: trebuchet_bold },
    { family: 'Roboto Mono', normal: RobotoMono, bold: RobotoMono_bold },
    { family: 'Poppins', normal: Poppins, bold: Poppins_bold },
  ];

  fonts.forEach(({ family, normal, bold }) => {
    Font.register({ family, src: normal, fontWeight: 'normal' });
    if (bold) {
      Font.register({ family, src: bold, fontWeight: 'bold' });
    }
  });
};

export default RegisterFonts;