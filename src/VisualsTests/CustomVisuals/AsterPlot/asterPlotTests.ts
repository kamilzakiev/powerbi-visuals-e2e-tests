import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("AsterPlot", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.asterPlot g.asterSlices > path.asterSlice");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.AsterPlot();

                ClientHelpers.clickElement(visual.slices.eq(0));
                ClientHelpers.clickElement(visual.slices.eq(1), true);

                visual.slices.toArray().map($).forEach((e, i) => {
                    if (i >= 2) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "2.47K")
                    .then(done, done.fail);
            });
    });
});