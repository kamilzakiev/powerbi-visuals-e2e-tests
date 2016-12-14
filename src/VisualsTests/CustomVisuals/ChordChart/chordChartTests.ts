import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("ChordChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.chordChart g.slices > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.ChordChart();
                ClientHelpers.clickElement(visual.slices.eq(0));

                visual.slices.toArray().map($).forEach((e, i) => {
                    if (i >= 1) {
                        expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "5")
                    .then(done, done.fail);
            });
    });
});