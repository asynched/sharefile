import { CSSProperties } from 'react'
import styles from 'src/components/spinners/Spinner.module.css'

type SpinnerProps = {
  mode?: 'dark' | 'light'
}

export default function Spinner({ mode = 'light' }: SpinnerProps) {
  return (
    <span
      className={styles.loader}
      style={
        {
          '--color': mode === 'dark' ? '#fff' : '#000',
        } as CSSProperties
      }
    ></span>
  )
}
