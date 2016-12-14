import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("TornadoChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.tornado-chart g.columns > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.TornadoChart();

                ClientHelpers.clickElement(visual.columns.eq(0));
                ClientHelpers.clickElement(visual.columns.eq(1), true);

                visual.columns.toArray().map($).forEach((e, i) => {
                    if (i % (visual.columns.length / 2) >= 2) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "82.40K")
                    .then(done, done.fail);
            });
    });
});