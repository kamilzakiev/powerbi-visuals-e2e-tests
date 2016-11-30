import {VisualConfig} from "../../../Common/exports";

VisualConfig.
    describe("WordCloud", (reportUrl) => {
        beforeEach(() => {
            return browser
                .waitForExist("iframe.visual-sandbox")
                .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
                .waitForExist("svg.wordCloud g.words > g.word > *")
                .pause(1000);
        });

        it("selection test", () => {
            return browser
                .executeSpec(function () {
                    var visual = new ClientVisuals.WordCloud();

                    ClientHelpers.clickElement(visual.getWordRectByText("visualize"));
                    ClientHelpers.clickElement(visual.getWordRectByText("data"), true);
                })
                .pause(1000)
                .executeSpec(function () {
                    var visual = new ClientVisuals.WordCloud();

                    visual.wordRects.toArray().map(e => $(e).siblings()).forEach((e, i) => {
                        if (e.text() === "visualize" || e.text() === "data") {
                            expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                        } else {
                            expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                        }
                    });
                //})
                //.frameParent()
                //.executeSpec(function () {
                //    expect(ClientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("6");
                });
        });
    });