import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("TornadoChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.tornado-chart g.columns > *");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.TornadoChart();

        ClientHelpers.clickElement(visual.columns.eq(0));
        ClientHelpers.clickElement(visual.columns.eq(1), true);

        visual.columns.toArray().map($).forEach((e,i) => {
            if(i % (visual.columns.length/2) >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "82.40K")
            .then(done, done.fail);
    });
});