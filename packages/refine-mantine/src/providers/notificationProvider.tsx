import {
  hideNotification,
  showNotification,
  updateNotification,
} from "@mantine/notifications";
import type { NotificationProvider } from "@refinedev/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Message } from "@/components/notification/Message";

export const notificationProvider = (): NotificationProvider => {
  const activeNotifications: string[] = [];

  const isNotificationActive = (key?: string) => {
    return activeNotifications.includes(key as string);
  };

  const addNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index === -1) {
        activeNotifications.push(key);
      }
    }
  };

  const removeNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index > -1) {
        activeNotifications.splice(index, 1);
      }
    }
  };

  const open: NotificationProvider["open"] = ({
    message,
    description,
    type,
    undoableTimeout,
    key,
    cancelMutation,
  }) => {
    if (type === "progress") {
      if (isNotificationActive(key)) {
        updateNotification({
          id: key,
          message: (
            <Message
              message={message}
              description={description}
              undoableTimeout={undoableTimeout}
              onUndo={() => {
                cancelMutation?.();
                if (key) {
                  removeNotification(key);
                  hideNotification(key);
                }
              }}
            />
          ),
          autoClose: false,
        });
      } else {
        addNotification(key);
        showNotification({
          id: key,
          message: (
            <Message
              message={message}
              description={description}
              undoableTimeout={undoableTimeout}
              onUndo={() => {
                cancelMutation?.();
                if (key) {
                  removeNotification(key);
                  hideNotification(key);
                }
              }}
            />
          ),
          autoClose: false,
        });
      }
    } else {
      if (isNotificationActive(key)) {
        updateNotification({
          id: key,
          color: type === "success" ? "primary" : "red",
          icon:
            type === "success" ? <IconCheck size={18} /> : <IconX size={18} />,
          message,
          title: description,
          autoClose: 5000,
        });
      } else {
        addNotification(key);
        showNotification({
          id: key,
          color: type === "success" ? "primary" : "red",
          icon:
            type === "success" ? <IconCheck size={18} /> : <IconX size={18} />,
          message,
          title: description,
          onClose: () => {
            removeNotification(key);
          },
          autoClose: 5000,
        });
      }
    }
  };

  const close: NotificationProvider["close"] = (key) => {
    removeNotification(key);
    hideNotification(key);
  };

  return {
    open,
    close,
  };
};
