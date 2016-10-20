import {_, Path, Q, FS} from "../externals";

module WebdriverIOExJasmineClient {
    const jasmineCoreJsContent = FS.readFileSync(Path.join(Path.dirname(
        require.resolve("jasmine-core")),"jasmine-core/jasmine.js"), "utf8");
    const jasmineJQueryJsContent = FS.readFileSync(Path.join(Path.dirname(
        require.resolve("jasmine-jquery")),"jasmine-jquery.js"), "utf8");

    export function initWebdriverIOExJasmineClient(client: WebdriverIO.Client<any>) {
        return Q.all([
            addCommand("executeSpec", (assertion: (done: () => void) => void | (() => void), timeout?: number) => {
                return client
                    .execute("return window.jasmine")
                    .then(result => {
                        if(!result.value) {
                            return client
                                .execute(function(code) { eval(code); }, jasmineCoreJsContent) //load jasmine core
                                .catch(err => { throw "Spec execution: There is an error loading jasmine"; });
                        }
                    })
                    .execute(getBootWebdriverIOExJasmineClient(), jasmine.DEFAULT_TIMEOUT_INTERVAL) //init jasmine
                    .execute(function(code) { eval(code); }, jasmineJQueryJsContent) //load jasmine jquery
                    .executeAsync(getExecuteSpec(), assertion.toString(), timeout, jasmine.currentSpec.getFullName())
                    .then((result: any) => {
                        try {
                            let specExecutionResult = <SpecExecutionResult>result.value;
                            specExecutionResult.failedExpectations.forEach(e => jasmine.currentSpec.result.failedExpectations.push(e));
                            specExecutionResult.passedExpectations.forEach(e => jasmine.currentSpec.result.passedExpectations.push(e));
                        } catch(error) {
                            throw "Spec execution: There is no valid response from the client: " + result.value;
                        }
                    });
            })
        ]);
        
        function getExecuteSpec() {
            return function(assertion: string, timeout: number, name: string, testExecuted: (result: any) => void) {
                var specExecutionResult = <SpecExecutionResult>{};
                jasmine.getEnv().addReporter({
                    jasmineStarted: function() {},
                    jasmineDone: function() {
                        var result = (<jasmine.Spec><any>(<jasmine.Suite>jasmine.getEnv()
                            .topSuite().children[0]).children[0]).result;
                        specExecutionResult.failedExpectations = result.failedExpectations
                        specExecutionResult.passedExpectations = result.passedExpectations
                        testExecuted(specExecutionResult);
                    }
                });

                describe("", function() {
                    var assertionFunction: Function = eval("assertion = " + assertion);
                    it(name, <any>assertionFunction, timeout);
                });

                setTimeout(jasmine.getEnv().execute, 0);
            };
        }

        function getBootWebdriverIOExJasmineClient() {
            var jasmineRequire, window; //just declarations
            return function(defaultTimeoutInterval: number) {
                window.jasmine = jasmineRequire.core(jasmineRequire);
                var env = jasmine.getEnv();
                var jasmineInterface = jasmineRequire.interface(jasmine, env);
                for (var property in jasmineInterface) {
                    window[property] = jasmineInterface[property];
                }

                jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeoutInterval
            }
        }

        function addCommand(commandName: string, customMethod: Function) {
            return client.addCommand(commandName, customMethod.bind(client));
        }
    }

    interface SpecExecutionResult {
        failedExpectations?: any[];
        passedExpectations?: any[];
    }
}

export function initWebdriverIOExJasmineClient() {
    jasmine.events.on("WDClientChanged", WebdriverIOExJasmineClient.initWebdriverIOExJasmineClient);
}