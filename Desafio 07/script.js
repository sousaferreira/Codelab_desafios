const grid = document.querySelector('.grid')

const characters = ['1','2', '3','4','5','6','7','8','9']

const createElement = (tag, className)=>{
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''


const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card')
    if (disableCards.length === characters.length * 2) {
        document.getElementById('winModal').classList.remove('hidden')
    }
}

const checkCard = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter) {
        
        
        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')

        firstCard = ''
        secondCard = ''

        
        checkEndGame()
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        }, 500)
    }
}


 const revealCard = ({target}) =>{
    if (target.parentNode.className.includes('reveal-card')){
        return;
    }
    if (firstCard == ''){
        target.parentNode.classList.add('reveal-card')
        firstCard =target.parentNode
    }else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card')
        secondCard  =target.parentNode

        checkCard()
    }
    


}
const createCard = (character) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    card.addEventListener('click', revealCard)

    front.style.backgroundImage = `url('./img/${character}.svg')`

    card.appendChild(front)
    card.appendChild(back)
    card.setAttribute('data-character', character)
    
    return card
}

const loadGame = () =>{
    const duplicatecharacters = [...characters, ...characters]
    const embaralharArray = duplicatecharacters.sort(()=> Math.random()-0.5)
      

        embaralharArray.forEach((character)=>{
        const card = createCard(character)
        grid.appendChild(card)
    })
}

function restartGame(){
    
    firstCard = ''
    secondCard = ''
    grid.innerHTML = ''
    loadGame()
    document.getElementById('winModal').classList.add('hidden')
}
loadGame()