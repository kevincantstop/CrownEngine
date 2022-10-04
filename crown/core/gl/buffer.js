import GlUtils from "@core-gl/gl"

class AttributeInfo {
    constructor(location, size, offset) {
        this.location = location
        this.size = size
        this.offset = offset
    }
}

class Buffer {
    /**
     *
     * @param elementSize size of each component
     * @param dataType defaults to gl.FLOAT
     * @param target defaults to gl.ARRAY_BUFFER
     * @param mode drawing mode defaults to gl.TRIANGLES
     */
    constructor(elementSize, dataType, target, mode) {
        if (!GlUtils.isOK) {
            throw new Error(`Webgl is not ready to create buffer.`)
        }
        const gl = GlUtils.gl

        this.gl = gl
        this.typeSize = 0
        this.data = []
        this.hasAttribs = false

        this.elementSize = elementSize
        this.dataType = dataType || gl.FLOAT
        this.targetBufferType = target || gl.ARRAY_BUFFER
        this.mode = mode || gl.TRIANGLES
        this.attributes = []

        switch (this.dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                this.typeSize = 4
                break
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                this.typeSize = 2
                break
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                this.typeSize = 1
                break
            default:
                throw new Error(`Unrecognized data type.`)
        }

        this.buffer = gl.createBuffer()
        this.stride = this.elementSize * this.typeSize
    }

    bind(normalized = false) {
        const { gl } = this
        gl.bindBuffer(this.targetBufferType, this.buffer)

        if (this.hasAttribs) {
            for (const attrib of this.attributes) {
                gl.vertexAttribPointer(attrib.location, attrib.size, this.dataType, normalized, this.stride, attrib.offset * this.typeSize)
                gl.enableVertexAttribArray(attrib.location)
            }
        }
    }

    unbind() {
        const { gl } = this
        for (const attrib of this.attributes) {
            gl.disableVertexAttribArray(attrib.location)
        }
        gl.bindBuffer(this.targetBufferType, null)
    }

    addAttributeInfo(info) {
        this.hasAttribs = true
        this.attributes.push(info)
    }

    append(data) {
        const { gl } = this

        this.data = [...this.data, ...data]
        gl.bindBuffer(this.targetBufferType, this.buffer)

        let bufferData
        switch (this.dataType) {
            case gl.FLOAT:
                bufferData = new Float32Array(this.data)
                break
            case gl.INT:
                bufferData = new Int32Array(this.data)
                break
            case gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this.data)
                break
            case gl.SHORT:
                bufferData = new Int16Array(this.data)
                break
            case gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this.data)
                break
            case gl.BYTE:
                bufferData = new Int8Array(this.data)
                break
            case gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this.data)
                break
        }
        gl.bufferData(this.targetBufferType, bufferData, gl.STATIC_DRAW)
    }

    draw() {
        const { gl } = this
        if (this.targetBufferType === gl.ARRAY_BUFFER) {
            gl.drawArrays(this.mode, 0, this.data.length / this.elementSize)
        } else if (this.targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this.mode, this.data.length, this.dataType, 0)
        }
    }

    destroy() {
        const { gl } = this
        gl.deleteBuffer(this.buffer)
    }
}

export {
    AttributeInfo,
    Buffer
}