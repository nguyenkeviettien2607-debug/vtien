import React from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  points?: number;
  type?: 'success' | 'alert' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3 rounded-xl shadow-2xl flex items-center justify-between border backdrop-blur-md animate-slideDown ${
            toast.type === 'alert'
              ? 'bg-[#93000a]/90 text-[#ffdad6] border-[#ffb4ab]/50'
              : 'bg-[#152125]/95 text-[#d8e5ea] border-[#4edea3]/50 shadow-[0_4px_20px_rgba(78,222,163,0.2)]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`material-symbols-outlined text-[20px] ${
                toast.type === 'alert' ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
              }`}
            >
              {toast.type === 'alert' ? 'warning' : 'verified'}
            </span>
            <div className="min-w-0">
              <span className="text-[12px] font-bold block truncate">{toast.title}</span>
              {toast.points !== undefined && (
                <span className="text-[10px] text-[#4edea3] font-bold">
                  +{toast.points} Điểm Xanh đã được cộng!
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-[#bbcabf] hover:text-[#d8e5ea] p-1 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
