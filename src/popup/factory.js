/**
 * voca 객체를 통해 저장된 단어, 문장을 파악할 수 있는 객체를 만드는 팩토리 함수
 * @param {*} vocaObj
 * @returns
 */
const createSavedStatus = function (vocaObj) {
  const date = new Date()
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const totalSavedVoca = vocaObj.voca.length
  const todaySavedVoca = vocaObj.voca.filter((item) => {
    return item.startDate === today
  }).length
  const uncheckedVoca = vocaObj.voca.filter((item) => {
    return item.updateDate === null
  }).length

  return {
    totalSavedVoca: totalSavedVoca,
    todaySavedVoca: todaySavedVoca,
    uncheckedVoca: uncheckedVoca,
    statusHTML: `
    <p class="total-saved-voca">Total  ${totalSavedVoca}</p>
    <p class="today-saved-voca">Today  ${todaySavedVoca}</p>
    <p class="unchecked-voca">NotRead  ${uncheckedVoca}</p>
    `,
  }
}

export { createSavedStatus }
