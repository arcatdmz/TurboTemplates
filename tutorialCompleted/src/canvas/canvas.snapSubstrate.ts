import {
    Coordinate, DefaultEventName,
    Point,
    solver,
    SubstrateCallbackProperties,
    TurboDragEvent,
    TurboSubstrate
} from "turbodombuilder";

//Canvas snap substrate
//A substrate is attached to an object and maintains a set of constraints applied on certain objects.
//An object can have many substrates, each defined by a string.
//By default, substrates constrain the children of the element they are attached to, but you can configure it.
//The constraints are defined primarily as "solvers," functions that execute after every event fired by the user on an
//object constrained by the substrate.
//This is a small overview of the many features of this construct.
export class CanvasSnapSubstrate extends TurboSubstrate {
    //Define the substrate's name. Equivalent to turbo(canvas).makeSubstrate("snap").
    public substrateName = "snap";

    //The size of the snap grid
    public gridSize = 40;

    //To understand better what this default queue does:
    //When you interact with an object constrained by the substrate, the substrate will attempt to solve itself.
    //By default, it will start by solving the object you interacted with (passing it to its defined solvers),
    //then process all other objects constrained by the substrate.
    //This behavior is defined by the default queue, which is set to all objects constrained by the substrate.
    //When solving, the substrate will create a queue based on this default queue, and go through it,
    //solving for each object.
    //You can also dynamically add/remove objects to/from the queue while solving.
    //Here, we cleared the default queue to only solve for the object that the user manipulated.
    public defaultQueue = [];

    public initialize() {
        super.initialize();
        //Deactivate the substrate, so it doesn't snap objects (unless when the "snap select" tool is active)
        this.active = false;
    }

    //You can create a solver by using @solver().
    //It will be executed for all objects in the queue when the substrate is solving.
    //The function takes a properties parameter (see SubstrateCallbackProperties).
    @solver() protected snapElement(properties: SubstrateCallbackProperties) {
        //If not drag end --> return
        if (properties.eventType !== DefaultEventName.dragEnd) return;
        //If event target is not an element --> return
        if (!(properties.eventTarget instanceof Element)) return;
        //Get "position" coordinate or point from the event target. Return if invalid
        const position: Coordinate = properties.eventTarget?.["position"];
        if (!position || typeof position !== "object") return;
        //Move the position to the closest point on the grid.
        const snappedX = Math.round(position.x / this.gridSize) * this.gridSize;
        const snappedY = Math.round(position.y / this.gridSize) * this.gridSize;
        this.applyMove(properties.eventTarget, new Point(snappedX, snappedY));
    }

    /**
     * @description Attempts to move an element to new position.
     * @param {Element} element - The element to move.
     * @param {Point} newPosition - The new position.
     * @return Whether the element was moved.
     * @protected
     */
    protected applyMove(element: Element, newPosition: Point): boolean {
        //If element is undefined, not an Element, or doesn't have a position field --> return.
        if (!element || !(element instanceof Element) || !("position" in element)) return false;
        //If the element's position is not an object --> return.
        const position = element.position;
        if (typeof position !== "object") return false;
        element.position = newPosition;
        return true;
    }
}