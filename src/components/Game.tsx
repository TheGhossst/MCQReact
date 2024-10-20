"use client"

import { useState, useEffect } from 'react'
import '../styles/Game.css'
import questionsData from '../data/questions.json'

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

export function Game() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    selectRandomQuestions()
  }, [])

  const selectRandomQuestions = () => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 5))
  }

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const restartGame = () => {
    selectRandomQuestions()
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <div className="game-container">
        <h2>Game Over!</h2>
        <p>Your final score is:</p>
        <p className="final-score">{score} / {questions.length}</p>
        <button onClick={restartGame} className="restart-button">
          Play Again
        </button>
      </div>
    )
  }

  if (questions.length === 0) {
    return <div className="game-container">Loading...</div>
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="game-container">
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <p className="question-text">{currentQuestion.text}</p>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="option-button"
          >
            {option}
          </button>
        ))}
      </div>
      <p className="score">Score: {score}</p>
    </div>
  )
}
