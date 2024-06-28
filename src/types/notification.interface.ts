export interface Notification {
    id: string;
    duration?: number;
    message: string;
    type: NotificationType;
}

export type NotificationType = 'error' | 'success' | 'info' | 'warning';