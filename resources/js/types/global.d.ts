import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            flash: {
                newToken: string | null;
            };
            [key: string]: unknown;
        };
    }
}
