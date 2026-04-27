import React, { useState } from 'react'
import './AirportsQuiz.css'
import { generateQuestion } from '../../utils/generateQuestion'

const AirportsQuiz = () => {
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState({})

  //USE EFFECT

  React.useEffect(() => {
    const firstQuestion = generateQuestion()
    setCurrentQuestion(firstQuestion)
  }, [attempts])

  console.log(currentQuestion)

  return (
    <div>
      <h1>Airports Quiz</h1>
      <div></div>
    </div>
  )
}

export default AirportsQuiz
