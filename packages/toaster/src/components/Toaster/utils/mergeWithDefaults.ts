import { TOASTER_CONTAINER_DEFAULTS, TOASTER_CONTAINER_PREFIX } from '../../../constants';
import { ToasterContainerProps } from '../../../types';

export type MergedToasterProps = Required<
  Pick<ToasterContainerProps, 'type' | 'position' | 'limit' | 'displayCloseAllButton' | 'width' | 'containerId'>
> &
  Pick<ToasterContainerProps, 'stacked' | 'draggable' | 'draggableDirection'>;

export function mergeWithDefaults(props: ToasterContainerProps): MergedToasterProps {
  const defaults = TOASTER_CONTAINER_DEFAULTS[props.type];
  return {
    type: props.type,
    position: props.position ?? defaults.position,
    limit: props.limit ?? defaults.limit,
    displayCloseAllButton: props.displayCloseAllButton ?? defaults.displayCloseAllButton,
    width: props.width ?? defaults.width,
    containerId: props.containerId ?? `${TOASTER_CONTAINER_PREFIX}${props.type}`,
    stacked: props.stacked,
    draggable: props.draggable,
    draggableDirection: props.draggableDirection,
  };
}
