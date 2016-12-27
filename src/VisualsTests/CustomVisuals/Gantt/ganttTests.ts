import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("Gantt", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("div.gantt-body g.task-group > g.task > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.Gantt();
                ClientHelpers.clickElement(visual.tasks.eq(0));
                ClientHelpers.clickElement(visual.tasks.eq(1), true);

                visual.tasks.toArray().map($).forEach((e, i) => {
                    if (i >= 2) {
                        expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('opacity'))).toBe(1);
                    }
                });
            })
            .frameParent()
            .executeSpec(function (done) {
                ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "9")
                    .then(done, done.fail);
            });
    });
});