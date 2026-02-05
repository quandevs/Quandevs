
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
});

generateBtn.addEventListener("click", async () => {
  if (!imageInput.files[0]) {
    alert("Please upload an image first.");
    return;
  }
  output.value = "Processing Khmer text...";
  const { data } = await Tesseract.recognize(
    imageInput.files[0],
    "khm",
    {
      logger: m => console.log(m)
    }
  );
  output.value = data.text;
});

clearBtn.addEventListener("click", () => {
  imageInput.value = "";
  preview.style.display = "none";
  output.value = "";
});

copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  alert("Text copied!");
});
