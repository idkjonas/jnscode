require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.26.1/min/vs' } });
require(['vs/editor/editor.main'], function () {
    createEditor();
});

function createEditor() {
    emmetMonaco.emmetHTML(monaco);
    var editorContainer = document.getElementById('editor');

    window.editor = monaco.editor.create(editorContainer, {
        language: "html",
        automaticLayout: true,
        fontSize: "13px",
        autoClosingTags: true,
        autoClosingBrackets: true,
        minimap: { enabled: false },
        lineNumbers: 'off',
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 20,
        lineNumbersMinChars: 0
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



document.getElementById("clear-btn").addEventListener("click", () => {
    localStorage.setItem("code", "");
    editor.setValue("");
    renderPreview();
});
