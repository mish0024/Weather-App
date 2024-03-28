import React, { useEffect } from 'react';

function FeedbackBar({ message, clearMessage }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      clearMessage();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [message, clearMessage]);

  return (
    <div className="feedback-bar">
      {message && <p>{message}</p>}
    </div>
  );
}

export default FeedbackBar;