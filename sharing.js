const importCodeBtn = document.getElementById("importCode");
const shareCodeBtn = document.getElementById("shareCode");

importCodeBtn.addEventListener("click", () => {
  const data = prompt("Enter a base64 string");

  // Check if the user clicked "Cancel" or entered an empty string
  if (data === null || data === "") {
    console.log("User canceled or did not enter any value.");
  } else {
    editor.setValue(atob(data));
  }
});

shareCodeBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(btoa(editor.getValue()));
  setTimeout(() => {
    toast("Copied base64 to clipboard", "green-500", "green-600", "white");
  }, 100);
});
