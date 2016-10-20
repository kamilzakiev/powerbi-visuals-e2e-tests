declare function itClient(expectation: string, assertion?: () => void, timeout?: number): void;
declare function itClient(expectation: string, assertion?: (done: DoneFn) => void, timeout?: number): void;
declare function fitClient(expectation: string, assertion?: () => void, timeout?: number): void;
declare function fitClient(expectation: string, assertion?: (done: DoneFn) => void, timeout?: number): void;
declare function xitClient(expectation: string, assertion?: () => void, timeout?: number): void;
declare function xitClient(expectation: string, assertion?: (done: DoneFn) => void, timeout?: number): void;

declare function itClient(expectation: string, assertion?: () => void, focusedBrowsers?: Browser[] | Browser, timeout?: number): void;
declare function itClient(expectation: string, assertion?: (done: DoneFnEx) => void, focusedBrowsers?: Browser[] | Browser,  timeout?: number): void;
declare function xitClient(expectation: string, assertion?: () => void, focusedBrowsers?: Browser[] | Browser, timeout?: number): void;
declare function xitClient(expectation: string, assertion?: (done: DoneFnEx) => void, focusedBrowsers?: Browser[] | Browser,  timeout?: number): void;
declare function fitClient(expectation: string, assertion?: () => void, focusedBrowsers?: Browser[] | Browser, timeout?: number): void;
declare function fitClient(expectation: string, assertion?: (done: DoneFnEx) => void, focusedBrowsers?: Browser[] | Browser,  timeout?: number): void;