import {visualConfig} from "../../exports";

visualConfig.
describe("ChicletSlicer", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("div.chicletSlicer div.cell > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.ChicletSlicer();
        var unselectedColor = visual.slicerItemContainers.eq(0).css('background-color');

        clientHelpers.clickElement(visual.slicerItemContainers.eq(0), true);
        clientHelpers.clickElement(visual.slicerItemContainers.eq(1), true);

        visual.slicerItemContainers.toArray().map($).forEach((e,i) => {
            clientHelpers.assertColorsMatch(e.css('background-color'), unselectedColor, i < 2);
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$159M")
            .then(done, done.fail);
    });
});