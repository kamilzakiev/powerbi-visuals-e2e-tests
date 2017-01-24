import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("LineDotChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.lineDotChart g.line circle.point");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.LineDotChart();
                ClientHelpers.clickElement(visual.dots.eq(0));

                visual.dots.toArray().map($).forEach((e, i) => {
                    if (i >= 1) {
                        expect(e).not.toHaveCss({ "opacity": "1" });
                    } else {
                        expect(e).toHaveCss({ "opacity": "1" });
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "1")
                    .then(done, done.fail);
            });
    });
});