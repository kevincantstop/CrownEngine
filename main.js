import './style.css'
import { Engine } from './crown'

let engine

window.onload = () => {
    engine = new Engine()

    engine.start()
    engine.resize()
}

window.onresize = () => {
    engine.resize()
}