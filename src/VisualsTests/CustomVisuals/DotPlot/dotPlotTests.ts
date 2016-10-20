import {visualConfig} from "../../exports";

visualConfig.
describe("DotPlot", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.dotplot g.dotplotGroup > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.DotPlot();
        clientHelpers.clickElement(visual.dotGroups.eq(0));
        clientHelpers.clickElement(visual.dotGroups.eq(1), true);

        visual.dotGroups.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$152K")
            .then(done, done.fail);
    });
});