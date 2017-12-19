export default class {
  constructor ({ no, text, handle, iconUrl }) {
    this.id = null
    this.no = no
    this.text = text
    this.handle = handle
    this.iconUrl = iconUrl
  }

  equals (obj) {
    if (this.id != null && this.id === obj.id) {
      return true
    }

    if (this.no === obj.no && this.text === obj.text && this.handle === obj.handle) {
      return true
    }

    return false
  }
}
