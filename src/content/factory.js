const createVoca = function (plainText, translatedText) {
  const payload = {
    startDate: new Date().getDate(),
    updateDate: null,
    plainText: plainText,
    translatedText: translatedText,
  }

  return payload
}

export { createVoca }
