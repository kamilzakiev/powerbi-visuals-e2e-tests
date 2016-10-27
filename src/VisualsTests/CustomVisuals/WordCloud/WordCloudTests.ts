import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("WordCloud", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.wordCloud g.words > g.word > *")
            .pause(1000);
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.WordCloud();
        ClientHelpers.clickElement(visual.getWordRectByText("visualize"));
        ClientHelpers.clickElement(visual.getWordRectByText("data"), true);

        visual.wordRects.toArray().map(e => $(e).siblings()).forEach((e,i) => {
            if(e.text() === "visualize" || e.text() === "data") {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            }
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "6")
            .then(done, done.fail);
    });
});