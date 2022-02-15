import { MAX_CHALLENGES } from '../../constants/settings'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Szabályok" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Találd ki a napi szót {MAX_CHALLENGES} tippből! Minden tipp után a
        négyzetek színe jelzi, hogy mennyire kerültél közel a megoldáshoz.
      </p>

      {/* <div className="flex justify-center mb-1 mt-4"> */}
      <div className="grid grid-cols-5 gap-1 mb-1 mt-4">
        <Cell value="L" status="correct" />
        <Cell value="A" />
        <Cell value="K" />
        <Cell value="Á" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Az L betű szerepel a szóban és jó helyen van.
      </p>

      <div className="grid grid-cols-5 gap-1 mb-1 mt-4">
        <Cell value="GY" />
        <Cell value="E" />
        <Cell value="R" status="present" />
        <Cell value="E" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Az R betű szerepel a szóban, de nem jó helyen van.
      </p>

      <div className="grid grid-cols-5 gap-1 mb-1 mt-4">
        <Cell value="A" />
        <Cell value="L" />
        <Cell value="SZ" />
        <Cell value="I" status="absent" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-8">
        Az I betű nem szerepel a szóban.
      </p>

      <p className="italic text-sm text-gray-500 dark:text-gray-300 pb-2">
        Ez egy nyílt forráskódú, magyar változata a Wordle játéknak.
      </p>
      <p className="italic text-sm text-gray-500 dark:text-gray-300 pb-2">
        Nézd meg{' '}
        <a
          href="https://github.com/mdanka/szozat"
          className="underline font-bold"
        >
          a magyar verzió kódját itt.
        </a>
      </p>
      <p className="italic text-sm text-gray-500 dark:text-gray-300 pb-2">
        A szólistát{' '}
        <a
          href="https://gist.github.com/Konstantinusz/f9517357e46fa827c3736031ac8d01c7"
          className="underline font-bold"
        >
          innen
        </a>{' '}
        szereztük.
      </p>
      <p className="italic text-sm text-gray-500 dark:text-gray-300 pb-2">
        Az angol verzió klónjának{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          a kódját itt találod.
        </a>
      </p>
      <p className="italic text-sm text-gray-500 dark:text-gray-300 pb-2">
        Az eredeti játékot pedig{' '}
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          className="underline font-bold"
        >
          itt kipróbálhatod.
        </a>
      </p>
      <p className="italic text-sm text-gray-500 dark:text-gray-300">
        A magyar verzió tech múzsája <strong>Vőfély Rozi</strong>, a programozói
        módosításokat pedig <strong>Danka Miklós</strong> végezte.
      </p>
    </BaseModal>
  )
}
