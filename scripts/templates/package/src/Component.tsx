import type { HTMLAttributes } from 'react'
import styles from './styles.module.scss'

export interface {{COMPONENT_NAME}}Props extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined'
}

export function {{COMPONENT_NAME}}({
  variant = 'default',
  className,
  children,
  ...props
}: {{COMPONENT_NAME}}Props) {
  const classes = [styles.root, styles[variant], className].filter(Boolean).join(' ')

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  )
}
