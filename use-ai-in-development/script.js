const colorButton = document.getElementById("colorButton");
if (colorButton) {
  colorButton.addEventListener("click", () => {
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();
    document.body.style.background = `linear-gradient(to bottom, ${randomColor1}, ${randomColor2})`;
  });
} else {
  console.warn("Color button not found");
}

const aboutButton = document.getElementById("aboutButton");
const aboutSection = document.getElementById("about");

if (aboutButton && aboutSection) {
  aboutButton.addEventListener("click", () => {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
}

const generateRandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};
