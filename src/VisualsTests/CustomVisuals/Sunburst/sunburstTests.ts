import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("Sunburst", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.mainDrawArea g.container > *");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.Sunburst();

        if(jsCommon.BrowserUtils.isFirefox()) {
            done();
            return;
        };

        ClientHelpers.dispatchMouseEvent("mousedown", visual.visibleNodes.eq(0));

        visual.visibleNodes.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "33")
            .then(done, done.fail);
    });
});