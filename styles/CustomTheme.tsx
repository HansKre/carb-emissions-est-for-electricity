import {createTheme} from '@material-ui/core/styles';
import {PaletteColor} from '@material-ui/core/styles/createPalette';

const primary: PaletteColor = {
    main: '#262626',
    light: '#4e4e4e',
    dark: '#000000',
    contrastText: '#f2f2f2',
};

const secondary: PaletteColor = {
    main: '#949ba6',
    light: '#c5ccd7',
    dark: '#666d77',
    contrastText: '#000000',
};

const CustomTheme = createTheme({
    palette: {
        primary,
        secondary,
        contrastThreshold: 10,
        tonalOffset: 0.8,
    },
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: secondary.light,
            },
        },
        MuiListItem: {
            root: {
                backgroundColor: primary.contrastText,
            },
            button: {
                '&:hover': {
                    backgroundColor: secondary.dark
                }
            }
        }
    },
});

export default CustomTheme;