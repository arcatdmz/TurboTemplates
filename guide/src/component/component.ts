import {controller, define, expose, interactor, substrate, tool, TurboElement} from "turbodombuilder";
import {ComponentView} from "./component.view";
import {ComponentData} from "./component.types";
import {ComponentModel} from "./component.model";
import {ComponentInteractor} from "./component.interactor";
import {ComponentTool} from "./component.tool";
import {ComponentSubstrate} from "./component.substrate";
import {ComponentController} from "./component.controller";
import {ComponentHandler} from "./component.handler";

//To create a custom web component, create a new class and extend TurboElement. Simple.
//You also have to define it for the browser using @define(), passing it the tag of the component.
//The tag should be at least two words separated by a dash (like "my-component" for example).
//Generic types (<ComponentView, ComponentData, ComponentModel>) are used for auto-completion,
//but you can omit them.
@define("my-component")
export class Component extends TurboElement<ComponentView, ComponentData, ComponentModel> {
    //If you want to "expose" a field from the model, the view, or any field inside this component,
    //you can use @expose(``fieldName``) before defining the field.
    //You can see here, I exposed the string "a" from the model using @expose() instead of
    //writing a getter and a setter for the field in the model.
    @expose("model") public a: string;

    //If I only want to expose a getter and don't want to allow setting the field,
    //I can pass false as second parameter.
    @expose("model", false) public b: string;

    //To retrieve a controller attached to this component, you can use the @controller()
    //decorator. In this case, this.videoController will contain the controller
    //with keyName = "video".
    @controller() protected videoController: ComponentController;

    //You can also retrieve interactors, tools, and substrates.
    //For handlers, I usually retrieve them in the model, but you can do it here too.
    @interactor() protected interactor: ComponentInteractor;
    @tool() protected tool: ComponentTool;
    @substrate() protected substrate: ComponentSubstrate;

    //Here are some useful fields and methods provided by the view
    private componentAPI() {
        this.model; //The model of this component.
        this.view; //The view of this component.
        this.data; //The data of this component.
        this.dataSize; //The size of this component's data.
        this.selected; //Whether the component is "selected" (has "selected" CSS class by default).
        this.initialized; //Whether the component was initialized. Readonly.

        //Static function to create a new component. You can pass in properties to apply to this newly-created
        //component, such as CSS styles, CSS classes, ID, parent, children, data, etc.
        Component.create({});

        this.onAttach; //Delegate fired when the component is attached to the DOM.
        this.onAdopt; //Delegate fired when the component changes parent in the DOM.
        this.onDetach; //Delegate fired when the component is removed from the DOM;

        this.clone({}); //Create a clone of this instance, with optional configuration.
        this.feedforward({}); //Create or retrieve a feedforward clone of this instance.
    }

    //When creating a new Component, if you want certain properties/fields to be filled automatically with
    //default values (but you're still able to override them by passing custom values for these properties when
    //creating your components), you can define these defaults in this static properties object.
    public static defaultProperties = {
        //As you can see, you can pass in a class for the model, view, interactors, etc.
        //So the component will instantiate a model/view/interactor/etc. of the provided class and
        //initialize it accordingly.
        //However, you could also set them to instances that you created yourself.
        model: ComponentModel,
        view: ComponentView,
        //Tools, substrates, interactors, controllers, and handlers can take a single entry, or an array.
        tools: ComponentTool,
        substrate: ComponentSubstrate,
        interactors: ComponentInteractor,
        controllers: ComponentController,
        handlers: ComponentHandler,
        //You can also pass in a default data
        data: {a: "hello", b: "world", x: 4},
    }

    //You can define default properties and styles to be applied to feedforward clones created.
    public defaultFeedforwardProperties = {
        classes: "feedforward",
    }

    //Initialization method called automatically when you do Component.create().
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //Setup method where you can create your sub-elements. Useful if you don't want to create a separate view
    //but still want some structure in your component.
    //This method is automatically called in the initialize() method, which you can also overwrite.
    protected setupUIElements() {
        super.setupUIElements();
        //Create sub-elements here.
    }

    //Setup method where you can add your sub-elements to the DOM. Useful if you don't want to create a
    //separate view but still want some structure in your component.
    //Again, this method is automatically called in the initialize() method.
    protected setupUILayout() {
        super.setupUILayout();
        //Set up your layout here by adding sub-elements to this component's tree.
    }

    //Setup method where you can add event listeners to your element or sub-elements.
    //Useful if you don't want to create a separate view but still want some structure in your component.
    //Again, this method is automatically called in the initialize() method.
    protected setupUIListeners() {
        super.setupUIListeners();
        //Attach event listeners here if you need to.
    }
}