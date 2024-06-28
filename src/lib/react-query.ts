import { showNotification } from "@/stores/notification.store";
import { Problem } from "@/types/http-errors.interface";
import { Notification } from "@/types/notification.interface";
import { MutationCache, QueryCache, QueryClient } from "react-query";

// تابع نمایش اعلان
const showNotifications = (problem: Problem) => {
    const notifications: Omit<Notification, "id">[] = [];
    if (problem?.errors) {

        Object.entries(problem.errors).forEach(([_, values]) =>
            values.forEach((errorMessage) =>
                notifications.push({
                    message: errorMessage,
                    type: "error",
                })
            )
        );
    } else if (problem?.detail) {
        notifications.push({
            message: problem.detail,
            type: "error",
        });
    }

    showNotification(notifications);
};

// ساخت QueryClient جدید با تنظیمات
export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: unknown) => {


            showNotifications(error as Problem);
        }
    }),
    mutationCache: new MutationCache({
        onError: (error: unknown) => {
            showNotifications(error as Problem);
        }
    }),
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            useErrorBoundary: false,
            cacheTime: 100 * 60 * 60 * 24,
            // gcTime: 1000 * 60 * 60 * 24, // این خط را حذف کنید
            staleTime: 1000 * 60 * 60 * 24, // به جای gcTime از staleTime استفاده کنید
        }
    }
});
