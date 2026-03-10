import { define, TurboElement } from "turbodombuilder";
import { CanvasSnapSubstrate } from "./canvas,snapSubstrate";

import "./canvas.css";

@define("my-canvas")
export class Canvas extends TurboElement {
  static defaultProperties = {
    substrates: CanvasSnapSubstrate,
  };
}
