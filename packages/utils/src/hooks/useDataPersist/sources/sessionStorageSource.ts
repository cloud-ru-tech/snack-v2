import { isBrowser } from '../../../utils';
import { BaseSource } from './baseSource';

export class SessionStorageSource<TData> extends BaseSource<TData> {
  getFromSource(): string {
    if (isBrowser()) {
      return sessionStorage.getItem(this.filterKey) || '';
    }
    return '';
  }

  setToSource(value: string): void {
    if (isBrowser()) {
      sessionStorage.setItem(this.filterKey, value);
    }
  }
}
