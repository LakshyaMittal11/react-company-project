import { AlertCircle } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">

      <AlertCircle size={25} />

      <p>{message}</p>

      {onRetry && (
        <button onClick={onRetry}>
          Try Again
        </button>
      )}

    </div>
  );
}

export default ErrorMessage;