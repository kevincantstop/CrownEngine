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

        this.shader.use()

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

        gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)

        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(0)

        gl.drawArrays(gl.TRIANGLES, 0, 3)

        requestAnimationFrame(() => this._loop())
    }

    _createBuffer() {
        const { gl } = this
        const points = new Float32Array([
            0,   0,   0,
            0,   0.5, 0,
            0.5, 0.5, 0
        ])

        const buffer = gl.createBuffer()

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        this.buffer = buffer
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
        this.shader = new Shader('basic', vShaderSrc, fShaderSrc)
    }
}

export default Engine;