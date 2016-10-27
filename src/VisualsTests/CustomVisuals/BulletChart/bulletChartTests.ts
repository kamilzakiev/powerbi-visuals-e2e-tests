import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("BulletChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("div.bulletChart rect.range");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.BulletChart();

        ClientHelpers.clickElement(visual.rangeRectsGrouped[0].first());
        ClientHelpers.clickElement(visual.rangeRectsGrouped[1].first(), true);

        visual.rangeRectsGrouped.map(e => e.first()).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "222K")
            .then(done, done.fail);
    });
});