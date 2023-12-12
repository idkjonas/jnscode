function toast(content, bgColor, bgColorDark, txtColor) {
  const randomId = Math.floor(Math.random() * 90000) + 10000;
  const toastElement = document.createElement("div");

  toastElement.className = `toast fixed bottom-0 left-0 m-4 p-4 -translate-x-[40rem] transition-all duration-500 tr rounded-md w-42 bg-${bgColor} dark:bg-${bgColorDark} text-${txtColor}`;
  toastElement.id = randomId;
  toastElement.innerHTML = content;

  const existingToasts = document.querySelectorAll(".toast");

  const bottomPosition = 4 + existingToasts.length * (42 + 20);

  toastElement.style.bottom = `${bottomPosition}px`;

  document.body.append(toastElement);

  setTimeout(() => {
    toastElement.classList.remove("-translate-x-[40rem]");
    setTimeout(() => {
      toastElement.classList.add("-translate-x-[40rem]");

      setTimeout(() => {
        document.body.removeChild(document.getElementById(randomId));

        const remainingToasts = document.querySelectorAll(".toast");
        remainingToasts.forEach((t, index) => {
          const newPosition = 4 + index * (42 + 20);
          t.style.bottom = `${newPosition}px`;
        });
      }, 500);
    }, 3000);
  }, 0);
}

const isMacOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
const MODIFIER_KEY = isMacOS ? "CMD" : "CTRL";

toast(
  `Welcome to HTMLR. Press <kbd class='bg-gray-100 text-black px-2 py-0.5 rounded-md border border-gray-400 border-b-4'>${MODIFIER_KEY}</kbd> + <kbd class='bg-gray-100 text-black px-2 py-0.5 rounded-md border border-gray-400 border-b-4'>S</kbd> to save and run your code.`,
  "blue-500",
  "blue-600",
  "white"
);
