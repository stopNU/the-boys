import { beerQuestions } from './beerQuiz'
import { sofiaQuestions } from './sofiaQuiz'
import { balkanQuestions } from './balkanQuiz'
import { putinQuestions } from './putinQuiz'
import { spiritsQuestions } from './spiritsQuiz'
import { weirdHistoryQuestions } from './weirdHistoryQuiz'

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
  {
    id: 'balkans',
    emoji: '🏰',
    title: 'Russia & the Balkans',
    description: 'From the Tsar Liberator to Buzludzha — history and Balkan trivia.',
    questions: balkanQuestions,
  },
  {
    id: 'putin',
    emoji: '🐻',
    title: 'The Putin Quiz',
    description: 'KGB, judo, cranes and one very long table.',
    questions: putinQuestions,
  },
  {
    id: 'spirits',
    emoji: '🥃',
    title: 'Spirits & Cocktails',
    description: 'Rakia, whiskey and what’s actually in a negroni.',
    questions: spiritsQuestions,
  },
  {
    id: 'weird-history',
    emoji: '🤪',
    title: 'Weird History',
    description: 'Emu wars, beer floods and other 100% true nonsense.',
    questions: weirdHistoryQuestions,
  },
]
