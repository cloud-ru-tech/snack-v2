/**
 * Глобальный менеджер темы для документации
 * Синхронизирует тему между страницами и Storybook iframe
 */

export type Theme = 'light' | 'dark';
export type Brand = 'brandA' | 'brandB';
export type Platform = 'desktop' | 'mobile';

const STORAGE_KEYS = {
  THEME: 'sn-theme',
  BRAND: 'sn-brand',
  PLATFORM: 'sn-platform',
} as const;

const DEFAULTS = {
  THEME: 'light' as Theme,
  BRAND: 'brandA' as Brand,
  PLATFORM: 'desktop' as Platform,
} as const;

class ThemeManager {
  private theme: Theme;
  private brand: Brand;
  private platform: Platform;

  constructor() {
    // Загружаем сохраненные значения или используем defaults
    // Сначала проверяем Starlight тему, если она есть - используем её
    this.theme = this.loadThemeFromStorage();
    this.brand = this.loadFromStorage(STORAGE_KEYS.BRAND, DEFAULTS.BRAND);
    this.platform = this.loadFromStorage(STORAGE_KEYS.PLATFORM, DEFAULTS.PLATFORM);
  }

  /**
   * Загружает тему с учетом Starlight
   */
  private loadThemeFromStorage(): Theme {
    if (typeof window === 'undefined') return DEFAULTS.THEME;

    try {
      // Проверяем сначала нашу тему
      const snTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (snTheme === 'light' || snTheme === 'dark') {
        return snTheme;
      }

      // Если нет нашей темы, проверяем Starlight
      const starlightTheme = localStorage.getItem('starlight-theme');
      if (starlightTheme === 'light' || starlightTheme === 'dark') {
        return starlightTheme;
      }

      // Проверяем data-theme на html
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      if (htmlTheme === 'light' || htmlTheme === 'dark') {
        return htmlTheme;
      }
    } catch {
      // Игнорируем ошибки
    }

    return DEFAULTS.THEME;
  }

  private loadFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const stored = localStorage.getItem(key);
      return (stored as T) || defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private saveToStorage(key: string, value: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  }

  /**
   * Применяет все классы к body и синхронизирует с Starlight
   */
  applyClasses(): void {
    if (typeof document === 'undefined') return;

    const body = document.body;
    if (!body) return;

    // Удаляем старые классы темы, бренда и платформы
    body.classList.remove('sn-light', 'sn-dark');
    body.classList.remove('sn-brandA', 'sn-brandB');
    body.classList.remove('sn-desktop', 'sn-mobile');

    // Базовые классы (всегда применяются)
    body.classList.add('sn-primitive', 'sn-figmaStyles', 'sn-components');

    // Применяем текущие значения
    body.classList.add(`sn-${this.theme}`);
    body.classList.add(`sn-${this.brand}`);
    body.classList.add(`sn-${this.platform}`);

    // Обновляем data-атрибуты для возможного использования в CSS
    body.dataset.theme = this.theme;
    body.dataset.brand = this.brand;
    body.dataset.platform = this.platform;

    // Синхронизируем с темой Starlight
    this.syncStarlightTheme();
  }

  /**
   * Синхронизирует тему с Starlight
   */
  private syncStarlightTheme(): void {
    if (typeof document === 'undefined') return;

    const htmlElement = document.documentElement;

    // Устанавливаем data-theme на html элемент (используется Starlight)
    htmlElement.setAttribute('data-theme', this.theme);

    // Сохраняем в localStorage для Starlight
    // Starlight использует ключ "starlight-theme"
    try {
      localStorage.setItem('starlight-theme', this.theme);
    } catch (error) {
      console.warn('Failed to sync Starlight theme:', error);
    }

    // Обновляем CSS классы для Starlight (если они используются)
    htmlElement.classList.remove('theme-light', 'theme-dark');
    htmlElement.classList.add(`theme-${this.theme}`);
  }

  /**
   * Устанавливает тему
   */
  setTheme(theme: Theme): void {
    this.theme = theme;
    this.saveToStorage(STORAGE_KEYS.THEME, theme);
    this.applyClasses();
    this.notifyIframes();
    this.dispatchEvent('themeChange', theme);
  }

  /**
   * Устанавливает бренд
   */
  setBrand(brand: Brand): void {
    this.brand = brand;
    this.saveToStorage(STORAGE_KEYS.BRAND, brand);
    this.applyClasses();
    this.notifyIframes();
    this.dispatchEvent('brandChange', brand);
  }

  /**
   * Устанавливает платформу
   */
  setPlatform(platform: Platform): void {
    this.platform = platform;
    this.saveToStorage(STORAGE_KEYS.PLATFORM, platform);
    this.applyClasses();
    this.notifyIframes();
    this.dispatchEvent('platformChange', platform);
  }

  /**
   * Получает текущую тему
   */
  getTheme(): Theme {
    return this.theme;
  }

  /**
   * Получает текущий бренд
   */
  getBrand(): Brand {
    return this.brand;
  }

  /**
   * Получает текущую платформу
   */
  getPlatform(): Platform {
    return this.platform;
  }

  /**
   * Отправляет сообщения всем iframe на странице для синхронизации темы
   */
  private notifyIframes(): void {
    if (typeof window === 'undefined') return;

    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        iframe.contentWindow?.postMessage(
          {
            type: 'theme-sync',
            theme: this.theme,
            brand: this.brand,
            platform: this.platform,
          },
          '*'
        );
      } catch (error) {
        // Cross-origin iframe, игнорируем
      }
    });
  }

  /**
   * Отправляет custom event для других скриптов
   */
  private dispatchEvent(type: string, value: string): void {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(
      new CustomEvent(type, {
        detail: { value },
      })
    );
  }

  /**
   * Инициализирует менеджер темы
   */
  init(): void {
    this.applyClasses();

    // Слушаем сообщения от iframe (например, когда тема меняется в Storybook)
    if (typeof window !== 'undefined') {
      window.addEventListener('message', (event) => {
        if (event.data?.type === 'theme-sync-request') {
          this.notifyIframes();
        }
      });

      // Слушаем изменения темы от Starlight (если пользователь использует встроенный переключатель)
      this.observeStarlightThemeChanges();
    }
  }

  /**
   * Отслеживает изменения темы Starlight
   */
  private observeStarlightThemeChanges(): void {
    if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

    // Наблюдаем за изменениями data-theme на html элементе
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          if ((newTheme === 'light' || newTheme === 'dark') && newTheme !== this.theme) {
            // Обновляем нашу тему без повторной синхронизации с Starlight
            this.theme = newTheme;
            this.saveToStorage(STORAGE_KEYS.THEME, newTheme);

            // Применяем только наши классы (без syncStarlightTheme чтобы избежать цикла)
            const body = document.body;
            if (body) {
              body.classList.remove('sn-light', 'sn-dark');
              body.classList.add(`sn-${newTheme}`);
              body.dataset.theme = newTheme;
            }

            this.notifyIframes();
            this.dispatchEvent('themeChange', newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }
}

// Создаем и экспортируем singleton
let themeManager: ThemeManager;

export function getThemeManager(): ThemeManager {
  if (!themeManager) {
    themeManager = new ThemeManager();
  }
  return themeManager;
}

// Автоматическая инициализация при загрузке скрипта
if (typeof window !== 'undefined') {
  const manager = getThemeManager();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => manager.init());
  } else {
    manager.init();
  }

  // Делаем доступным глобально для использования в inline скриптах
  (window as any).snThemeManager = manager;
}
