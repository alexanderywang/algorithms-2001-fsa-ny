// const white = "#FFF";
// const black = "#161617";
// const gray = "#F8F8F9";

const themeLight = {
  // background: gray,
  // body: black
  foreground: "#000000",
  background: "#eeeeee"
};

const themeDark = {
  // background: "#2d2d2f",
  // body: white
  foreground: "#ffffff",
  background: "#222222"
};

const theme = mode => (mode === "dark" ? themeDark : themeLight);

export default theme;
