const term = document.querySelector('.terms')
const definition = document.querySelector('.definitions')
const checkButton = document.querySelector('.check')
const nextButton = document.querySelector('.next')

let flashCardId = 1
async function fetchDataFromAPI (flashCardId) {
  try {
    const response = await axios.get(`/api/flashcards/${flashCardId}`)
    const flashcard = response.data
    term.innerHTML = `<h3>${flashcard.word}</h3>`
    definition.innerHTML = `<h3>${flashcard.meaning}</h3>`
  } catch (error) {
    console.error('Error fetching flashcard:', error)
  }
}

checkButton.addEventListener('click', function () {
  definition.style.display = 'block'
  term.style.display = 'none'
})

nextButton.addEventListener('click', function () {
  term.style.display = 'block'
  definition.style.display = 'none'
  fetchDataFromAPI(flashCardId)
  flashCardId++
})
function flipCard (selector) {
  const card = document.querySelector(selector)
  card.classList.toggle('flipped')
}
