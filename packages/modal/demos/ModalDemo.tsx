import { Button, ButtonGroup } from '@ds/button';
import { Modal, ModalProps } from '@ds/modal';
import { useState } from 'react';

import modalDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

type DemoProps = Pick<ModalProps, 'mode' | 'width' | 'title' | 'subtitle' | 'content' | 'loading' | 'heightAuto'>;

function ModalPreview(props: DemoProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div>
      <Button label='Открыть модальное окно' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Modal
        {...props}
        open={open}
        onClose={close}
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Подтвердить', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </div>
  );
}

export function ModalDemo() {
  return (
    <Canvas
      component={ModalPreview}
      componentName='Modal'
      componentDoc={modalDoc.Modal}
      defaultProps={{
        mode: 'regular',
        width: 's',
        title: 'Заголовок',
        subtitle: 'Подзаголовок',
        content: 'Основной контент тела модалки.',
        heightAuto: true,
        loading: false,
      }}
      controls={{
        mode: { type: 'select', options: ['regular', 'aggressive', 'forced'] },
        width: { type: 'select', options: ['s', 'm', 'l'] },
        title: { type: 'text' },
        subtitle: { type: 'text' },
        content: { type: 'text' },
        heightAuto: { type: 'boolean' },
        loading: { type: 'boolean' },
      }}
      excludeProps={[
        'open',
        'onClose',
        'footer',
        'media',
        'onBackButtonClick',
        'container',
        'closeOnPopstate',
        'rootClassName',
        'className',
        'loadingState',
        'slotAfterHeadline',
        'truncate',
      ]}
    />
  );
}
