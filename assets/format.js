import * as prettier from "https://unpkg.com/prettier@3.2.5/standalone.mjs"
import prettierPluginBabel from "https://unpkg.com/prettier@3.2.5/plugins/babel.mjs"
import prettierPluginEstree from "https://unpkg.com/prettier@3.2.5/plugins/estree.mjs"
import prettierPluginHtml from "https://unpkg.com/prettier@3.2.5/plugins/html.mjs"

const formatBtn = document.getElementById("format-btn")

formatBtn.addEventListener("click", async () => {


    window.editor.executeEdits("", [{
        range: window.editor.getModel().getFullModelRange(),
        text: await prettier.format(window.editor.getValue(), {
            semi: false,
            parser: "html",
            plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
        }),
        // forceMoveMarkers: true
    }])

    nToast("Successfully formatted code")
})

