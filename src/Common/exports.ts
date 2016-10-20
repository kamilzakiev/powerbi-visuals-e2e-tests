export * from "../../node_modules/visual-regression-test-runner/lib/visual-regression-test-runner/exports";

import { initJasmineClient } from "./extensions/JasmineClient";
import { initWebdriverIOExJasmineClient } from "./extensions/WebdriverIOExJasmineClient";

initWebdriverIOExJasmineClient();
initJasmineClient();