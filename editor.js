const input = document.getElementById("input");
const outerInput = document.getElementById("outer-input");

const output = document.getElementById("output");
window.previousURL = null;

function updateOutput(to) {
  const url = URL.createObjectURL(new Blob([to], { type: "text/html" }));
  output.src = url;
  if (window.previousURL) {
    URL.revokeObjectURL(window.previousURL);
  }
  window.previousURL = url;
}

const hideEditorBtn = document.getElementById("hideEditor");

const hideEditorBtnIcon = document.querySelector("#hideEditor svg");

hideEditorBtn.addEventListener("click", hideEditor);

function hideEditor() {
  const container = document.getElementById("container");

  if (outerInput.style.display === "none") {
    outerInput.style.display = "grid";
    container.style.gridTemplateColumns = "";
  } else {
    outerInput.style.display = "none";
    container.style.gridTemplateColumns = "1fr";
  }
}

const fileNameInput = document.getElementById("filename-input");
const title = document.getElementById("title");

fileNameInput.addEventListener("input", () => {
  console.log(fileNameInput.textContent);
  if (
    fileNameInput.textContent === "" ||
    fileNameInput.textContent === "index"
  ) {
    title.innerText = "HTML renderer";
  } else {
    title.innerText = `htmlr · ${fileNameInput.textContent}.html`;
  }
});

fileNameInput.textContent = "index";

localStorage.setItem("localFileName", fileNameInput.value);

function downloadFile() {
  toast("Downloading your code...", "green-500", "green-600", "white");

  const url = URL.createObjectURL(
    new Blob([window.editor.getValue()], { type: "text/plain" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = fileNameInput.textContent + ".html";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

document.getElementById("downloadFile").addEventListener("click", downloadFile);

// Reset button

const resetBtn = document.getElementById("resetBtn");

const htmlCode = ``;

resetBtn.addEventListener("click", () => {
  if (
    window.editor.getValue() !== htmlCode &&
    window.confirm("Are you sure?")
  ) {
    localStorage.setItem("code", htmlCode);
    window.editor.setValue(htmlCode);
    updateOutput(htmlCode);
    toast("Cleared code", "green-500", "green-600", "white");
  }
});

// Monaco editor

require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs" },
});

require(["vs/editor/editor.main"], () => {
  emmetMonaco.emmetHTML(monaco);

  window.editor = monaco.editor.create(input, {
    language: "html",
    automaticLayout: true,
    fontSize: "13px",
    autoClosingTags: true,
    autoClosingBrackets: true,
    minimap: { enabled: false },
  });

  let timeout;

  window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      const value = window.editor.getValue();
      localStorage.setItem("code", value);
      updateOutput(value);
      toast(
        "Ran code and saved to local storage",
        "blue-500",
        "blue-600",
        "white"
      );
    }
  });

  editor.setValue(localStorage.getItem("code") || "");

  function checkColorTheme() {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
      monaco.editor.setTheme("vs-dark");
    } else {
      monaco.editor.setTheme("vs");
    }
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      checkColorTheme();
    });

  checkColorTheme();
});

updateOutput("");
