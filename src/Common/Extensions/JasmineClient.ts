import {_, Path, Q, FS} from "../externals";

module JasmineClient {
    export function initJasmineClient() {
        for(let fnName of ["it", "xit", "fit"]) {
            global[fnName + "Client"] = function() {
                if(arguments.length < 2 || !_.isFunction(arguments[1])) {
                    return (<Function>global[fnName]).apply(this, arguments);
                }

                let clientFunction: Function = arguments[1];
                let timeout: number = undefined;
                if(arguments.length > 3 && _.isNumber(arguments[3])) {
                    timeout = arguments[3];
                } else if(arguments.length > 2 && _.isNumber(arguments[2])) {
                    timeout = arguments[2];
                }

                arguments[1] = () => {
                    return jasmine.WDClient.executeSpec(<any>clientFunction, timeout);
                };

                return (<Function>global[fnName]).apply(this, arguments);
            };
        }
    }
}

export function initJasmineClient() {
    return JasmineClient.initJasmineClient();
}