import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#fdf6ec',
          backgroundImage: 'linear-gradient(to bottom right, #fff8e1, #ffecb3)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
  },
});

export default theme;
