import {
  Point,
  solver,
  SubstrateCallbackProperties,
  turbo,
  TurboQueue,
  TurboSubstrate,
} from "turbodombuilder";

export class CanvasSnapSubstrate extends TurboSubstrate {
  substrateName = "snap";

  defaultQueue: object[] | TurboQueue<object> = [];

  initialize() {
    super.initialize();
    this.active = false;
  }

  @solver() snapObject(properties: SubstrateCallbackProperties) {
    if (
      !("position" in properties.target) ||
      !(properties.target.position instanceof Point)
    ) {
      return;
    }

    const target = properties.target as any as HTMLElement;
    // const feedforward = turbo(properties.target).feedforward();

    const { position } = properties.target;
    const snapX = Math.round(position.x / 50) * 50;
    const snapY = Math.round(position.y / 50) * 50;

    if (properties.eventType === "turbo-drag-end") {
      properties.target.position = new Point(snapX, snapY);
      target.style.opacity = "1";
    } else if (properties.eventType === "turbo-drag") {
      const feedforward = turbo(properties.target).feedforward();
      feedforward.position = new Point(snapX, snapY);
      turbo(this).addChild(feedforward as any);
      target.style.opacity = "0";
    }
  }
}
