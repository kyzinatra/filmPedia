import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const SliderSettings = {
  breakpoints: {
    [theme.breakpoints.values.xs]: {
      slidesPerView: 2,
      navigation: false,
    },
    [theme.breakpoints.values.sm]: {
      slidesPerView: 3,
      navigation: false,
    },

    [theme.breakpoints.values.md]: {
      slidesPerView: 4,
    },
    1028: {
      slidesPerView: 5,
    },
    [theme.breakpoints.values.lg]: {
      slidesPerView: 6,
    },
    [theme.breakpoints.values.xl]: {
      slidesPerView: 7,
    },
  },
};
export default theme;
