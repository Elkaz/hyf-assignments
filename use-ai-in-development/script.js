const generateRandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};

const colorButton = document.getElementById("colorButton");
const aboutButton = document.getElementById("aboutButton");
const aboutSection = document.getElementById("about");

if (colorButton) {
  colorButton.addEventListener("click", () => {
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();
    document.body.style.background = `linear-gradient(to bottom, ${randomColor1}, ${randomColor2})`;
  });
}

if (aboutButton && aboutSection) {
  aboutButton.addEventListener("click", () => {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
}
