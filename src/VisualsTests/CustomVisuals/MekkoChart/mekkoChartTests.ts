import {visualConfig} from "../../exports";

visualConfig.
describe("MekkoChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg svg.columnChartMainGraphicsContext > g.series > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.MekkoChart();
        clientHelpers.clickElement(visual.columnsWithSize.eq(0));
        clientHelpers.clickElement(visual.columnsWithSize.eq(1), true);

        visual.columnsWithSize.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "138K")
            .then(done, done.fail);
    });
});