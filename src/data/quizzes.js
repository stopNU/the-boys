import { beerQuestions } from './beerQuiz'
import { sofiaQuestions } from './sofiaQuiz'

// To add a new quiz, create a questions file like sofiaQuiz.js and list it here.
export const quizzes = [
  {
    id: 'beer',
    emoji: '🍺',
    title: 'Beer Quiz',
    description: 'Hops, yeast, stouts and growlers — 20 questions on beer.',
    questions: beerQuestions,
  },
  {
    id: 'sofia',
    emoji: '🇧🇬',
    title: 'Sofia Quiz',
    description: 'Bulgaria, Sofia, Stoichkov and rakia — 20 questions on the motherland.',
    questions: sofiaQuestions,
  },
]
