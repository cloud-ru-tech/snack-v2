import { Scroll } from '@ds/scroll';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent } from 'react';

import { TEST_IDS } from '../../constants';
import { ToastUploadFileLine } from '../../helperComponents/ToastUploadFileLine';
import { ToastUploadTitleLine } from '../../helperComponents/ToastUploadTitleLine';
import styles from './styles.module.scss';
import { ToastUploadProps } from './types';

export function ToastUpload({
  status,
  title,
  description,
  closeToast,
  onCloseClick,
  closable = true,
  className,
  files,
  collapsed,
  onCollapsed,
  generalActions,
  onCancelAll,
  progress,
  ...rest
}: ToastUploadProps) {
  const [isCollapsed, setIsCollapsed] = useValueControl({
    value: collapsed,
    defaultValue: false,
    onChange: onCollapsed,
  });

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCloseClick) {
      onCloseClick(e, closeToast);
    } else {
      closeToast?.();
    }
  };

  const handleCollapseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.uploadRoot}
      data-collapsed={isCollapsed || undefined}
    >
      <ToastUploadTitleLine
        status={status}
        title={title ?? ''}
        description={description}
        progress={progress}
        isCollapsed={Boolean(isCollapsed)}
        onCollapseClick={handleCollapseClick}
        onCloseClick={handleCloseClick}
        closable={closable}
        generalActions={generalActions}
        onCancelAll={onCancelAll}
      />

      {!isCollapsed && (
        // TODO(FF-8311): полосы скролла должны рендериться в тёмной теме независимо
        // от темы сайта (карточка тоста всегда на invertNeutral-поверхности).
        // Варианты: (a) scoped-remap `--sn-theme-color-*` на `invert*` только для
        // `.os-scrollbar`-сиблингов; (b) `.sn-dark` на обёртку + reset темы на
        // viewport через `useThemeContext()`. Требует ThemeProvider в дереве.
        <div className={styles.listWrapper}>
          <Scroll
            className={styles.list}
            size='s'
            data-test-id={TEST_IDS.uploadList}
            barHideStrategy='never'
            overflow={{ x: 'hidden' }}
          >
            {files.map(item => (
              // Стабильный key: при наличии `item.id` используем его, иначе
              // комбинация `title`+`formattedSize` (UploadItem требует оба).
              // index сюда не подмешиваем — иначе при reorder ключ съезжает и
              // подписки на статус (subscribeToState) обнуляются.
              <ToastUploadFileLine key={item.id ?? `${item.title}__${item.formattedSize}`} item={item} />
            ))}
          </Scroll>
        </div>
      )}
    </div>
  );
}
