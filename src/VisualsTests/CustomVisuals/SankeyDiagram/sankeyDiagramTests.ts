import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("SankeyDiagram", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.sankeyDiagram g.links > *");
    });

    it("selection test", () => {
        return browser
            .executeSpec(function () {
                var visual = new ClientVisuals.SankeyDiagram();
                ClientHelpers.clickElement(visual.linkElements.eq(0));
                ClientHelpers.clickElement(visual.linkElements.eq(1), true);

                visual.linkElements.toArray().map($).forEach((e, i) => {
                    if (i >= 2) {
                        expect(e.is(".selected")).toBeFalsy();
                    } else {
                        expect(e.is(".selected")).toBeTruthy();
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