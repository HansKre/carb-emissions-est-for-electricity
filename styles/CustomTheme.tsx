import {createTheme} from '@material-ui/core/styles';

const GREENISH = '#1d2e23';
const GREEN = '#0f4623'
const DARK_RED = '#8b0000';

const primaryColor = GREENISH,
    secondaryColor = GREEN,
    errorColor = DARK_RED;

const CustomTheme = (primaryColor || errorColor) ? createTheme({
    palette: {
        ...(primaryColor && {
            primary: {
                main: primaryColor,
            }
        }),
        ...(secondaryColor && {
            secondary: {
                main: secondaryColor,
            }
        }),
        ...(errorColor && {
            error: {
                main: errorColor,
            }
        }),
    }
}) : createTheme();

export default CustomTheme;