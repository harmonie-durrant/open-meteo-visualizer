"use client";
import { useEffect, useState } from "react";

type NotificationListing = {
  type: string;
  message: string;
  icon?: string;
  timeoutRef?: NodeJS.Timeout;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([] as NotificationListing[]);

  const addNotification = (notification: NotificationListing) => {
    if (notification.timeoutRef) {
      clearTimeout(notification.timeoutRef);
    }
    notification.timeoutRef = setTimeout(() => {
      removeNotification(notifications.indexOf(notification));
    }, 5000); // Remove notification after 5 seconds
    setNotifications((prev) => [...prev, notification]);
  };

  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const clearTimeouts = () => {
    notifications.forEach((notification) => {
      if (notification.timeoutRef) {
        clearTimeout(notification.timeoutRef);
      }
    });
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, [notifications]);

  return (
    <div id="notifications" className="absolute top-5 right-5 z-50 p-4">
        <ul id="notification-list">
            {/* Notifications will be dynamically added here */}
            {notifications.map((notification: NotificationListing, index) => (
                <li key={index} className="p-2 border-b border-gray-200">
                    {notification.message}
                </li>
            ))}
        </ul>
    </div>
  );
}