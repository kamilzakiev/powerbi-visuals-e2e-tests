import {visualConfig} from "../../exports";

visualConfig.
describe("TornadoChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.tornado-chart g.columns > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.TornadoChart();

        clientHelpers.clickElement(visual.columns.eq(0));
        clientHelpers.clickElement(visual.columns.eq(1), true);

        visual.columns.toArray().map($).forEach((e,i) => {
            if(i % (visual.columns.length/2) >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "82.40K")
            .then(done, done.fail);
    });
});