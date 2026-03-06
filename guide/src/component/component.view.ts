import {effect, p, turbo, TurboView} from "turbodombuilder";
import {Component} from "./component";
import {ComponentModel} from "./component.model";

//View class inspired by MVC and PAC
//The view typically holds all information related to how the Component is rendered,
//including sub-elements that live inside it, event listeners triggered on user action, and @effect functions that
//update the Component when data in the model changes.
//The view has access to the component and its model only.
//Generic types (<Component, ComponentModel>) are used for auto-completion, but you can omit them.
export class ComponentView extends TurboView<Component, ComponentModel> {
    //A paragraph element stored in a local field.
    public paragraphElement: HTMLParagraphElement;

    //Setup function called in the view's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Add code...
    }

    //Initialization method called automatically when you do Component.create() and the instance is assigned this view,
    //either through Component's static defaultProperties, or as a custom property passed in the properties
    //parameter for Component.create({...}).
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //Setup method where you can create your sub-elements.
    //You don't have to create them here, but it's a useful structure to organize your code.
    //This method is automatically called in the view's initialize() method, which you can also overwrite.
    protected setupUIElements() {
        super.setupUIElements();
        //Create a paragraph.
        this.paragraphElement = p();
    }

    //Setup method where you can add your sub-elements to the DOM.
    //You don't have to use this, but it's a useful structure to organize your code.
    //Again, this method is automatically called in the view's initialize() method.
    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild(this.paragraphElement);
    }

    //Setup method where you can add event listeners to your element or sub-elements.
    //You don't have to use this, but it's a useful structure to organize your code.
    //Again, this method is automatically called in the view's initialize() method.
    protected setupUIListeners() {
        super.setupUIListeners();
        //Attach event listeners here if you need to
    }

    //@effect methods are called automatically when the values of the signals they use change
    //This @effect will be called everytime the value of a or b in the model changes.
    @effect private updateParagraph() {
        this.paragraphElement.textContent = this.model.a + " " + this.model.b;
    }

    //Here are some useful fields and methods provided by the view
    private viewAPI() {
        this.element; //The component this view is bound to.
        this.model; //The model of this view's component;
    }
}