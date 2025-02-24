import { forwardRef } from 'react';
import type { ChangeEvent } from 'react';

interface TextInputProps {
  id?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  error?: string;
  required?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      label,
      placeholder,
      type = 'text',
      error,
      required = false,
      disabled = false,
      style = {},
      autoFocus = false,
    },
    ref
  ) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {label && (
          <label
            htmlFor={id || name}
            style={{ fontSize: '0.875rem', fontWeight: 500 }}
          >
            {label}
            {required && (
              <span style={{ color: '#EF4444', marginLeft: '0.25rem' }}>*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
            outline: 'none',
            ...(disabled && {
              backgroundColor: '#F3F4F6',
              cursor: 'not-allowed',
            }),
            ...style,
          }}
        />
        {error && (
          <p style={{ color: '#EF4444', fontSize: '0.875rem' }}>{error}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
