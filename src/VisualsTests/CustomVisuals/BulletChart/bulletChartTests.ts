import {visualConfig} from "../../exports";

visualConfig.
describe("BulletChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("div.bulletChart rect.range");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.BulletChart();

        clientHelpers.clickElement(visual.rangeRectsGrouped[0].first());
        clientHelpers.clickElement(visual.rangeRectsGrouped[1].first(), true);

        visual.rangeRectsGrouped.map(e => e.first()).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "222K")
            .then(done, done.fail);
    });
});