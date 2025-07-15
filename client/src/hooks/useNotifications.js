import { useEffect } from "react";

export const useNotifications = () => {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const playSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  return { showNotification, playSound };
};
