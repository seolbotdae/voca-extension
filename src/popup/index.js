// 전처리 기능을 지원하는데, js에 돌려 써야하는 것 같다.
import './index.scss'
import { createSavedStatus } from './factory.js'

document.querySelector('.link-option').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }
})

chrome.storage.local
  .get(['voca'])
  .then((result) => {
    const currentStatus = document.querySelector('.current-status')

    const saveStatus = createSavedStatus(result)

    currentStatus.innerHTML = saveStatus.statusHTML
  })
  .catch((reject) => {
    console.error(new Error(reject))
  })
