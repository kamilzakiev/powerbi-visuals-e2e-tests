import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("Histogram", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.histogram g.columns > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.Histogram();
                ClientHelpers.clickElement(visual.columnRects.eq(0), true);

                visual.columnRects.toArray().map($).forEach((e, i) => {
                    if (i >= 1) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "7")
                    .then(done, done.fail);
            });
    });
});