const handle = document.getElementById("handle")
const container = document.getElementById("container")
const outerEditor = document.getElementById("outer-editor")
const outerPreview = document.getElementById("outer-preview")

if (handle && container && outerEditor && outerPreview) {

    handle.addEventListener("dblclick", () => {
        container.style.gridTemplateColumns = "1fr 1rem 1fr"
    })

    let isDragging = false

    handle.addEventListener("mousedown", () => {
        isDragging = true
        outerPreview.style.pointerEvents = "none"
    })

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            document.body.style.cursor = "ew-resize"
            let rightSide = window.innerWidth - e.clientX
            let leftSide = e.clientX
            container.style.gridTemplateColumns = `${leftSide - 8}px 1rem ${rightSide - 8}px`
        } else {
            document.body.style.cursor = ""
        }
    })

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false
            outerPreview.style.pointerEvents = ""
        }
    })

    outerPreview.addEventListener("mouseup", () => {
        isDragging = false
    })

}
