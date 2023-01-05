// HTML Imports
const password = document.getElementById('password')
const length = document.getElementById('length')
const range = document.getElementById('myRange')
const generateBtn = document.getElementById('btn')
const copyToClipboard = document.getElementById('copy-password')
const refreshBtn = document.getElementById('refresh-btn')
const upperCase = document.getElementById('toggle-btn-1')
const lowerCase = document.getElementById('toggle-btn-2')
const numbers = document.getElementById('toggle-btn-3')
const symbols = document.getElementById('toggle-btn-4')

// Utitity Variables/Objects
const settingObj = {
  upper: getRandomUpper,
  lower: getRandomLower,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
}
let passwordLength = 0
let hasUpperCase = true
let hasLowerCase = true
let hasNumbers = false
let hasSymbols = false

let isGenerated = false

// Event Listeners
range.addEventListener('input', (e) => {
  length.textContent = e.target.value
})

generateBtn.addEventListener('click', () => {
  passwordLength = +length.textContent
  hasUpperCase = upperCase.checked
  hasLowerCase = lowerCase.checked
  hasNumbers = numbers.checked
  hasSymbols = symbols.checked
  const newPassword = generatePassword(
    passwordLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSymbols
  )

  if (newPassword != '') {
    password.textContent = newPassword
  } else password.textContent = 'PASSWORD'

  isGenerated = true
  copyToClipboard.classList.add('allowed')
})

refreshBtn.addEventListener('click', () => {
  passwordLength = +length.textContent
  hasUpperCase = upperCase.checked
  hasLowerCase = lowerCase.checked
  hasNumbers = numbers.checked
  hasSymbols = symbols.checked
  const newPassword = generatePassword(
    passwordLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSymbols
  )
  if (newPassword != '') {
    password.textContent = newPassword
  } else password.textContent = 'PASSWORD'
})

copyToClipboard.addEventListener('click', () => {
  if (isGenerated || password.textContent != 'PASSWORD') {
    navigator.clipboard.writeText(password.textContent)
    document.body.classList.add('active-popup')
    setTimeout(() => {
      document.body.classList.remove('active-popup')
    }, 1000)
  }
})

// Utility Functions
function generatePassword(length, upper, lower, numbers, symbols) {
  let newPassword = ''
  const settingCount = upper + lower + numbers + symbols
  if (settingCount === 0) {
    return ''
  }

  const settingArr = [{ upper }, { lower }, { numbers }, { symbols }].filter(
    (obj) => Object.values(obj)[0]
  )

  for (let i = 0; i < length; i += settingCount) {
    const shuffledArray = settingArr.slice().sort((a, b) => Math.random() - 0.5)

    shuffledArray.forEach((input) => {
      const setting = Object.keys(input)[0]
      newPassword += settingObj[setting]()
    })
  }
  const finalPassword = newPassword.slice(0, length)

  return finalPassword
}

function getRandomUpper() {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return upper[Math.floor(Math.random() * upper.length)]
}

function getRandomLower() {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  return lower[Math.floor(Math.random() * lower.length)]
}

function getRandomNumber() {
  const numbers = '0123456789'
  return numbers[Math.floor(Math.random() * numbers.length)]
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
