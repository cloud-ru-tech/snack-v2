import { Button, ButtonGroup } from '@design-system/button';
import { Modal } from '@design-system/modal';
import { useState } from 'react';

import exampleHeaderImage from './exampleHeader.jpg';
import styles from './styles.module.scss';

/** Astro и Vite могут отдавать импорт картинки как `{ src: string }`, а не строку. */
function importedImageSrc(imp: string | { src: string }): string {
  return typeof imp === 'string' ? imp : imp.src;
}

export function ModalBasicExample() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button appearance='primary' label='Открыть модальное окно' view='filled' onClick={() => setOpen(true)} />
      <Modal
        content={<p>Основной контент: форма, предупреждение или поясняющий текст.</p>}
        footer={
          <div className={styles.footerActions}>
            <ButtonGroup
              primaryAction={{ label: 'Продолжить', view: 'filled', onClick: close }}
              secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
            />
          </div>
        }
        media={
          <img
            alt='Иллюстрация в шапке'
            className={styles.image}
            src={importedImageSrc(exampleHeaderImage as string | { src: string })}
          />
        }
        open={open}
        subtitle='Краткое описание действия или контекста'
        title='Заголовок'
        onClose={close}
      />
    </>
  );
}
