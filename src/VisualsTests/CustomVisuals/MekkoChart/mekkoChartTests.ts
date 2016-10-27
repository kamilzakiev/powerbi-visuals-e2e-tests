import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("MekkoChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg svg.columnChartMainGraphicsContext > g.series > *");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.MekkoChart();
        ClientHelpers.clickElement(visual.columnsWithSize.eq(0));
        ClientHelpers.clickElement(visual.columnsWithSize.eq(1), true);

        visual.columnsWithSize.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "138K")
            .then(done, done.fail);
    });
});