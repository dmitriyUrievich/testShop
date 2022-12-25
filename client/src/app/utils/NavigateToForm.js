export function navigateForm(e) {
  if (e.keyCode===13) {
    const form = e.target.form
    const indexField = Array.prototype.indexOf.call(form, e.target)
    form.elements[indexField+1].focus()
    e.preventDefault()
  }
}
