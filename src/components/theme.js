import { createMuiTheme } from "@material-ui/core/styles";

const white = "#FFF";
const black = "#161617";
const gray = "#F8F8F9";

const themeLight = {
  background: gray,
  body: black
};

const themeDark = {
  background: "#2d2d2f",
  body: white
};

const theme = mode => (mode === "dark" ? themeDark : themeLight);

export default theme;
