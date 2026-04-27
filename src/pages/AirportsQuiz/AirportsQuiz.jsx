import React, { useState } from 'react'
import './AirportsQuiz.css'
import { generateQuestion } from '../../utils/quizLogic'
import { checkIsCorrect } from '../../utils/quizLogic'

const AirportsQuiz = () => {
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  //USE EFFECT
  React.useEffect(() => {
    const firstQuestion = generateQuestion()
    setCurrentQuestion(firstQuestion)
  }, [attempts])

  const handleAnswer = (selectedOption) => {
    const isCorrect = checkIsCorrect(selectedOption, currentQuestion)
    const id =
      typeof selectedOption === 'string' ? selectedOption : selectedOption.id
    setSelectedAnswer(id)

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1)
      }
      setAttempts(attempts + 1)
      setSelectedAnswer(null)
    }, 800)
  }

  return (
    <div className='airports-quiz-page flex-container'>
      <div className='airports-quiz-titles flex-container'>
        <h1>Airports Quiz</h1>
      </div>
      <div className='quiz-container wrapper'>
        {currentQuestion.image ? (
          <img
            className='quiz-image'
            src={currentQuestion.image}
            alt='Current question airport image'
          />
        ) : (
          ''
        )}

        <div className='quiz-results'>
          <div className='quiz-results-score'>
            Score: <span>{score}</span>
          </div>
          <div className='quiz-results-attempts'>
            Attemps: <span>{attempts}</span>
          </div>
        </div>

        <div className='quiz-text-container'>
          <div className='quiz-category'>
            <h2>{currentQuestion.category}</h2>
          </div>
          <div className='quiz-question'>{currentQuestion.questionText}</div>

          <div className='quiz-options'>
            {currentQuestion.options?.map((opt, index) => {
              const id = typeof opt === 'string' ? opt : opt.id
              let buttonClass = 'option-button'
              if (selectedAnswer === id) {
                buttonClass += checkIsCorrect(opt, currentQuestion)
                  ? ' correct'
                  : ' incorrect'
              }
              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswer(opt)}
                  disabled={selectedAnswer !== null}
                >
                  {typeof opt === 'string' ? opt : opt.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirportsQuiz
