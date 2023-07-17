import { createVoca } from './factory'

console.info('chrome-ext template-vanilla-js content script')

// document.documentElement는 최상위 -> html 태그를 말함.
// document는 내부의 전체 문서를 나타내는 역할을 함.
let target = document.documentElement
var config = { childList: true }

const addChromeLocalStroage = function (event, targetElm) {
  console.log(`addChromeLocalStorage excute`)
  console.log('타겟 엘리먼트 : ', targetElm)

  // 테스트 디버깅용 초기화 함수
  // chrome.storage.local.clear()

  const plainText = window.getSelection().toString()
  const translatedText = targetElm.querySelector('.result-frame').innerText

  console.log(plainText, translatedText)

  chrome.storage.local
    .get(['voca'])
    .then((result) => {
      // if empty object
      if (Object.keys(result).length === 0) {
        console.log('비었음 => ', result)
        chrome.storage.local
          .set({ voca: [createVoca(plainText, translatedText)] })
          .then(() => console.log('추가완료'))
      } else {
        console.log('현재 데이터, concat => ', result)
        const temp = result.voca.concat(createVoca(plainText, translatedText))
        chrome.storage.local.set({ voca: temp }).then(() => console.log('추가완료'))
      }
    })
    .catch((reject) => {
      console.error(new Error(reject))
    })
}

const callback = function (mutationsList) {
  console.log(mutationsList[0].addedNodes)

  const unknownElm = document.querySelector('deepl-inline-translate-tooltip')

  if (unknownElm !== null) {
    const targetElm = unknownElm.shadowRoot.querySelector('.tooltip-container')

    const addBtn = document.createElement('button')
    const addBtnText = document.createTextNode('add voca')
    addBtn.appendChild(addBtnText)
    targetElm.appendChild(addBtn)

    // 콜백을 넣어주세요. 이벤트 전달이 안됩니다.
    // 매개변수를 함께 전달하면서, 이벤트를 받기 위해서는 이렇게 해야 합니다.
    addBtn.addEventListener('click', (event) => addChromeLocalStroage(event, targetElm))
  }
}

// MutationObserver 객체를 생성
var observer = new MutationObserver(callback)

// 감시 시작
observer.observe(target, config)

export {}
