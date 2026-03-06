import {define, TurboElement} from "turbodombuilder";
import "./canvas.css";
import {CanvasSnapSubstrate} from "./canvas.snapSubstrate";

@define("my-canvas")
export class Canvas extends TurboElement {
    public static defaultProperties = {
        substrates: [CanvasSnapSubstrate],
    }
}