import './style.css'
import { Engine } from './crown'

let engine

window.onload = () => {
    engine = new Engine()
    engine.start()
}

window.onresize = () => {
    engine.resize()
}