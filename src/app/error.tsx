'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Something broke: {error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
