import {visualConfig} from "../../exports";

visualConfig.
describe("Histogram", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.histogram g.columns > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.Histogram();
        clientHelpers.clickElement(visual.columnRects.eq(0), true);

        visual.columnRects.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "7")
            .then(done, done.fail);
    });
});