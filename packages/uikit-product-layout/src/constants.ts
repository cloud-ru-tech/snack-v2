/**
 * `data-test-id` внутренних слотов, которые компонент проставляет сам
 * (потребитель не может адресовать их через spread `...rest`).
 * Корневой `data-test-id` приходит от потребителя через support-props.
 */
export const TEST_IDS = {
  noAccess: {
    serviceName: 'no-access__service-name',
  },
} as const;
