import {visualConfig} from "../../exports";

visualConfig.
describe("WordCloud", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.wordCloud g.words > g.word > *")
            .pause(1000);
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.WordCloud();
        clientHelpers.clickElement(visual.getWordRectByText("visualize"));
        clientHelpers.clickElement(visual.getWordRectByText("data"), true);

        visual.wordRects.toArray().map(e => $(e).siblings()).forEach((e,i) => {
            if(e.text() === "visualize" || e.text() === "data") {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "6")
            .then(done, done.fail);
    });
});