import {visualConfig} from "../../exports";

visualConfig.
describe("Sunburst", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.mainDrawArea g.container > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.Sunburst();

        if(jsCommon.BrowserUtils.isFirefox()) {
            done();
            return;
        };

        clientHelpers.dispatchMouseEvent("mousedown", visual.visibleNodes.eq(0));

        visual.visibleNodes.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "33")
            .then(done, done.fail);
    });
});