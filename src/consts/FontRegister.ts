import { Font } from '@react-pdf/renderer';
import Nunito from './Nunito.ttf';
import Nunito_bold from './Nunito_Bold.ttf';
import times_new_roman from './times_new_roman.ttf';
import times_new_roman_bold from './times_new_roman_bold.ttf';




import RobotoMono from './RobotoMono.ttf';
import Poppins from './Poppins.ttf';

const RegisterFonts = () => {
    Font.register({family: "Nunito",src: Nunito,fontWeight: 'normal',});
    Font.register({family: "Nunito",src: Nunito_bold,fontWeight: 'bold',});

    Font.register({family: "Times New Roman",src: times_new_roman,fontWeight: 'normal',});
    Font.register({family: "Times New Roman",src: times_new_roman_bold,fontWeight: 'bold',});


    Font.register({family: "RobotoMono",src: RobotoMono,});
    Font.register({family: "Poppins", src: Poppins, });
};

export default RegisterFonts;


