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
                "foreground": "81A1C1",
                "token": "metatag.html"
            },
            {
                "foreground": "8FBCBB",
                "token": "metatag.content.html"
            },
            {
                "foreground": "81A1C1",
                "token": "delimiter.html"
            },
            {
                "foreground": "81A1C1",
                "token": "tag.html"
            },
            {
                "foreground": "8FBCBB",
                "token": "attribute.name.html"
            },
            {
                "foreground": "A3BE8C",
                "token": "attribute.value.html"
            },
            {
                "foreground": "D18770",
                "token": "tag.css"
            },
            {
                "foreground": "B392F0",
                "token": "attribute.name.css"
            },
            {
                "foreground": "9ECBFF",
                "token": "attribute.value.css"
            },
            {
                "foreground": "81A1C1",
                "token": "keyword.js"
            },
            {
                "foreground": "8FBCBB",
                "token": "identifier.js"
            },
            {
                "foreground": "A3BE8C",
                "token": "string.js"
            }


        ],
        "colors": {
            "editor.background": "#1f2937",
            "editor.selectionBackground": "#3E4758",
            "editor.lineHighlightBackground": "#3B4252",
            "editorCursor.foreground": "#ffffff",
            "editorWhitespace.foreground": "#3B4252",
            "editorIndentGuide.background": "#6a737d",
            "editorIndentGuide.activeBackground": "#3B4252",
            "editor.selectionHighlightBorder": "#3B4252"
        }
    });

    monaco.editor.defineTheme('htmlr-light', {
        "base": "vs",
        "inherit": true,
        "rules": [
            {
                "foreground": "0B7579",
                "token": "metatag.html"
            },
            {
                "foreground": "0B7579",
                "token": "metatag.content.html"
            },
            {
                "foreground": "24292F",
                "token": "delimiter.html"
            },
            {
                "foreground": "0B7579",
                "token": "tag.html"
            },
            {
                "foreground": "0B7579",
                "token": "attribute.name.html"
            },
            {
                "foreground": "509546",
                "token": "attribute.value.html"
            },
            {
                "foreground": "0B7579",
                "token": "tag.css"
            },
            {
                "foreground": "0D60A5",
                "token": "attribute.name.css"
            },
            {
                "foreground": "509546",
                "token": "attribute.value.css"
            },
            {
                "foreground": "81A1C1",
                "token": "keyword.js"
            },
            {
                "foreground": "0B7579",
                "token": "identifier.js"
            },
            {
                "foreground": "509546",
                "token": "string.js"
            }


        ],
        "colors": {
            "editor.background": "#f1f5f9",
            "editor.selectionBackground": "#D0DBF0",
            "editor.lineHighlightBackground": "#e2e8f0",
            "editorCursor.foreground": "#24292F",
            "editorWhitespace.foreground": "#C6E7CE",
            "editorIndentGuide.background": "#D0DBF0",
            "editorIndentGuide.activeBackground": "#D0DBF0",
            "editor.selectionHighlightBorder": "#D0DBF0"
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


