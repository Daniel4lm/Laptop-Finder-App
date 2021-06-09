import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
/*
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#6162c9',
            main: '#6162c9',
        },
        secondary: {
            light: '#19857b',
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});*/

const theme = {
    colors: {
        primary: {
            light: '#6162c9',
            main: '#6162c9',
        },
        secondary: {
            light: '#19857b',
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
};

export default theme;