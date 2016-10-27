import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("RadarChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.radarChart g.chartNode > *");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.RadarChart();
        ClientHelpers.clickElement(visual.chartDotsGrouped[0].eq(0));
        ClientHelpers.clickElement(visual.chartDotsGrouped[0].eq(1), true);

        visual.chartDotsGrouped.forEach(dots => dots.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        }));

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "14")
            .then(done, done.fail);
    });
});