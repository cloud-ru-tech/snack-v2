import React from 'react';

import styles from './styles.module.scss';

type ControlSelectOption = {
  value: string;
  label: string;
};

type ControlSelectProps = {
  label: string;
  value: string;
  options: ControlSelectOption[];
  onChange: (value: string) => void;
};

/**
 * Переиспользуемый компонент для label + select в панели контролов
 */
export function ControlSelect({ label, value, options, onChange }: ControlSelectProps) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}:</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
