import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("DotPlot", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.dotplot g.dotplotGroup > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.DotPlot();
                ClientHelpers.clickElement(visual.dotGroups.eq(0));
                ClientHelpers.clickElement(visual.dotGroups.eq(1), true);

                visual.dotGroups.toArray().map($).forEach((e, i) => {
                    if (i >= 2) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$152K")
                    .then(done, done.fail);
            });
    });
});



