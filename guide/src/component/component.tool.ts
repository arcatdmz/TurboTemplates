import {
    behavior,
    ClickMode,
    DefaultEventName,
    DefaultEventNameEntry,
    Propagation, turbo, TurboDragEvent, TurboEvent,
    TurboTool
} from "turbodombuilder";
import {Component} from "./component";
import {ComponentView} from "./component.view";
import {ComponentModel} from "./component.model";

//A tool (or instrument) is an "object" that you can pick up and apply on other objects to manipulate them.
//In this toolkit, a tool is defined only by a string ("select" in this case).
//While you can create this tool as part of a web component (in this case as part of Component),
//the tool lives on its own. You can instantiate another component that has the same ComponentTool,
//and when you click on either component, both will be active and selected.
//The tool has access to the component, the view, and the model.
//Generic types (<Component, ComponentView, ComponentModel>) are used for auto-completion,
//but you can omit them.
export class ComponentTool extends TurboTool<Component, ComponentView, ComponentModel> {
    //IMPORTANT!
    //Give your tool a name. If you don't, it will not be created.
    public toolName: string = "my-tool";

    //If your tool is embedded and not in-hand (check Beaudouin-Lafon's 2000 paper on instrumental interaction),
    //define the object it is bound to here.
    //An in-hand tool is the most natural concept of a "tool", which you pick up and apply. You can think of a brush
    //in a painting software as an in-hand tool, because you pick it up to apply it on a canvas.
    //An embedded tool is a tool attached to an object. Manipulating this tool would result in manipulating the
    //object it is attached to. A very common example of an embedded tool is the resizing handles in any
    //creativity-support tool that show up when selecting a shape or an image to resize it. These handles are tools
    //that resize an object, and are attached to an image or shape.
    public readonly embeddedTarget: Node;

    //If you want the tool to activate automatically when you interact with the component it is bound to,
    //you can define here the event type that will trigger the activation.
    //By default, when you click on the component the tool is bound to, the tool will be activated.
    public readonly activationEvent: DefaultEventNameEntry = DefaultEventName.click;

    //You can also define with which mouse/trackpad button the tool is activated. By default,
    //it is activated with a left-click (or a one-finger tap on touch devices).
    public readonly clickMode: ClickMode = ClickMode.left;

    //If you want to activate this tool when pressing a certain keyboard key, you can define it here.
    //For example, if you set it to "Control", holding down the Ctrl key on the keyboard will activate
    //this tool. Releasing the Ctrl key will switch back to the previous active tool.
    public readonly key: string;

    //To add a functionality to this tool, you can define a @behavior()
    //A behavior is basically an event listener that is not attached to any specific element.
    //When you interact with any element in the interface with this tool active, the behavior(s) defined with the
    //corresponding interaction type (if any) will be executed.

    //The target parameter in the method is the current object being processed by the tool.
    //At first, the target is the element the user directly interacted with. If the behavior is set to propagate,
    //the method will be called again with, as target this time, the parent of the element, and so on until propagation
    //is stopped or the propagation reaches the body of the HTML document.

    //You can define the event type by passing it in as options to the @behavior (as I did here).

    //In this example, when I click (fire the "turbo-click" event) on any element on screen with this tool active,
    //this function will execute. The target will be at first the element I clicked on.
    @behavior({type: "turbo-click"}) protected myBehavior(e: TurboEvent, target: Node) {
        //To propagate, stop propagation at this target, or immediately stop propagation (and not execute any other
        //behaviors on this target), you can return one of these values.
        return Propagation.propagate || Propagation.stopPropagation || Propagation.stopImmediatePropagation;
    }

    //If you name the function something like clickStart and you don't pass in an event type,
    //by default, the toolkit will check if an event named "turbo-click-start" exists and use that in this case,
    //or fallback to using "click-start" as the event type.

    //This behavior will be fired when the user starts clicking on an element ("turbo-click-start" event).
    @behavior() protected clickStart(e: TurboEvent, target: Node) {
        //TurboEvent gives you some useful information.
        e.target; //The actual element the user interacted with (doesn't change, unlike the target parameter).
        e.clickMode; //The mouse/trackpad button (or number of fingers) the user used to interact.
        e.tool; //The tool active when this event was fired (it's gonna be "my-tool" in this case).
        e.keys; //The keyboard keys pressed when the event was fired.
        e.eventName; //The name of the event. "turbo-click-start" in this case.
        e.position; //A Point indicating the screen position of the event fired.
        e.closest(Element); //Find the closest element of type "Element" to this event.
    }

    //This behavior will be fired when the user drags an element ("turbo-drag" event).
    @behavior() protected drag(e: TurboDragEvent, target: Node) {
        //TurboDragEvent gives you some additional useful information.
        e.positions; //The positions of all the points interacting (useful for multi-finger interaction).
        e.deltaPosition; //The delta position between this event's position and the last one.
        e.deltaPositions; //The delta positions of all the points interacting.
        e.origins; //The first recorded positions of all the interacting point when the drag started.
        e.previousPositions; //The positions at the previous event fired.
    }

    //If you don't want the tool to activate on a certain event, but want a custom activation mechanism,
    //you can define it in this function here. It overrides this.activationEvent and nullifies it.
    public customActivation(element: Component) {
        //Custom activation code for the tool.
    }

    //If you want to specify a behavior when the tool is activated, you can do that here.
    public onActivate() {
        //Code to execute when the tool is activated.
    }

    //If you want to specify a behavior when the tool is deactivated, you can do that here.
    public onDeactivate() {
        //Code to execute when the tool is deactivated.
    }

    //Setup function called in the tool's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Custom setup code
    }

    //Initialization method called automatically when you do Component.create() and the instance is assigned this
    //tool, either through Component's static defaultProperties, or as a custom property passed in the
    //properties parameter for Component.create({...}).
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //If you prefer manually setting up your tool behaviors, you can do that here instead of using @behavior().
    //This method is automatically called in the tool's initialize() method.
    protected setupUIListeners(): void {
        super.setupUIListeners();
        //Example tool behavior added
        turbo(this).addToolBehavior(DefaultEventName.dragEnd, (e: TurboDragEvent, target: Node) => {
            //Do some action...
        }, this.toolName);
    }

    //Here are some useful fields and methods provided by the tool
    private toolAPI() {
        this.element; //The component this tool is bound to.
        this.view; //The view of this tool's component;
        this.model; //The model of this tool's component;
    }
}