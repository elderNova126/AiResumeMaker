import { Font } from '@react-pdf/renderer';
import Nunito from './Nunito.ttf';
import ArchivoNarrow from './ArchivoNarrow.ttf';
import Syne from './Syne.ttf';
import DM_Serif_Display from './DMSerifDisplay.ttf';
import DMSans_18pt from './DMSans_18pt.ttf';
import Poppins from './Poppins.ttf';
import Rubik from './Rubik.ttf';
import FiraSans from './FiraSans.ttf';
import JosefinSans from './JosefinSans.ttf';
import RobotoMono from './RobotoMono.ttf';
import FjallaOne from './FjallaOne.ttf';
import Inter_18pt from './Inter_18pt.ttf';

const RegisterFonts = () => {
    Font.register({family: "Nunito",src: Nunito,});
    Font.register({family: "Archivo Narrow",src: ArchivoNarrow,});
    Font.register({family: "Syne",src: Syne,});
    Font.register({family: "DM Serif Display + DM Sans", src: DM_Serif_Display, });
    Font.register({family: "DM Sans",src: DMSans_18pt,});
    Font.register({family: "Poppins", src: Poppins, });
    Font.register({family: "Rubik", src: Rubik,});
    Font.register({family: "Fira Sans", src: FiraSans,});
    Font.register({family: "Josefin Sans",src: JosefinSans,});
    Font.register({family: "Roboto Mono",src: RobotoMono,});
    Font.register({family: "Fjalla One + Inter",src: FjallaOne,});
    Font.register({family: "Inter", src: Inter_18pt,});
};

export default RegisterFonts;





