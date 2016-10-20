import {Path, FS} from "./externals";
import {Helpers, TestRunner} from "../Common/exports";

export module visualConfig {
    export interface VisualTestConfig {
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
        execFiles: string[]
    }

    export function readFromDirectory(configPath: string) {
        let json = FS.readFileSync(configPath + "/config.json", "utf8");
        let config = JSON.parse(json);
        return <VisualTestConfig>config;
    }

    export function describe(
        description: string,
        configDir: string,
        specDefinitions: (reportUrl: string) => void): () => void {
        return describeInternal("", description, configDir, specDefinitions);
    }

    export function xdescribe(
        description: string,
        configDir: string,
        specDefinitions: (reportUrl: string) => void): () => void {
        return describeInternal("x", description, configDir, specDefinitions);
    }

    export function fdescribe(
        description: string,
        configDir: string,
        specDefinitions: (reportUrl: string) => void): () => void {
        return describeInternal("f", description, configDir, specDefinitions);
    }

    export function describeInternal(
        prefix: string,
        description: string,
        configDir: string,
        specDefinitions: (reportUrl: string) => void): () => void {

        let visualTestConfig = readFromDirectory(configDir);
        if(!visualTestConfig || !visualTestConfig.browsers || !visualTestConfig.reports) {
            return;
        }

        if(getBrowsers(visualTestConfig).some(x => x === jasmine.currentBrowser)) {
            jasmine.getEnv()[prefix + "describe"](description, () => {
                for(let reportKey in visualTestConfig.reports) {
                    let url = visualTestConfig.reports[reportKey];
                    if(!url) continue;

                    jasmine.getEnv().describe(reportKey, () => {
                        beforeEach(() => jasmine.initTestWDClient(url)
                            .then(() => {
                                if(visualTestConfig.execFiles) {
                                    let files = Helpers.getFilesByGlob(visualTestConfig.execFiles, configDir);
                                    return jasmine.WDClient.executeFiles(files);
                                }
                            })
                        );
                        specDefinitions(url);
                    });
                }
            });
        }
    }

    function getBrowsers(visualTestConfig: VisualTestConfig): Browser[] {
        /*if(Helpers.isAppveyor()) {
            return [Browser.chrome];
        }*/

        let browsers = (<Browser[]><any>Object.keys(visualTestConfig.browsers))
                .filter(key => visualTestConfig.browsers[key])
                .filter(x => !!x);

        return browsers;
    }
}