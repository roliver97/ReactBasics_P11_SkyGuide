import { shuffleAndPick } from './shuffleAndPick'
import airportsLocalData from '../data/airports-spain/airports-spain.json'

export const generateQuestion = () => {
  const categories = [
    'most-affluence',
    'guess-airport',
    'guess-iata',
    'airport-type'
  ]
  const selectedCategory = shuffleAndPick(categories, 1)[0]
  const rawOptions = [...airportsLocalData]

  switch (selectedCategory) {
    case 'most-affluence': {
      const filteredByTraffic = rawOptions.filter((a) => a.traffic?.passengers)
      const possibleOptions = shuffleAndPick(filteredByTraffic, 3)
      const sortedOptions = [...possibleOptions].sort((a, b) => {
        return b.traffic.passengersRaw - a.traffic.passengersRaw
      })
      const correctAnswer = sortedOptions[0]

      return {
        category: 'Most Affluence',
        questionText:
          'Which of these airports had the most passengers in 2025?',
        image: null,
        options: possibleOptions,
        correctAnswer
      }
    }

    case 'guess-airport': {
      const filteredByImage = rawOptions.filter((a) => a.image)
      const possibleOptions = shuffleAndPick(filteredByImage, 3)
      const correctAnswer = shuffleAndPick(possibleOptions, 1)[0]
      return {
        category: 'Guess the Airport',
        questionText: 'Which airport does this image correspond to?',
        image: correctAnswer.image,
        options: possibleOptions,
        correctAnswer
      }
    }
    case 'guess-iata': {
      const filteredByIata = rawOptions.filter((a) => a.iata)
      const possibleOptions = shuffleAndPick(filteredByIata, 3)
      const correctAnswer = shuffleAndPick(possibleOptions, 1)[0]

      return {
        category: 'Guess IATA Code',
        questionText: `Which airport does the IATA code ${correctAnswer.iata} belong to?`,
        options: possibleOptions,
        correctAnswer
      }
    }
    case 'airport-type': {
      const airportTypes = [
        'International Hub',
        'Regional Gateway',
        'Island Gateway',
        'Domestic Gateway',
        'Military Airbase',
        'Cargo Hub'
      ]

      const filteredByType = rawOptions.filter((a) => a.type)
      const correctAnswer = shuffleAndPick(filteredByType, 1)[0]

      const otherTypes = airportTypes.filter((t) => t !== correctAnswer.type)
      const distractors = shuffleAndPick(otherTypes, 2)

      const possibleOptions = shuffleAndPick(
        [correctAnswer.type, ...distractors],
        3
      )

      return {
        category: 'Guess the Airport Type',
        questionText: `What type of airport is ${correctAnswer.name}?`,
        options: possibleOptions,
        correctAnswer: correctAnswer.type
      }
    }
  }
}

export const checkIsCorrect = (selectedOption, currentQuestion) => {
  const answerText =
    typeof selectedOption === 'string' ? selectedOption : selectedOption.name
  const correctText =
    typeof currentQuestion.correctAnswer === 'string'
      ? currentQuestion.correctAnswer
      : currentQuestion.correctAnswer.name

  return answerText === correctText
}
