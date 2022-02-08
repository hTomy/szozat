import { getGuessStatuses, Word } from '../../lib/statuses'
import { Cell } from './Cell'
import { MAX_WORD_LENGTH } from '../../constants/settings'

type Props = {
  guess: Word
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className={`grid grid-cols-${MAX_WORD_LENGTH} gap-1`}>
      {guess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
