interface ErrorProps {
  message?: string;
}

export default function Error({
  message = 'Something went wrong',
}: ErrorProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        color: '#ef4444',
      }}
    >
      <svg
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
