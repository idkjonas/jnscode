// LINK SHARING

const dataParam = new URLSearchParams(window.location.search).get("data");

let decodedDataParam;

if (dataParam !== null && dataParam.trim() !== "") {

    decodedDataParam = atob(padBase64(dataParam).replace(/\-/g, "+").replace(/_/g, "/"));

    function padBase64(input) {
        var segmentLength = 4;
        var stringLength = input.length;
        var diff = stringLength % segmentLength;

        if (!diff) {
            return input;
        }

        var padLength = segmentLength - diff;
        var paddedStringLength = stringLength + padLength;
        var buffer = input;

        while (padLength--) {
            buffer += "="
        }

        return buffer.toString();
    }

} else {
    console.log("no data parameter detected!")
}

require.config({ paths: { "vs": "https://cdn.jsdelivr.net/npm/monaco-editor@0.26.1/min/vs" } });
require(["vs/editor/editor.main"], function () {
    createEditor();
});

function createEditor() {
    emmetMonaco.emmetHTML(monaco);
    var editorContainer = document.getElementById("editor");

    window.editor = monaco.editor.create(editorContainer, {
        language: "html",
        automaticLayout: true,
        fontSize: "13px",
        autoClosingTags: true,
        autoClosingBrackets: true,
        minimap: { enabled: false },
        lineNumbers: "off",
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 20,
        lineNumbersMinChars: 0
    });


    // Display the data on the page
    if (dataParam !== null && dataParam.trim() !== "") {
        console.log("setting to data param")
        localStorage.setItem("code", decodedDataParam)
        editor.setValue(decodedDataParam);

    } else {
        console.log("setting to localstorage or clear")
        editor.setValue(localStorage.getItem("code") || "");
    }

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

    renderPreview();
}

window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        renderPreview();
    }
});

function renderPreview() {
    localStorage.setItem("code", window.editor.getValue());

    const url = URL.createObjectURL(new Blob([editor.getValue()], { type: "text/html" }));
    document.getElementById("preview").src = url;
    if (window.previousURL) {
        URL.revokeObjectURL(window.previousURL);
    }
    window.previousURL = url;
}

let timer;

window.addEventListener("resize", () => {
    clearTimeout(timer);

    timer = setTimeout(function () {
        localStorage.setItem("code", window.editor.getValue());
        location.reload();
    }, 100);
});

document.getElementById("download-btn").addEventListener("click", () => {
    const url = URL.createObjectURL(
        new Blob([window.editor.getValue()], { type: "text/plain" })
    );
    const a = document.createElement("a");
    a.href = url;

    const match = editor.getValue().match(/<title>(.*?)<\/title>/);

    let documentTitle;

    if (match && match[1]) {
        documentTitle = match[1];
    } else {
        documentTitle = "untitled";
    }

    a.download = documentTitle + ".html";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
});

// Function to update the URL with a specific "data" parameter
document.getElementById("share-btn").addEventListener("click", () => {
    const newData = window.editor.getValue();
    const encodedNewData = btoa(newData).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    const currentURL = window.location.href.split("?")[0];  // Get the base URL
    const newURL = encodedNewData ? `${currentURL}?data=${encodedNewData}` : currentURL;
    navigator.clipboard.writeText(newURL);
    alert("Copied the link: " + newURL);
    alert(`Copied link to clipboard, use a service like https://www.shorturl.at to shorten the link`)
});




document.getElementById("clear-btn").addEventListener("click", () => {
    localStorage.setItem("code", "");
    editor.setValue("");
    renderPreview();
});


