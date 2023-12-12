const handle = document.getElementById("handle");
const handleSpan = document.getElementById("handle-span");

const container = document.getElementById("container");
const outerOuput = document.getElementById("outer-output");

handle.addEventListener("dblclick", () => {
  container.style.gridTemplateColumns = "1fr 12px 1fr";
});

let isDragging = false;

handle.addEventListener("mousedown", () => {
  isDragging = true;
  outerOuput.style.pointerEvents = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    document.body.style.cursor = "col-resize";
    const mouseX = e.clientX;

    let calculatedLeft = mouseX - 14;

    let calculatedRight = window.innerWidth - mouseX - 14;

    let finalGrid = `${calculatedLeft}px 12px ${calculatedRight}px`;

    const snapValue = 470;

    if (mouseX <= snapValue) {
      finalGrid = `${snapValue} 12px 1fr`;

      if (mouseX <= snapValue / 2) {
        finalGrid = "0 12px 1fr";
      }
    }

    if (mouseX >= window.innerWidth - 100) {
      finalGrid = `1fr 12px 0`;
    }

    handleSpan.classList.add("h-20");
    handleSpan.classList.add("opacity-50");

    console.log(finalGrid);

    container.style.gridTemplateColumns = finalGrid;
  } else {
    document.body.style.cursor = "default";
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    outerInput.style.opacity = "0";
    outerInput.style.display = "block";

    handleSpan.classList.remove("h-20");
    handleSpan.classList.remove("opacity-50");

    outerOuput.style.pointerEvents = "";
    setTimeout(() => {
      outerInput.style.opacity = "";
      outerInput.style.display = "grid";
    }, 100);
  }
});

document.getElementById("outer-output").addEventListener("mouseup", () => {
  isDragging = false;
});
