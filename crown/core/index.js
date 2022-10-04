import GlUtils from "@core-gl/gl"
import Shader from "@core-gl/shader"
import { Buffer, AttributeInfo } from "@core-gl/buffer.js"

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

        this.resize()
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
        const { gl, canvas, buffer } = this

        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clear(gl.COLOR_BUFFER_BIT)

        buffer.bind()
        buffer.draw()

        requestAnimationFrame(() => this._loop())
    }

    _createBuffer() {
        const buffer = new Buffer(3)
        buffer.append([
            0,   0,   0,
            0,   0.5, 0,
            0.5, 0.5, 0
        ])
        buffer.addAttributeInfo(new AttributeInfo(
            this.shader.attribute('a_position'),
            3,
            0
        ))
        buffer.unbind()
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