import {visualConfig} from "../../exports";

visualConfig.
describe("LineDotChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.lineDotChart g.line circle.point");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.LineDotChart();
        clientHelpers.clickElement(visual.dots.eq(0));

        setTimeout(() => {
            visual.dots.toArray().map($).forEach((e,i) => {
                if(i >= 1) {
                    expect(e).not.toHaveCss({"opacity":"1"});
                } else {
                    expect(e).toHaveCss({"opacity":"1"});
                }
            });
            clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "1")
            .then(done, done.fail);
        }, 5000);
    });
});