import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("BulletChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("div.bulletChart rect.range");
    });    

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.BulletChart();

                ClientHelpers.clickElement(visual.rangeRectsGrouped[0].first());
                ClientHelpers.clickElement(visual.rangeRectsGrouped[1].first(), true);

                visual.rangeRectsGrouped.map(e => e.first()).forEach((e, i) => {
                    if (i >= 2) {
                        expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "222K")
                    .then(done, done.fail);
            });
    });
});