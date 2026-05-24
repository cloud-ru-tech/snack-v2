import { HTMLAttributes } from 'react'

import { VARIANT } from './constants'
import styles from './styles.module.scss'
import { Variant } from './types'

export type {{COMPONENT_NAME}}Props = HTMLAttributes<HTMLDivElement> & {
  /** Визуальный вариант контейнера. */
  variant?: Variant
}

export function {{COMPONENT_NAME}}({
  variant = VARIANT.Default,
  className,
  children,
  ...rest
}: {{COMPONENT_NAME}}Props) {
  return (
    <div {...rest} className={[styles.root, className].filter(Boolean).join(' ')} data-variant={variant}>
      {children}
    </div>
  )
}
