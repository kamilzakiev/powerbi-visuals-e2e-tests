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
        /*{ browserName: "internet explorer" },
        {
            browserName: "firefox",
            firefox_binary: getBrowserBinPath("firefox")
        },*/
    ],
    testPageInitMode: "manually"
};

function getBrowserBinPath(name) {
    var browsersConfig = require("browsers-binaries-standalone").create(__dirname + "/browsersConfig.js");
    var browser = browsersConfig.filter(x => x.name.toLowerCase() === name)[0];
    return browser && browser.getExecutablePath();
}