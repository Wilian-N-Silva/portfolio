const header = document.querySelector('header');
const navbar = header.querySelector('nav')
const btn_navigation = document.getElementById('btn-navigation-toggle')

function handleNavbarTransparency() {
  const headerTopOff = header.offsetTop;
  const headerHeight = header.clientHeight;

  if (navbar.classList.contains('active')) {
    header.classList.add('bg-active');
  } else {
    if (headerTopOff <= headerHeight) {
      header.classList.remove('bg-active');
    } else if (!header.classList.contains('bg-active')) {
      header.classList.add('bg-active');
    }
  }
}

function handleNavbar() {
  navbar.classList.toggle('active')
  handleNavbarTransparency()
}

btn_navigation.addEventListener('click', handleNavbar)
document.addEventListener('scroll', handleNavbarTransparency)

const supportedLocales = ['pt', 'en']

const languageSwitch = document.querySelector("#btn-language-selector")

let translation

// document.addEventListener("DOMContentLoaded", () => {
//   languageSwitch.replaceChildren("")

//   Object.entries(supportedLocales).forEach(([key, value]) => {
//     const option = document.createElement("option")
//     option.value = key
//     option.innerText = value
//     languageSwitch.append(option)
//   })
// })

languageSwitch.addEventListener("click", (event) => {
  const newLocale = languageSwitch.dataset.i18nCurrent === 'pt' ? 'en' : 'pt'
  languageSwitch.dataset.i18nCurrent = newLocale

  const buttonSpan = languageSwitch.querySelectorAll('span[data-i18n-option]')

  for (let index = 0; index < buttonSpan.length; index++) {
    buttonSpan[index].classList.remove('active')

    if (buttonSpan[index].dataset.i18nOption === newLocale) {
      buttonSpan[index].classList.add('active')
    }
  }

  changeLocale(newLocale)
})

async function fetchTranslationOf(locale) {
  const langPath = `./assets/lang/${locale}.json`
  const response = await fetch(langPath)

  return await response.json()
}

async function changeLocale(newLocale) {
  translation = await fetchTranslationOf(newLocale)
  translatePage()
}

function translatePage() {
  const i18nKeys = document.querySelectorAll("[data-i18n-key]")

  document.documentElement.lang = `${translation['language-code']}-${translation['country-code']}`

  i18nKeys.forEach((element) => {
    const key = element.getAttribute('data-i18n-key')
    element.innerHTML = translation['strings'][key]
  })
}