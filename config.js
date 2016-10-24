module.exports = {
    jasmine: {
        defaultTimeoutInterval: 150000,
        onInit: require("./lib/Common/extensions/JasmineClient").initJasmineClient
    },
    webdriverio: {
        onInit: require("./lib/Common/extensions/WebdriverIOExJasmineClient").initWebdriverIOExJasmineClient
    },
    specs: ["./lib/VisualsTests/**/*Tests.js"],
    capabilities: [
        { browserName: "chrome" },
        { browserName: "internet explorer" },
        //{ browserName: "firefox" },
    ],
    execFiles: [
        "./lib/Common/ClientModules/**/*.js"
    ],
    testPageInitMode: "manually"
}