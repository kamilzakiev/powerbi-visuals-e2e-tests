export module Helpers {
    export function getCallerFile() {
        let originalFunc = (<any>Error).prepareStackTrace;
        (<any>Error).prepareStackTrace = function (err, stack) { return stack; };
        try {
            let error: { stack: any[]} = <any>new Error();
            error.stack.shift(); // Removes the current file.
            let currentfile = error.stack.shift().getFileName();
            let callerfile;
            while (error.stack.length) {
                callerfile = error.stack.shift().getFileName();
                if(currentfile !== callerfile) {
                    return callerfile;
                }
            }
        } catch (e) {
        } finally {
            (<any>Error).prepareStackTrace = originalFunc; 
        }
    }
}