var gulp = require("gulp");
var runSequence = require("run-sequence")
var builder = require("./node_modules/visual-regression-test-runner/builder");
var visualRegressionTestRunner = require("visual-regression-test-runner");

var tsConfigPath = __dirname + "/src/Common/tsconfig";

gulp.task("build", () => {
    if (!builder.build(tsConfigPath)) {
        throw "build failed";
    }
});

gulp.task("clean", () => {
    builder.clean(tsConfigPath);
});

gulp.task("run", () => {
    return visualRegressionTestRunner.TestRunner
        .run({
            configPath: "./config.js",
            autoRunSeleniumServer: true
        })
        .then(
        () => process.exit(0),
        () => process.exit(1));
});

gulp.task('build-run', () => {
    return runSequence("build", "run");
});

gulp.task("start-selenium-server", () => {
    return visualRegressionTestRunner.SeleniumServer.installStart();
});