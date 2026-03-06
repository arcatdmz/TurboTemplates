import {
    behavior, DefaultEventName,
    listener,
    Propagation,
    turbo,
    TurboDragEvent,
    TurboEvent,
    TurboInteractor
} from "turbodombuilder";
import {Component} from "./component";
import {ComponentView} from "./component.view";
import {ComponentModel} from "./component.model";

//An interactor is basically a place for grouping a bunch of event listeners that execute on the component
//(or maybe a sub-element inside the component).
//This helps to keep your code a bit more organized, especially if you have a lot of listeners.
//Generic types (<Component, ComponentView, ComponentModel>) are optional but useful for auto-completion.
export class ComponentInteractor extends TurboInteractor<Component, ComponentView, ComponentModel> {
    //The target that the listeners defined in this class will be attached to. By default, it's the component itself.
    //You can also define it as a getter to return a certain element (from the view maybe).
    public accessor target: Node;

    //If these listeners should be fired only when a certain tool is active, provide the tool's name here.
    public readonly toolName: string;

    //To add a listener to the target, you can define a @listener().
    //You can define the event type by passing it in as options to the @listener (as I did here).
    //In this example, when I click (fire the "turbo-click" event) on any element on screen with this tool active,
    //this function will execute. The target will be the element I clicked on.
    @behavior({type: "turbo-click"}) protected myBehavior(e: TurboEvent, target: Node) {
        //To propagate the event, stop propagation at this target, or immediately stop propagation (and not
        // execute any other listeners on this target), you can return one of these values.
        return Propagation.propagate || Propagation.stopPropagation || Propagation.stopImmediatePropagation;
    }

    //If you name the function something like clickStart and you don't pass in an event type,
    //by default, the toolkit will check if an event named "turbo-click-start" exists and use that in this case,
    //or fallback to using "click-start" as the event type.
    //This listener will be fired when the user starts clicking on the target ("turbo-click-start" event).
    @listener() protected clickStart(e: TurboEvent, target: Node) {
        //TurboEvent gives you some useful information.
        e.target; //The actual element the user interacted with (doesn't change, unlike the target parameter).
        e.clickMode; //The mouse/trackpad button (or number of fingers) the user used to interact.
        e.tool; //The tool active when this event was fired (if any).
        e.keys; //The keyboard keys pressed when the event was fired.
        e.eventName; //The name of the event. "turbo-click-start" in this case.
        e.position; //A Point indicating the screen position of the event fired.
        e.closest(Element); //Find the closest element of type "Element" to this event.
    }

    //This listener will be fired when the user drags the target ("turbo-drag" event).
    @listener() protected drag(e: TurboDragEvent, target: Node) {
        //TurboDragEvent gives you some additional useful information.
        e.positions; //The positions of all the points interacting (useful for multi-finger interaction).
        e.deltaPosition; //The delta position between this event's position and the last one.
        e.deltaPositions; //The delta positions of all the points interacting.
        e.origins; //The first recorded positions of all the interacting point when the drag started.
        e.previousPositions; //The positions at the previous event fired.
    }

    //Setup function called in the interactor's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Custom setup code
    }

    //Initialization method called automatically when you do Component.create() and the instance is assigned this
    //interactor, either through Component's static defaultProperties, or as a custom property passed in the
    //properties parameter for Component.create({...}).
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //If you prefer manually setting up your event listeners, you can do that here instead of using @listener().
    //This method is automatically called in the interactor's initialize() method.
    protected setupUIListeners(): void {
        super.setupUIListeners();
        //Example event listener added
        turbo(this.target).on(DefaultEventName.dragEnd, (e: TurboDragEvent) => {
            //Do some action...
        });
    }

    //Here are some useful fields and methods provided by the interactor
    private interactorAPI() {
        this.element; //The component this interactor is bound to.
        this.view; //The view of this interactor's component;
        this.model; //The model of this interactor's component;
    }
}