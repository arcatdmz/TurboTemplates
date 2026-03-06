import {TurboTool, TurboDragEvent, Coordinate, Propagation, behavior} from "turbodombuilder";

//Select tool
//A tool (or instrument) is an "object" that you can pick up and apply on other objects to manipulate them.
//In this toolkit, a tool is defined only by a string ("select" in this case).
//While you can create this tool as part of a web component (in this case a button as seen in main.ts),
//The tool lives on its own. You can instantiate another button that has a SelectTool, and when you
//click on either button, both will be active and selected.
export class SelectTool extends TurboTool {
    public toolName = "select"; //Define the tool name

    //You can add a "behavior" to the tool (basically an event listener for the tool that dictates what happens when
    //you interact with it on a component. This is very similar to regular event listeners,
    // except that it does not depend on a specific target. The target depending on what component you interact with.
    //This function adds a "turbo-drag" behavior to the "select" tool to move compatible components.
    //Equivalent to turbo(tool).addToolBehavior("turbo-drag", "select", (e, el) => {...});
    @behavior() public drag(e: TurboDragEvent, el: Node) {
        try {
            //Attempting to move() the target, translate() it, or increment its position.
            if ("move" in el && typeof el.move === "function") el.move(e.deltaPosition);
            else if ("translate" in el && typeof el.translate === "function") el.translate(e.deltaPosition);
            else if ("position" in el && typeof el.position === "object") el.position = e.deltaPosition.add(el.position as Coordinate);
            //If none exists, propagate.
            else return Propagation.propagate;
            return Propagation.stopPropagation;
        } catch (e) {return Propagation.stopPropagation}
    }
}