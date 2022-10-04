import Utils from "../../utils";

class GlUtils {
    static canvas
    static gl
    static isOK = false

    static initialize(id) {
        let canvas;

        if (!Utils.isUndefined(id)) {
            canvas = document.getElementById(id);

            if (Utils.isUndefined(canvas)) {
                throw new Error(`Can not find an element named ${id}`)
            }
        } else {
            canvas = document.createElement('canvas')
            document.body.append(canvas)
        }

        const webgl = canvas.getContext('webgl')

        if (Utils.isUndefined(webgl)) {
            throw new Error('Unable to create webgl context')
        }

        GlUtils.canvas = canvas
        GlUtils.gl = webgl

        GlUtils.isOK = true

        return [canvas, webgl]
    }
}

export default GlUtils