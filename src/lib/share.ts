import { getGuessStatuses, Word } from './statuses'
import { solutionIndex, solutionCreator } from './words'
import { GAME_TITLE } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'

export const getPuzzleName = () => {
  return solutionCreator !== undefined
    ? 'Jelige: ' + solutionCreator
    : solutionIndex + '. nap'
}

export const getShareText = (guesses: Word[], lost: boolean) => {
  const identifier = getPuzzleName()
  const text =
    `${GAME_TITLE} - ${identifier} - ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}\n\n` +
    generateEmojiGrid(guesses) +
    `\n\n${window.location.href}`
  return text
}

export const shareStatus = async (guesses: Word[], lost: boolean) => {
  const text = getShareText(guesses, lost)
  if (navigator?.share != null) {
    await navigator.share({ text })
    return { type: 'share' as const }
  }
  if (navigator?.clipboard?.writeText != null) {
    await navigator.clipboard.writeText(text)
    return { type: 'clipboard' as const }
  }
  throw new Error('No sharing methods are available')
}

export const generateEmojiGrid = (guesses: Word[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
