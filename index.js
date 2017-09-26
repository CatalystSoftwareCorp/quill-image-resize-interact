import interact from 'interact.js'

export default class ImageResizeInteract {
  constructor(quill) {
    this.quill = quill
    this.quill.root.addEventListener('click', this.handleClick.bind(this))
    this.quill.on('selection-change', this.handleSelectionChange.bind(this))
    this.images = []
  }
  isImage (event) {
    return event.target && event.target.tagName && event.target.tagName.toUpperCase() === 'IMG'
  }
  isAlreadyInteractable (target) {
    return interact.isSet(target)
  }
  handleSelectionChange (range) {
    if (range === null) {
      this.removeClasses()
    }
  }
  removeClasses () {
    this.images.forEach((image) => {
      image.parentNode.classList.remove('ql-resizing')
    })
    this.images = []
  }
  handleClick (event) {
    if (this.isImage(event)) {
      if (this.isAlreadyInteractable(event.target)) {
        return
      } else {
        this.images.push(event.target)
        this.convertToResizable(event.target)
      }
    }
  }
  convertToResizable(image) {
    interact(image)
      .resizable({
        preserveAspectRatio: true,
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizeend', (event) => {
        let target = event.target
        target.parentNode.classList.remove('ql-resizing')
        target.parentNode.setAttribute('data-size', '')
      })
      .on('resizemove', (event) => {
        let target = event.target
        let roundedWidth = Math.round(event.rect.width)
        let roundedHeight = Math.round(event.rect.height)

        target.parentNode.classList.add('ql-resizing')
        target.parentNode.setAttribute('data-size', `${roundedWidth}x${roundedHeight}`)

        target.width  = roundedWidth
        target.height = roundedHeight
      })
  }
}