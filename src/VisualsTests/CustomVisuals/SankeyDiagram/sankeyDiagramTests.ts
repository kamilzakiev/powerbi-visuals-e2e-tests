import {visualConfig} from "../../exports";

visualConfig.
describe("SankeyDiagram", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForVisible("svg.sankeyDiagram g.links > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.SankeyDiagram();
        clientHelpers.clickElement(visual.linkElements.eq(0));
        clientHelpers.clickElement(visual.linkElements.eq(1), true);

        visual.linkElements.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(e.is(".selected")).toBeFalsy();
            } else {
                expect(e.is(".selected")).toBeTruthy();
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "9")
            .then(done, done.fail);
    });
});