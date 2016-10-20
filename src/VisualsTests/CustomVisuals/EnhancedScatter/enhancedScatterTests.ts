import {visualConfig} from "../../exports";

visualConfig.
describe("EnhancedScatter", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.enhancedScatterChart > svg.svgScrollable svg > g.ScatterMarkers > * ");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.EnhancedScatter();
        clientHelpers.clickElement(visual.dots.eq(0));

        visual.dots.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(0.85);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "10")
            .then(done, done.fail);
    });
});