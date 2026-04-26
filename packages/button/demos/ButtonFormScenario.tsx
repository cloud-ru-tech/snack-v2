import { Button } from '@ds/button'
import { FormEvent, useState } from 'react'

import styles from './ButtonFormScenario.module.scss'

type Status = 'idle' | 'submitting' | 'success'

export function ButtonFormScenario() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1200)
  }

  const reset = () => {
    setEmail('')
    setStatus('idle')
  }

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={submit}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type='email'
            className={styles.input}
            value={email}
            disabled={status !== 'idle'}
            placeholder='you@company.com'
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <div className={styles.actions}>
          <Button
            type='submit'
            appearance='primary'
            view='filled'
            label={status === 'success' ? 'Отправлено' : 'Подписаться'}
            loading={status === 'submitting'}
            disabled={!email && status === 'idle'}
          />
          <Button
            type='button'
            appearance='neutral'
            view='simple'
            label='Отмена'
            disabled={status === 'submitting'}
            onClick={reset}
          />
        </div>

        {status === 'success' && (
          <p className={styles.success} role='status'>
            Спасибо! Мы отправили письмо на <strong>{email}</strong>.
          </p>
        )}
      </form>
    </div>
  )
}
