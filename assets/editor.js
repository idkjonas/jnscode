const dataParam = new URLSearchParams(window.location.search).get("c");

let hasParam = false;

let decodedDataParam;

if (dataParam !== null && dataParam.trim() !== "") {

    hasParam = true;

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

    if (dataParam !== null && dataParam.trim() !== "") {
        window.editor.updateOptions({ readOnly: true })
        localStorage.setItem("code", decodedDataParam)
        editor.setValue(decodedDataParam);
        document.getElementById("shared-code-notice").style.display = "flex";

    } else {
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

document.getElementById("share-btn").addEventListener("click", () => {
    let newData = window.editor.getValue();

    newData = newData.trim();

    const encodedNewData = btoa(newData).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

    if (encodedNewData.length < 2048) {
        const currentURL = window.location.href.split("?")[0];
        const newURL = encodedNewData ? `${currentURL}?c=${encodedNewData}` : currentURL;
        navigator.clipboard.writeText(newURL);
        alert(`Copied link to clipboard`)
    } else {
        alert(`code too long :(. max length: 2048, your length: ${encodedNewData.length}`)
    }

});

document.getElementById("edit-code-btn").addEventListener("click", () => {
    localStorage.setItem("code", window.editor.getValue());
    window.location = window.location.href.split("?")[0];
});

document.getElementById("clear-btn").addEventListener("click", () => {
    localStorage.setItem("code", "");
    editor.setValue("");
    renderPreview();
});
