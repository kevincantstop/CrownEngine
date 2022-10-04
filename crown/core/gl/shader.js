import GlUtils from "@core-gl/gl"
import Utils from "@crown/utils";

class Shader {
    constructor(name, vSrc, fSrc) {
        if (!GlUtils.isOK) {
            throw new Error(`Webgl is not ready to create shader: ${this.name}`)
        }
        const gl = GlUtils.gl
        this._name = name

        this.vShader = this._loadShader(vSrc, gl.VERTEX_SHADER)
        this.fShader = this._loadShader(fSrc, gl.FRAGMENT_SHADER)

        this.program = this._create(this.vShader, this.fShader)
    }

    get name() { return this._name }

    _loadShader(src, shaderType) {
        const gl = GlUtils.gl
        const shader = gl.createShader(shaderType)

        gl.shaderSource(shader, src)
        gl.compileShader(shader)

        const error = gl.getShaderInfoLog(shader)
        if (Utils.isEmpty(error)) {
            throw new Error(`Error compiling shader ${this.name}: ${error}`)
        }

        return shader
    }

    _create(vShader, fShader) {

    }
}

export default Shader