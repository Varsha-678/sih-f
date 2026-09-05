import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Sparkles, AlertTriangle, ShieldCheck, UserCheck, ChevronRight } from 'lucide-react';
import type { NotificationItem, Language } from '../types';
import { translations } from '../utils/translations';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  lang: Language;
  onMarkAllRead: () => void;
  onNotificationClick: (item: NotificationItem) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  lang,
  onMarkAllRead,
  onNotificationClick
}) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'risk_alert':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'expert_review':
        return <UserCheck className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'scan':
        return <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-emerald-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel-glow border border-emerald-500/30 p-4 shadow-2xl z-50 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white font-['Outfit']">
                {t.notificationsTitle}
              </h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                {t.markAllRead}
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 mt-2 space-y-1">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                {t.noNotifications}
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNotificationClick(item);
                    setIsOpen(false);
                  }}
                  className={`p-2.5 rounded-xl transition cursor-pointer flex items-start gap-3 hover:bg-slate-800/60 ${
                    !item.read ? 'bg-emerald-950/20 border-l-2 border-emerald-400' : ''
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 self-center" />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
