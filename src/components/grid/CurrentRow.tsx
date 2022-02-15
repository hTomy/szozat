import { Word } from '../../lib/statuses'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'

type Props = {
  guess: Word
  className: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - guess.length))
  const classes = `grid grid-cols-${MAX_WORD_LENGTH} gap-1 ${className}`

  return (
    <div className={classes}>
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
