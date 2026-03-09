import {TurboController} from "turbodombuilder";
import {Component} from "./component";
import {ComponentView} from "./component.view";
import {ComponentModel} from "./component.model";

//A controller is basically a place for grouping a bunch of logic operations that you do internally in the component, 
//or even externally sometimes.
//For example, if your component contains a video feed, you could imagine a controller for manipulating the
//playback of this video.
//This helps to keep your code a bit more organized, especially if you have a lot of functions in your component file.
//Generic types (<Component, ComponentView, ComponentModel>) are optional but useful for auto-completion.
export class ComponentController extends TurboController<Component, ComponentView, ComponentModel> {
    //The name of the controller. Important to access it from the component (if needed).
    //If you don't provide it, the toolkit will attempt to infer it from the class name by removing the word
    //"Controller" at the end (if present), and the name of the component
    //("Component" in this case) from the beginning.
    //Handlers, interactors, substrates, and tools function similarly.
    public keyName = "video";

    //Setup function called in the controller's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Custom setup code
    }

    //Initialization method called automatically when you do Component.create() and the instance is assigned this
    //controller, either through Component's static defaultProperties, or as a custom property passed in the
    //properties parameter for Component.create({...}).
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //If you prefer manually setting up your event listeners, you can do that here instead of using @listener().
    //This method is automatically called in the controller's initialize() method.
    protected setupUIListeners(): void {
        super.setupUIListeners();
        //Add event listeners here if you need to.
    }

    //Here are some useful fields and methods provided by the controller
    private controllerAPI() {
        this.element; //The component this controller is bound to.
        this.view; //The view of this controller's component;
        this.model; //The model of this controller's component;
    }
}