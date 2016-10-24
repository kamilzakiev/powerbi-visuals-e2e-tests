import {visualConfig} from "../../exports";
/*
visualConfig.describe("AreaRangeChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.areaRangeChart > g.chart > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.AreaRangeChart();
        clientHelpers.clickElement(visual.areas.eq(0));

        visual.areas.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "299")
            .then(done);
    });
});*/