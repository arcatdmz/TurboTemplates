import {listener, turbo, TurboEvent, TurboInteractor} from "turbodombuilder";
import {Square} from "./square";
import {SquareView} from "./square.view";
import {SquareModel} from "./square.model";

//An interactor defined for the Square class.
//An interactor is basically a place for grouping a bunch of event listeners that execute on the Square
//(or maybe a sub-element inside the Square).
//This helps to keep your code a bit more organized, especially if you have a lot of listeners
export class SquareInteractor extends TurboInteractor<Square, SquareView, SquareModel> {
    //The target of the listeners defined in this class.
    //We are adding listeners to nameElement in this case.
    public get target(){return this.view?.nameElement}

    //A click event listener that will be dynamically added to the target when the component is created.
    //You can define the event type by passing it in as options to the @listener (as I did here).
    @listener({type: "turbo-click"}) private click(e: TurboEvent) {
        //Logging that the target was clicked and at which position.
        //The passed event (if it is a TurboEvent) gives you some useful context for the event.
        console.log("Clicked", this.target, "at", e.scaledPosition);
        this.view.nameElement.focus();
    }

    //If you name the function something like clickStart and you don't pass in an event type,
    //By default, the toolkit will check if an event named "turbo-click-start" exists and use that in this case,
    //or fallback to using "click-start" as the event type.
    @listener() private clickStart() {
        //On click start --> change text color to green
        turbo(this.target).setStyle("color", "green");
    }

    @listener() private clickEnd() {
        //On click end --> change text color back to black
        turbo(this.target).setStyle("color", "black");
    }
}