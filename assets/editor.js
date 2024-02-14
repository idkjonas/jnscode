// code.jns.gg
// by jns.gg - 2024

const shareBtn = document.getElementById("share-btn")
const editCodebtn = document.getElementById("edit-code-btn")
const clearBtn = document.getElementById("clear-btn")
const runOnLoad = document.getElementById("run-on-load")
const dataParam = new URLSearchParams(window.location.search).get("c")

let hasParam = false
let decodedDataParam

function padBase64(input) {
    var segmentLength = 4
    var stringLength = input.length
    var diff = stringLength % segmentLength

    if (!diff) {
        return input
    }

    var padLength = segmentLength - diff
    var paddedStringLength = stringLength + padLength
    var buffer = input

    while (padLength--) {
        buffer += "="
    }
    return buffer.toString()
}

if (dataParam !== null && dataParam.trim() !== "") {
    hasParam = true


    const deflated = Uint8Array.from(
        atob(padBase64(dataParam).replace(/\~/g, "+").replace(/_/g, "/")),
        (c) => c.charCodeAt(0),
    )
    const inflated = fflate.inflateSync(deflated)
    const decompressed = fflate.strFromU8(inflated)

    decodedDataParam = decompressed
}

require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.26.1/min/vs" },
})
require(["vs/editor/editor.main"], function () {
    createEditor()
})

let editor

function createEditor() {

    window.editor = monaco.editor.create(document.getElementById("editor"), {
        language: "html",
        automaticLayout: true,
        cursorBlinking: "smooth",
        smoothScrolling: true,
        fontSize: 13,
        minimap: { enabled: false },
    })

    emmetMonaco.emmetHTML(monaco)

    if (dataParam !== null && dataParam.trim() !== "") {
        window.editor.updateOptions({ readOnly: true })
        localStorage.setItem("code", decodedDataParam)
        window.editor.setValue(decodedDataParam)

        var editCodeBtn = document.getElementById("edit-code-btn")
        var hideOnShared = document.getElementById("hide-on-shared")

        if (editCodeBtn && hideOnShared) {
            editCodeBtn.style.display = "flex"
            hideOnShared.style.display = "none"
        }

    } else {
        window.editor.setValue(localStorage.getItem("code") || "")
    }

    monaco.editor.defineTheme("jnscode-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
            {
                foreground: "85E89D",
                token: "metatag.html",
            },
            {
                foreground: "85E89D",
                token: "metatag.content.html",
            },
            {
                foreground: "E2E4E8",
                token: "delimiter.html",
            },
            {
                foreground: "85E89D",
                token: "tag.html",
            },
            {
                foreground: "B392F0",
                token: "attribute.name.html",
            },
            {
                foreground: "9ECBFF",
                token: "attribute.value.html",
            },
            {
                foreground: "79B8FF",
                token: "delimiter.bracket.css",
            },
            {
                foreground: "B392F0",
                token: "tag.css",
            },
            {
                foreground: "79B8FF",
                token: "attribute.name.css",
            },
            {
                foreground: "79B8FF",
                token: "attribute.value.css",
            },
            {
                foreground: "F87683",
                token: "keyword.css",
            },
            {
                foreground: "F87683",
                token: "keyword.js",
            },
            {
                foreground: "B392F0",
                token: "delimiter.parenthesis.js",
            },
            {
                foreground: "FFAB70",
                token: "delimiter.bracket.js",
            },
            {
                foreground: "79B8FF",
                token: "identifier.js",
            },
            {
                foreground: "9ECBFF",
                token: "string.js",
            },
            {
                foreground: "9ECBFF",
                token: "number.js",
            },
            {
                foreground: "6A737D",
                token: "comment.html",
            },
            {
                foreground: "6A737D",
                token: "comment.content.html",
            },
            {
                foreground: "6A737D",
                token: "comment.js",
            },
            {
                foreground: "6A737D",
                token: "comment.css"
            }
        ],
        colors: {
            "editor.background": "#24292F",
            "editor.foreground": "#E2E4E8",
            "editor.selectionBackground": "#2A4668",
            "editor.lineHighlightBackground": "#2B3036",
            "editorCursor.foreground": "#E2E4E8",
            "editorWhitespace.foreground": "#444D56",
            "editorIndentGuide.background": "#2F363D",
            "editorIndentGuide.activeBackground": "#444D56",
            "editor.selectionHighlightBorder": "#2B3036",
            "editorLineNumber.foreground": "#444D56",
            "editorLineNumber.activeForeground": "#E2E4E8",
        },
    })

    monaco.editor.defineTheme("jnscode-light", {
        base: "vs",
        inherit: true,
        rules: [
            {
                foreground: "23863A",
                token: "metatag.html",
            },
            {
                foreground: "23863A",
                token: "metatag.content.html",
            },
            {
                foreground: "24292F",
                token: "delimiter.html",
            },
            {
                foreground: "23863A",
                token: "tag.html",
            },
            {
                foreground: "6F42C1",
                token: "attribute.name.html",
            },
            {
                foreground: "022F62",
                token: "attribute.value.html",
            },
            {
                foreground: "015CC5",
                token: "delimiter.bracket.css",
            },
            {
                foreground: "6F42C1",
                token: "tag.css",
            },
            {
                foreground: "015CC5",
                token: "attribute.name.css",
            },
            {
                foreground: "015CC5",
                token: "attribute.value.css",
            },
            {
                foreground: "D73A4A",
                token: "keyword.css",
            },
            {
                foreground: "D73A4A",
                token: "keyword.js",
            },
            {
                foreground: "6F42C1",
                token: "delimiter.parenthesis.js",
            },
            {
                foreground: "E36208",
                token: "delimiter.bracket.js",
            },
            {
                foreground: "015CC5",
                token: "identifier.js",
            },
            {
                foreground: "022F62",
                token: "string.js",
            },
            {
                foreground: "015CC5",
                token: "number.js",
            },
            {
                foreground: "6A737D",
                token: "comment.html",
            },
            {
                foreground: "6A737D",
                token: "comment.content.html",
            },
            {
                foreground: "6A737D",
                token: "comment.js",
            },
            {
                foreground: "6A737D",
                token: "comment.css"
            }
        ],
        colors: {
            "editor.background": "#ffffff",
            "editor.foreground": "#24292F",
            "editor.selectionBackground": "#DFE9FA",
            "editor.lineHighlightBackground": "#F6F8FA",
            "editorCursor.foreground": "#054289",
            "editorWhitespace.foreground": "#D1D5D9",
            "editorIndentGuide.background": "#F0F2F6",
            "editorIndentGuide.activeBackground": "#D7DBDF",
            "editor.selectionHighlightBorder": "#F6F8FA",
            "editorLineNumber.foreground": "#BABBBC",
            "editorLineNumber.activeForeground": "#24292F",
        },
    })

    runOnLoad.addEventListener("change",
        localStorage.setItem("setting_runOnLoad", runOnLoad.checked)
    )
    // shitty way to convert string to bool
    runOnLoad.checked = JSON.parse(localStorage.getItem("setting_runOnLoad"))

    if (runOnLoad.checked) {
        renderPreview()
    }

    function checkColorTheme() {
        if (matchMedia("(prefers-color-scheme: dark)").matches) {
            monaco.editor.setTheme("jnscode-dark")
        } else {
            monaco.editor.setTheme("jnscode-light")
        }
    }

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            checkColorTheme()
        })

    checkColorTheme()
}

window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        renderPreview()
    }
})

function renderPreview() {
    localStorage.setItem("code", window.editor.getValue())

    const url = URL.createObjectURL(
        new Blob([window.editor.getValue()], { type: "text/html" }),
    )
    const previewElement = document.getElementById("preview")

    if (previewElement) {
        previewElement.setAttribute("src", url)
    }

    window.previousURL ? URL.revokeObjectURL(window.previousURL) : null
    window.previousURL = url
    document.getElementsByTagName("title")[0].innerHTML =
        `${extractTitle()}`
}

let timer

function extractTitle() {
    const regex = window.editor.getValue().match(/<title>(.*?)<\/title>/)
    return regex && regex[1] ? regex[1] : "untitled"
}

function share(mode) {
    let newData = window.editor.getValue().trim()

    const compressed = fflate.strToU8(newData)

    const deflated = fflate.deflateSync(compressed)
    const base64Compressed = btoa(String.fromCharCode.apply(null, deflated))
        .replace(/=/g, "")
        .replace(/\+/g, "~")
        .replace(/\//g, "_")

    if (base64Compressed.length < 2048) {

        const currentURL = window.location.href.split("?")[0]
        const newURL = base64Compressed ? `${currentURL}?c=${base64Compressed}` : currentURL

        if (mode === "short") {
            var formData = new FormData()
            formData.append("url", newURL)

            fetch("https://jns.gg/shared/shorten.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    nToast("Copied short link to clipboard")
                    navigator.clipboard.writeText(data.shortened_url.replace("jns.gg", "jns.gg/code"))
                })
                .catch(error => {
                    console.error("Error:", error)
                    nToast("Error shortening URL. Please try again")
                })
        } else if (mode === "full") {
            navigator.clipboard.writeText(newURL)
            nToast("Copied full link to clipboard")
        } else if (mode === "markdown") {
            navigator.clipboard.writeText(`[${extractTitle()}](${newURL})`)
            nToast("Copied markdown to clipboard")
        }

    } else {
        nToast(`Code too long! max length: 2048, your length: ${base64Compressed.length}`)
    }

}

if (editCodebtn) {
    editCodebtn.addEventListener("click", () => {
        localStorage.setItem("code", window.editor.getValue())
        location.href = location.href.split("?")[0]
    })
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        localStorage.setItem("code", "")
        window.editor.setValue("")
        renderPreview()
        nToast("Cleared code")
    })
}
