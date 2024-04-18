const term = document.querySelector('.terms')
const definition = document.querySelector('.definitions')
const checkButton = document.querySelector('.check')
const nextButton = document.querySelector('.next')
const flashcard = document.querySelector('.flashcard');
words = {
    Hello: 'Namastey',
    Morning: 'subhaprabhat',
    okay:'thik cha',
    notokay:'thik xaina',
    'Thank You':'Dhanyavad',
    Everest:'Sagarmatha'
}
data = Object.entries(words)

function getRandomTerm() {
    randomterm = data[Math.floor(Math.random()* data.length)]
    term.innerHTML = `<h3>${randomterm[0]}</h3>`
    definition.innerHTML = `<h3>${randomterm[1]}</h3>`
}

checkButton.addEventListener('click',function() {
    definition.style.display = 'block';
    term.style.display = 'none';
})

nextButton.addEventListener('click',function() {
    term.style.display = 'block';
    definition.style.display = 'none';
    getRandomTerm()
})
function flipCard(selector) {
    const card = document.querySelector(selector);
    card.classList.toggle('flipped');
  }
