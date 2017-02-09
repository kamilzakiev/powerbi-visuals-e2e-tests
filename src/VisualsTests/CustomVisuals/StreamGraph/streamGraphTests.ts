import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("StreamGraph", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.streamGraph g.dataPointsContainer > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.StreamGraph();
                ClientHelpers.clickElement(visual.layers.eq(0));
                ClientHelpers.clickElement(visual.layers.eq(1), true);

                visual.layers.toArray().map($).forEach((e, i) => {
                    if (i >= 2) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "191.60")
                    .then(done, done.fail);
            });
    });
});