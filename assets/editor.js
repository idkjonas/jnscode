
document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
});

document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
});

document.addEventListener("gestureend", function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
});

const dataParam = new URLSearchParams(window.location.search).get('c')

let hasParam = false, decodedDataParam

if (dataParam !== null && dataParam.trim() !== '') {

    hasParam = true

    decodedDataParam = atob(padBase64(dataParam).replace(/\-/g, '+').replace(/_/g, '/'))

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

        while (padLength--) { buffer += '=' }
        return buffer.toString()
    }
} else console.log('no data parameter detected!')


require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.26.1/min/vs' }, })
require(['vs/editor/editor.main'], function () { createEditor() })

function createEditor() {
    emmetMonaco.emmetHTML(monaco)

    monaco.editor.defineTheme('htmlr-dark', {
        "base": "vs-dark",
        "inherit": true,
        "rules": [
            {
                "foreground": "85E89D",
                "token": "metatag.html"
            },
            {
                "foreground": "85E89D",
                "token": "metatag.content.html"
            },
            {
                "foreground": "E2E4E8",
                "token": "delimiter.html"
            },
            {
                "foreground": "85E89D",
                "token": "tag.html"
            },
            {
                "foreground": "B392F0",
                "token": "attribute.name.html"
            },
            {
                "foreground": "9ECBFF",
                "token": "attribute.value.html"
            },
            {
                "foreground": "79B8FF",
                "token": "delimiter.bracket.css"
            },
            {
                "foreground": "B392F0",
                "token": "tag.css"
            },
            {
                "foreground": "79B8FF",
                "token": "attribute.name.css"
            },
            {
                "foreground": "79B8FF",
                "token": "attribute.value.css"
            },
            {
                "foreground": "F87683",
                "token": "keyword.css"
            },
            {
                "foreground": "F87683",
                "token": "keyword.js"
            },
            {
                "foreground": "B392F0",
                "token": "delimiter.parenthesis.js"
            },
            {
                "foreground": "FFAB70",
                "token": "delimiter.bracket.js"
            },
            {
                "foreground": "79B8FF",
                "token": "identifier.js"
            },
            {
                "foreground": "9ECBFF",
                "token": "string.js"
            },
            {
                "foreground": "9ECBFF",
                "token": "number.js"
            },


        ],
        "colors": {
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
        }
    });

    monaco.editor.defineTheme('htmlr-light', {
        "base": "vs",
        "inherit": true,
        "rules": [
            {
                "foreground": "23863A",
                "token": "metatag.html"
            },
            {
                "foreground": "23863A",
                "token": "metatag.content.html"
            },
            {
                "foreground": "24292F",
                "token": "delimiter.html"
            },
            {
                "foreground": "23863A",
                "token": "tag.html"
            },
            {
                "foreground": "6F42C1",
                "token": "attribute.name.html"
            },
            {
                "foreground": "022F62",
                "token": "attribute.value.html"
            },
            {
                "foreground": "015CC5",
                "token": "delimiter.bracket.css"
            },
            {
                "foreground": "6F42C1",
                "token": "tag.css"
            },
            {
                "foreground": "015CC5",
                "token": "attribute.name.css"
            },
            {
                "foreground": "015CC5",
                "token": "attribute.value.css"
            },
            {
                "foreground": "D73A4A",
                "token": "keyword.css"
            },
            {
                "foreground": "D73A4A",
                "token": "keyword.js"
            },
            {
                "foreground": "6F42C1",
                "token": "delimiter.parenthesis.js"
            },
            {
                "foreground": "E36208",
                "token": "delimiter.bracket.js"
            },
            {
                "foreground": "015CC5",
                "token": "identifier.js"
            },
            {
                "foreground": "022F62",
                "token": "string.js"
            },
            {
                "foreground": "9ECBFF",
                "token": "number.js"
            },


        ],
        "colors": {
            "editor.background": "#ffffff",
            "editor.foreground": "#24292F",
            "editor.selectionBackground": "#DFE9FA",
            "editor.lineHighlightBackground": "#F6F8FA",
            "editorCursor.foreground": "#ffffff",
            "editorWhitespace.foreground": "#D1D5D9",
            "editorIndentGuide.background": "#F0F2F6",
            "editorIndentGuide.activeBackground": "#D7DBDF",
            "editor.selectionHighlightBorder": "#F6F8FA",
            "editorLineNumber.foreground": "#BABBBC",
            "editorLineNumber.activeForeground": "#24292F",
        }
    });



    window.editor = monaco.editor.create(document.getElementById('editor'), {
        language: 'html',
        automaticLayout: true,
        cursorBlinking: "smooth",
        smoothScrolling: true,
        fontSize: 13,
        minimap: { enabled: false },

    })

    if (dataParam !== null && dataParam.trim() !== '') {
        window.editor.updateOptions({ readOnly: true })
        localStorage.setItem('code', decodedDataParam)
        editor.setValue(decodedDataParam)
        document.getElementById('shared-code-notice').style.display = 'flex'
        document.getElementById('open-clear-btn').style.display = 'none'

    } else {
        editor.setValue(localStorage.getItem('code') || '')
        renderPreview()
    }

    function checkColorTheme() {
        if (matchMedia("(prefers-color-scheme: dark)").matches) {
            monaco.editor.setTheme("htmlr-dark");
        } else {
            monaco.editor.setTheme("htmlr-light");
        }
    }

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            checkColorTheme();
        });

    checkColorTheme();
}

window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        renderPreview()
    }
})

function renderPreview() {
    localStorage.setItem('code', window.editor.getValue())

    const url = URL.createObjectURL(
        new Blob([editor.getValue()], { type: 'text/html' }),
    )
    document.getElementById('preview').src = url
    window.previousURL ? URL.revokeObjectURL(window.previousURL) : null
    window.previousURL = url
    document.getElementsByTagName('title')[0].innerHTML = `${extractTitle()} • htmlr`
}

let timer

function extractTitle() {
    const regex = editor.getValue().match(/<title>(.*?)<\/title>/)
    return regex && regex[1] ? regex[1] : 'untitled'
}

document.getElementById('download-btn').addEventListener('click', () => {
    const url = URL.createObjectURL(
        new Blob([window.editor.getValue()], { type: 'text/plain' }),
    )
    const a = document.createElement('a')
    a.href = url

    a.download = extractTitle() + '.html'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 10000)
})

document.getElementById('share-btn').addEventListener('click', () => {
    let newData = window.editor.getValue().trim()

    const encodedNewData = btoa(newData)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')

    if (encodedNewData.length < 2048) {
        const currentURL = window.location.href.split('?')[0]
        const newURL =
            encodedNewData ? `${currentURL}?c=${encodedNewData}` : currentURL
        navigator.clipboard.writeText(newURL)
        alert(`Copied link to clipboard`)

    } else alert(`code too long :(. max length: 2048, your length: ${encodedNewData.length}`)
})

document.getElementById('edit-code-btn').addEventListener('click', () => {
    localStorage.setItem('code', window.editor.getValue())
    window.location = window.location.href.split('?')[0]
})

document.getElementById('clear-btn').addEventListener('click', () => {
    localStorage.setItem('code', '')
    editor.setValue('')
    renderPreview()
})


