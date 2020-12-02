const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Name the worlds biggest island.',
        answers: [
            { text: 'Greenland', correct: true },
            { text: 'New Guinea', correct: false }
        ]
    },
    {
        question: 'What is the painting La Gioconda more usually known as?',
        answers: [
            { text: 'Salvator Mundi', correct: false },
            { text: 'Massacre of the Innocents', correct: false },
            { text: 'The Mona Lisa', correct: true },
            { text: 'The Scream', correct: false }
        ]
    },
    {
        question: 'What is the diameter of Earth?',
        answers: [
            { text: '7,000', correct: false },
            { text: '8,000 miles', correct: true },
            { text: '16,000', correct: false },
            { text: '5,000', correct: false }
        ]
    },
    {
        question: 'Who is Barcelona FC greatest Scorer',
        answers: [
            { text: 'Joan Gamper', correct: false },
            { text: 'Johan Cruyff', correct: false },
            { text: 'Luis Suarez', correct: false },
            { text: 'Leo Messi', correct: true }
        ]
    }
]
