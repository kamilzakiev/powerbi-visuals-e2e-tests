import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("LineDotChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.lineDotChart g.line circle.point");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.LineDotChart();
        ClientHelpers.clickElement(visual.dots.eq(0));

        setTimeout(() => {
            visual.dots.toArray().map($).forEach((e,i) => {
                if(i >= 1) {
                    expect(e).not.toHaveCss({"opacity":"1"});
                } else {
                    expect(e).toHaveCss({"opacity":"1"});
                }
            });
            ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "1")
            .then(done, done.fail);
        }, 5000);
    });
});