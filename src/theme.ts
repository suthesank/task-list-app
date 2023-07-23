import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const modalstyle = {
  position: 'absolute' as 'absolute',
  top: {
    xs: "26%",
    md: "50%"
  },
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "296px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 3px 6px #00000029",
  padding: "24px 24px 29px 24px",
  borderRadius: "12px"
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
