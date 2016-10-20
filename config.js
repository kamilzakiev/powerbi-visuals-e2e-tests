module.exports = {
  jasmine: {
    defaultTimeoutInterval: 12000000
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
  initTestMode: "Manually"
}