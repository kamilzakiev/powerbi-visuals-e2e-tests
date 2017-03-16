import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("ChicletSlicer", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("div.chicletSlicer div.cell > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.ChicletSlicer();
                var unselectedColor = visual.slicerItemContainers.eq(0).css('background-color');

                ClientHelpers.clickElement(visual.slicerItemContainers.eq(0), true);
                ClientHelpers.clickElement(visual.slicerItemContainers.eq(1), true);

                visual.slicerItemContainers.toArray().map($).forEach((e, i) => {
                    ClientHelpers.assertColorsMatch(e.css('background-color'), unselectedColor, i < 2);
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$159M")
                    .then(done, done.fail);
            });
    });
});