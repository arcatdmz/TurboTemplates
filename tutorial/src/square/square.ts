import { Point, TurboElement, define, effect, signal } from "turbodombuilder";
import "./square.css";

@define("demo-square")
export class Square extends TurboElement {
  @signal position: Point;
  @signal color: string = "red";
  @signal name: string = "Square";
  @signal size: number = 100;

  @effect updatePosition() {
    this.style.top = this.position.y + "px";
    this.style.left = this.position.x + "px";
  }

  @effect updateColor() {
    this.style.backgroundColor = this.color;
  }

  @effect updateName() {
    this.setAttribute("data-name", this.name);
  }

  @effect updateSize() {
    this.style.width = this.size + "px";
    this.style.height = this.size + "px";
  }
}
