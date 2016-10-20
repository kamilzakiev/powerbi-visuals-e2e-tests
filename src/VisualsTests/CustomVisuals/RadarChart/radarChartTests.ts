import {visualConfig} from "../../exports";

visualConfig.
describe("RadarChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.radarChart g.chartNode > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.RadarChart();
        clientHelpers.clickElement(visual.chartDotsGrouped[0].eq(0));
        clientHelpers.clickElement(visual.chartDotsGrouped[0].eq(1), true);

        visual.chartDotsGrouped.forEach(dots => dots.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        }));

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "14")
            .then(done, done.fail);
    });
});