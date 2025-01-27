import { Font } from '@react-pdf/renderer';

import Nunito from './Nunito.ttf';
import Nunito_bold from './Nunito_Bold.ttf';
import times_new_roman from './times_new_roman.ttf';
import times_new_roman_bold from './times_new_roman_bold.ttf';
import calibri from './calibri-regular.ttf';
import calibri_bold from './calibri-bold.ttf';
import Arial from './ARIAL.ttf';
import Arial_bold from './ARIALBD.ttf';
import Helvetica from './Helvetica.ttf';
import Helvetica_bold from './Helvetica-Bold.ttf';
import Georgia from './georgia.ttf';
import Georgia_bold from './georgiab.ttf';
import Garamond from './garamond_[allfont.ru].ttf';
import Verdana from './verdana.ttf';
import Verdana_bold from './verdana-bold.ttf';
import Tahoma from './tahoma.ttf';
import Tahoma_bold from './Tahoma-bold.ttf';
import Cambria from './calibri-regular.ttf';
import Cambria_bold from './calibri-regular.ttf';
import trebuchet from './trebuc.ttf';
import trebuchet_bold from './trebuc.ttf';
import RobotoMono from './RobotoMono-Regular.ttf';
import RobotoMono_bold from './RobotoMono-Bold.ttf';
import Poppins from './Poppins-Regular.ttf';
import Poppins_bold from './Poppins-Bold.ttf';

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