declare namespace WebdriverIO {
    export interface Client<T> {
        executeSpec(assertion: ((done?: DoneFn) => void), timeout?: number): Client<void>;
    }
}