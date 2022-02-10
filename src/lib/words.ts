import { WORDS } from '../constants/wordlist'
import { CharValue, Word } from './statuses'
import { isEqual } from 'lodash'
import { getWordLetters } from './hungarianWordUtils'
import { VALID_GUESSES } from '../constants/validGuesses'
import {
  getDecodedHashParam,
  HASH_PARAM_KEY_CREATOR,
  HASH_PARAM_KEY_SOLUTION,
} from './hashUtils'
import { getGuessStatuses } from './statuses'

export const isWordEqual = (word1: Word, word2: Word) => {
  return isEqual(word1, word2)
}

export const isWordInWordList = (word: Word) => {
  return (
    WORDS.some((validWord) => isWordEqual(word, validWord)) ||
    VALID_GUESSES.some((validWord) => isWordEqual(word, validWord))
  )
}

export const isWinningWord = (word: Word) => {
  return isWordEqual(solution, word)
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: Word, guesses: Word[]) => {
  const knownLetterSet = new Set<CharValue>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `A(z) ${guess[i]} betűnek a(z) ${i + 1}. pozícióban kell lennie.`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `A(z) ${letter} betűnek is szerepelnie kell a szóban.`
    }
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const indexModulo = index % WORDS.length
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[indexModulo],
    solutionIndex: indexModulo,
    tomorrow: nextday,
  }
}

export const getWordFromUrl = () => {
  const customSolution = getDecodedHashParam(HASH_PARAM_KEY_SOLUTION)
  if (customSolution === undefined) {
    return undefined
  }
  const customCreator =
    getDecodedHashParam(HASH_PARAM_KEY_CREATOR) ?? 'ismeretlen szerző'
  const customWord = getWordLetters(customSolution).map((char) =>
    char.toUpperCase()
  ) as Word
  if (customWord.length !== 5) {
    return undefined
  }
  return {
    solution: customWord,
    solutionCreator: customCreator,
  }
}

export const getCurrentWord = () => {
  const wordFromUrl = getWordFromUrl()
  const wordOfDay = getWordOfDay()
  if (wordFromUrl !== undefined) {
    return {
      ...wordFromUrl,
      solutionIndex: undefined,
      tomorrow: undefined,
    }
  }
  return {
    ...wordOfDay,
    solutionCreator: undefined,
  }
}

export const { solution, solutionIndex, solutionCreator, tomorrow } =
  getCurrentWord()
