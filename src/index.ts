document.addEventListener("keydown", event => {
    const isTab = event.key === "Tab"

    if (!isTab) {
        return
    }

    const activeElementIsTextArea = document.activeElement instanceof HTMLTextAreaElement

    if (!activeElementIsTextArea) {
        return
    }

    const textArea = document.activeElement as HTMLTextAreaElement

    event.preventDefault()

    const selectionHasRange = textArea.selectionStart !== textArea.selectionEnd

    if (selectionHasRange) {
        return
    } else {
        insertTab(textArea)
    }

    textArea.dispatchEvent(new Event("change"))
})

function insertTab(textArea: HTMLTextAreaElement): void {
    const cursorPosition = textArea.selectionStart
    const beforeSelection = textArea.value.slice(0, cursorPosition)
    const afterSelection = textArea.value.slice(cursorPosition)

    textArea.value = beforeSelection + "  " + afterSelection
    textArea.selectionStart = cursorPosition + 2
    textArea.selectionEnd = cursorPosition + 2
}