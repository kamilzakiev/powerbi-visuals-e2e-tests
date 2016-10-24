import {visualConfig} from "../../exports";

visualConfig.
describe("AsterPlot", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.asterPlot g.asterSlices > path.asterSlice");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.AsterPlot();

        clientHelpers.clickElement(visual.slices.eq(0));
        clientHelpers.clickElement(visual.slices.eq(1), true);

        visual.slices.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "2.47K")
            .then(done, done.fail);
    });
});