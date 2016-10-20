declare namespace WebdriverIO {
    export interface Client<T> {
        executeSpec(assertion: (done: () => void) => void | (() => void), timeout?: number): Client<void>;
    }
}