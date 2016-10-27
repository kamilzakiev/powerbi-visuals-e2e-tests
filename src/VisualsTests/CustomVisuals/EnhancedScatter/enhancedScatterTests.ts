import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("EnhancedScatter", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.enhancedScatterChart > svg.svgScrollable svg > g.ScatterMarkers > * ");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.EnhancedScatter();
        ClientHelpers.clickElement(visual.dots.eq(0));

        visual.dots.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(0.85);
            }
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "10")
            .then(done, done.fail);
    });
});