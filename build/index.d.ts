export interface AppConfig {
    key: string;
    name: string;
}
export type Constructor<T = any> = new (...args: any[]) => T;
export type Class<T = any> = InstanceType<Constructor<T>>;
