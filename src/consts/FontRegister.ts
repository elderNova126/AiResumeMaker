import { Font } from '@react-pdf/renderer';

import Nunito from './Nunito.ttf';
import Nunito_bold from './Nunito_Bold.ttf';
import times_new_roman from './times_new_roman.ttf';
import times_new_roman_bold from './times_new_roman_bold.ttf';
import calibri from './calibri-regular.ttf';
import calibri_bold from './calibri-regular.ttf';
import Arial from './ARIAL.ttf';
import Arial_bold from './ARIALBD.ttf';
import Helvetica from './Helvetica.ttf';
import Helvetica_bold from './Helvetica-Bold.ttf';
import Georgia from './georgia.ttf';
import Georgia_bold from './georgiab.ttf';
import Garamond from './garamond_[allfont.ru].ttf';
import Garamond_bold from './garamond_[allfont.ru].ttf';
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
    Font.register({family: "Nunito",src: Nunito,fontWeight: 'normal',});
    Font.register({family: "Nunito",src: Nunito_bold,fontWeight: 'bold',});

    Font.register({family: "calibri",src: calibri,fontWeight: 'normal',});
    Font.register({family: "calibri",src: calibri_bold,fontWeight: 'bold',});

    Font.register({family: "Arial",src: Arial,fontWeight: 'normal',});
    Font.register({family: "Arial",src: Arial_bold,fontWeight: 'bold',});

    Font.register({family: "Helvetica",src: Helvetica,fontWeight: 'normal',});
    Font.register({family: "Helvetica",src: Helvetica_bold,fontWeight: 'bold',});

    Font.register({family: "Georgia",src: Georgia,fontWeight: 'normal',});
    Font.register({family: "Georgia",src: Georgia_bold,fontWeight: 'bold',});

    Font.register({family: "Garamond",src: Garamond,fontWeight: 'normal',});
    Font.register({family: "Garamond",src: Garamond_bold,fontWeight: 'bold',});

    Font.register({family: "Verdana",src: Verdana,fontWeight: 'normal',});
    Font.register({family: "Verdana",src: Verdana_bold,fontWeight: 'bold',});

    Font.register({family: "Tahoma",src: Tahoma,fontWeight: 'normal',});
    Font.register({family: "Tahoma",src: Tahoma_bold,fontWeight: 'bold',});

    Font.register({family: "Cambria",src: Cambria,fontWeight: 'normal',});
    Font.register({family: "Cambria",src: Cambria_bold,fontWeight: 'bold',});

    Font.register({family: "trebuchet",src: trebuchet,fontWeight: 'normal',});
    Font.register({family: "trebuchet",src: trebuchet_bold,fontWeight: 'bold',});    

    Font.register({family: "Times New Roman",src: times_new_roman,fontWeight: 'normal',});
    Font.register({family: "Times New Roman",src: times_new_roman_bold,fontWeight: 'bold',});

    Font.register({family: "Roboto Mono",src: RobotoMono,});
    Font.register({family: "Roboto Mono",src: RobotoMono_bold,fontWeight: 'bold',});

    Font.register({family: "Poppins", src: Poppins, });
    Font.register({family: "Poppins",src: Poppins_bold,fontWeight: 'bold',});
};

export default RegisterFonts;


