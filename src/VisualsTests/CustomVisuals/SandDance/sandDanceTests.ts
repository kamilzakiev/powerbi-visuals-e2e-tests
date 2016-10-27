import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("SandDance", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("div.sandDance canvas.canvas3d");
    });

    itClient("dom validation tests", function (done) {
        var visual = new ClientVisuals.SandDance();
        ClientHelpers.setTimeoutTry(function() {
            var gl = visual.getCanvas3dContext();
            expect(gl.checkFramebufferStatus(gl.FRAMEBUFFER)).toBe(gl.FRAMEBUFFER_COMPLETE);
            expect(gl.drawingBufferWidth).toBeGreaterThan(100);
            expect(gl.drawingBufferHeight).toBeGreaterThan(100);

            var size = { width: 50, height: 50 };
            var pixels = new Uint8Array(size.width * size.height * 4);
            gl.readPixels(
                gl.drawingBufferWidth/2,
                gl.drawingBufferHeight/2,
                size.width,
                size.height,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                pixels);
            expect(_.uniq(pixels).length).toBeGreaterThan(0);
            done();
        }, done.fail, 10000);
    });
});