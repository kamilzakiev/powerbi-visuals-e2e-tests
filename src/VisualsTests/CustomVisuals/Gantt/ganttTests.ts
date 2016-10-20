import {visualConfig} from "../../exports";

visualConfig.
describe("Gantt", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("div.gantt-body g.task-group > g.task > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.Gantt();
        clientHelpers.clickElement(visual.tasks.eq(0));
        clientHelpers.clickElement(visual.tasks.eq(1), true);

        visual.tasks.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "9")
            .then(done, done.fail);
    });
});