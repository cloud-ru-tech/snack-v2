import { figmaDesignUrl, figmaEmbedUrl, FigmaNodeRef } from '../lib/figma';
import styles from './StorybookEmbed.module.scss';

type FigmaEmbedProps = {
  node: FigmaNodeRef | undefined;
  height?: number;
  title?: string;
};

const DEFAULT_HEIGHT = 420;

export function FigmaEmbed({ node, height = DEFAULT_HEIGHT, title = 'Figma' }: FigmaEmbedProps) {
  if (!node) return null;
  const src = figmaEmbedUrl(node);
  const openUrl = figmaDesignUrl(node);

  return (
    <div className={styles.wrap}>
      <iframe
        className={styles.frame}
        src={src}
        title={title}
        loading='lazy'
        allow='clipboard-read; clipboard-write'
        allowFullScreen
        style={{ height }}
      />
      <div className={styles.footer}>
        <a className={styles.link} href={openUrl} target='_blank' rel='noopener noreferrer'>
          Открыть в Figma →
        </a>
      </div>
    </div>
  );
}
