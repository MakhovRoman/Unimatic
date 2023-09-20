import createTheme from "@mui/material/styles/createTheme";
import "@styles/index.scss"
import { muiPallete } from "./muiPallete";

const pallete = muiPallete();

export const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: pallete.primary.light,
          "&.Mui-focused": {
            color: pallete.primary.light
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: pallete.primary.light
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:after": {
            borderBottomColor: pallete.primary.light
          },
          "&:before": {
            borderBottomColor: pallete.primary.light
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottomColor: pallete.primary.light
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: pallete.primary.main,
          color: pallete.primary.dark,
          "&:hover": {
            backgroundColor: pallete.primary.contrast,
            color: pallete.primary.lighter
          }
        }
      }
    }
  }
})
