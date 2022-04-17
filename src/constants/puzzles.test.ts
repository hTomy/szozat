import puzzles from './hungarian-puzzles.json'
import words from './hungarian-word-letter-list.json'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

test('there are no duplicate puzzles', () => {
  const puzzleCount: { [puzzle: string]: number } = {}
  puzzles.forEach((puzzle) => {
    const puzzleWord = puzzle.join('')
    puzzleCount[puzzleWord] =
      puzzleCount[puzzleWord] === undefined ? 1 : puzzleCount[puzzleWord] + 1
  })
  const repeatedPuzzles = Object.entries(puzzleCount)
    .filter(([_, count]) => count > 1)
    .map(([word, _]) => word)
  expect(repeatedPuzzles).toStrictEqual([])
})

test('all puzzles are included in the word list', () => {
  const wordSet = new Set<string>()
  words.forEach((word) => {
    const wordString = word.join('')
    wordSet.add(wordString)
  })
  const missingWords = puzzles
    .map((puzzle) => puzzle.join(''))
    .filter((puzzleString) => !wordSet.has(puzzleString))
  expect(missingWords).toStrictEqual([])
})
