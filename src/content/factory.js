const createVoca = function (plainText, translatedText) {
  const date = new Date()
  const payload = {
    startDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    updateDate: null,
    plainText: plainText,
    translatedText: translatedText,
  }

  return payload
}

export { createVoca }
