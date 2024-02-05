// htmlr.netlify.app
// by jns.gg - 2024

declare function nToast(arg: string): void

const downloadBtn: HTMLElement | null = document.getElementById("download-btn")
const shareBtn: HTMLElement | null = document.getElementById("share-btn")
const editCodebtn: HTMLElement | null = document.getElementById("edit-code-btn")
const clearBtn: HTMLElement | null = document.getElementById("clear-btn")
const dataParam: string | null = new URLSearchParams(window.location.search).get("c")

let hasParam: boolean = false
let decodedDataParam: string

function padBase64(input: string): string {
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


    const deflated: Uint8Array = Uint8Array.from(
        atob(padBase64(dataParam).replace(/\~/g, "+").replace(/_/g, "/")),
        (c) => c.charCodeAt(0),
    )
    // @ts-ignore
    const inflated = fflate.inflateSync(deflated)
    // @ts-ignore
    const decompressed = fflate.strFromU8(inflated)

    decodedDataParam = decompressed
}

// @ts-ignore
require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.26.1/min/vs" },
})
// @ts-ignore
require(["vs/editor/editor.main"], function () {
    createEditor()
})

let editor: any

function createEditor() {

    // @ts-ignore
    window.editor = monaco.editor.create(document.getElementById("editor"), {
        language: "html",
        automaticLayout: true,
        cursorBlinking: "smooth",
        smoothScrolling: true,
        fontSize: 13,
        minimap: { enabled: false },
    })

    // @ts-ignore
    emmetMonaco.emmetHTML(monaco)

    if (dataParam !== null && dataParam.trim() !== "") {
        // @ts-ignore
        window.editor.updateOptions({ readOnly: true })
        localStorage.setItem("code", decodedDataParam)
        // @ts-ignore
        window.editor.setValue(decodedDataParam)

        var sharedCodeNotice: HTMLElement | null = document.getElementById("shared-code-notice")
        var openClearBtn: HTMLElement | null = document.getElementById("open-clear-btn")

        if (sharedCodeNotice && openClearBtn) {
            sharedCodeNotice.style.display = "flex"
            openClearBtn.style.display = "none"
        }

    } else {
        // @ts-ignore
        window.editor.setValue(localStorage.getItem("code") || "")
    }

    // @ts-ignore
    monaco.editor.defineTheme("htmlr-dark", {
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

    // @ts-ignore
    monaco.editor.defineTheme("htmlr-light", {
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
                foreground: "9ECBFF",
                token: "number.js",
            },
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

    function checkColorTheme() {
        if (matchMedia("(prefers-color-scheme: dark)").matches) {
            // @ts-ignore
            monaco.editor.setTheme("htmlr-dark")
        } else {
            // @ts-ignore
            monaco.editor.setTheme("htmlr-light")
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
    nToast("Saved and ran code")
    // @ts-ignore
    localStorage.setItem("code", window.editor.getValue())

    const url: string = URL.createObjectURL(
        // @ts-ignore
        new Blob([window.editor.getValue()], { type: "text/html" }),
    )
    const previewElement = document.getElementById("preview")

    if (previewElement) {
        previewElement.setAttribute("src", url)
    }

    // @ts-ignore
    window.previousURL ? URL.revokeObjectURL(window.previousURL) : null
    // @ts-ignore
    window.previousURL = url
    document.getElementsByTagName("title")[0].innerHTML =
        `${extractTitle()}`
}

let timer

function extractTitle() {
    // @ts-ignore
    const regex: string = window.editor.getValue().match(/<title>(.*?)<\/title>/)
    return regex && regex[1] ? regex[1] : "untitled"
}


if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        const url = URL.createObjectURL(
            // @ts-ignore
            new Blob([window.editor.getValue()], { type: "text/plain" }),
        )
        const a: HTMLAnchorElement = document.createElement("a")
        a.href = url

        a.download = extractTitle().toLowerCase().replace("/ /g", "-") + ".html"
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 10000)
    })
}



if (shareBtn) {

    shareBtn.addEventListener("click", () => {
        // @ts-ignore
        let newData: string = window.editor.getValue().trim()

        // @ts-ignore
        const compressed: Uint8Array = fflate.strToU8(newData)

        // @ts-ignore
        const deflated: any = fflate.deflateSync(compressed)
        const base64Compressed = btoa(String.fromCharCode.apply(null, deflated))
            .replace(/=/g, "")
            .replace(/\+/g, "~")
            .replace(/\//g, "_")

        console.log(compressed)
        console.log(deflated)
        console.log(base64Compressed)

        if (base64Compressed.length < 2048) {
            const currentURL: string = window.location.href.split("?")[0]
            const newURL: string = base64Compressed
                ? `${currentURL}?c=${base64Compressed}`
                : currentURL
            navigator.clipboard.writeText(newURL)
            nToast("Copied link to clipboard")
        } else
            nToast(
                `Code too long! max length: 2048, your length: ${base64Compressed.length}`,
            )
    })
}


if (editCodebtn) {
    editCodebtn.addEventListener("click", () => {
        // @ts-ignore
        localStorage.setItem("code", window.editor.getValue())
        location.href = location.href.split("?")[0]
    })
}


if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        localStorage.setItem("code", "")
        // @ts-ignore
        window.editor.setValue("")
        renderPreview()
        nToast("Cleared code")
    })

}

