import GlUtils from "@core-gl/gl"
import Shader from "@core-gl/shader"

import Utils from "@crown/utils"

class Engine {
    constructor() {
        GlUtils.initialize()

        this.canvas = GlUtils.canvas
        this.gl = GlUtils.gl
    }

    start() {
        const { gl } = this

        gl.clearColor(0, 0, 0, 1)

        this._loadShaders()
        this._createBuffer()

        this._loop()
    }

    resize() {
        if (!Utils.isUndefined(this.canvas)) {
            const { innerWidth, innerHeight } = window

            this.canvas.width = innerWidth
            this.canvas.height = innerHeight
        }
    }

    _loop() {
        const { gl } = this

        gl.clear(gl.COLOR_BUFFER_BIT)

        requestAnimationFrame(() => this._loop())
    }

    _createBuffer() {
        const { gl } = this
        const buffer = new Float32Array([
            0,   0,   0,
            0,   0.5, 0,
            0.5, 0.5, 0
        ])
    }

    _loadShaders() {
        const vShaderSrc = `
            attribute vec3 a_position;
            
            void main() {
                gl_Position = vec4(a_position, 1.0);
            }
        `
        const fShaderSrc = `
            precision mediump float;
            
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `
    }
}

export default Engine;