import {Path, FS} from "./externals";
import {Helpers, WCTR} from "./exports";

export module VisualConfig {
    export interface IVisualConfig {
        browsers: {
            internetExplorer: boolean;
            chrome: boolean;
            firefox: boolean;
            edge: boolean;
        };
        reports: {
            dxt: string,
            msit: string,
            prod: string
        },
        execFiles: string[],
        rootDir: string;
    }

    let currentVisualTestConfig: IVisualConfig;

    export function readFromDirectory(configPath: string) {
        let path = Path.join(Path.dirname(Helpers.getCallerFile()), configPath);
        let config = require(path);
        config.rootDir = Path.dirname(path);
        return <IVisualConfig>config;
    }

    export function describe(
        description: string,
        specDefinitions: (reportUrl: string) => void): () => void {
        return describeInternal("", description, specDefinitions);
    }

    export function xdescribe(
        description: string,
        specDefinitions: (reportUrl: string) => void): () => void {
        return describeInternal("x", description, specDefinitions);
    }

    export function fdescribe(
        description: string,
        specDefinitions: (reportUrl: string) => void): () => void {
        return describeInternal("f", description, specDefinitions);
    }

    export function executeClientHelpers() {
        let files = WCTR.Helpers.getFilesByGlob("./ClientModules/**/*.js", __dirname);
        files = files.concat(WCTR.Helpers.getFilesByGlob(currentVisualTestConfig.execFiles, currentVisualTestConfig.rootDir));
        return browser.executeFiles(files);
    }

    function describeInternal(
        prefix: string,
        description: string,
        specDefinitions: (reportUrl: string) => void): () => void {

        let visualTestConfig = readFromDirectory("./config");
        if(!visualTestConfig || !visualTestConfig.browsers || !visualTestConfig.reports) {
            return;
        }

        if(getBrowsers(visualTestConfig).some(x => x === jasmine.currentBrowser)) {
            jasmine.getEnv()[prefix + "describe"](description, () => {
                beforeAll(() => currentVisualTestConfig = visualTestConfig);
                for(let reportKey in visualTestConfig.reports) {
                    let url = visualTestConfig.reports[reportKey];
                    if(!url) continue;
                    jasmine.getEnv().describe(reportKey, () => {
                        jasmine.beforeEachInitTestPage(url);
                        specDefinitions(url);
                    });
                }
            });
        }
    }

    function getBrowsers(visualTestConfig: IVisualConfig): Browser[] {
        let browsers = (<Browser[]><any>Object.keys(visualTestConfig.browsers))
                .filter(key => visualTestConfig.browsers[key])
                .filter(x => !!x);

        return browsers;
    }
}