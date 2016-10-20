import {visualConfig} from "../../exports";

visualConfig.
describe("StreamGraph", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.streamGraph g.dataPointsContainer > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.StreamGraph();
        clientHelpers.clickElement(visual.layers.eq(0));
        clientHelpers.clickElement(visual.layers.eq(1), true);

        visual.layers.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "191.60")
            .then(done, done.fail);
    });
});