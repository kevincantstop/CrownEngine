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

        this.program = this._createProgram(this.vShader, this.fShader)
    }

    get name() { return this._name }

    use() {
        const gl = GlUtils.gl
        gl.useProgram(this.program)
    }

    _loadShader(src, shaderType) {
        const gl = GlUtils.gl
        const shader = gl.createShader(shaderType)

        gl.shaderSource(shader, src)
        gl.compileShader(shader)

        const error = gl.getShaderInfoLog(shader)
        if (!Utils.isEmpty(error)) {
            throw new Error(`Error compiling shader "${this.name}": ${error}`)
        }

        return shader
    }

    _createProgram(vShader, fShader) {
        const gl = GlUtils.gl
        const program = gl.createProgram()

        gl.attachShader(program, vShader)
        gl.attachShader(program, fShader)

        gl.linkProgram(program)

        const error = gl.getProgramInfoLog(program)
        if (!Utils.isEmpty(error)) {
            throw new Error(`Error link program "${this.name}": ${error}`)
        }
        return program
    }
}

export default Shader