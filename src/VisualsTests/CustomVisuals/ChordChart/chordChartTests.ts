import {visualConfig} from "../../exports";

visualConfig.
describe("ChordChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.chordChart g.slices > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.ChordChart();
        clientHelpers.clickElement(visual.slices.eq(0));

        visual.slices.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "5")
            .then(done, done.fail);
    });
});