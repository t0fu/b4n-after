import * as React from 'react';
import { useEffect } from 'react';
import '../styles/toast.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return isVisible
    ? (
        <div className="toast">
          {message}
        </div>
      )
    : null;
};

export default Toast;
