import {solver, SubstrateCallbackProperties, TurboNodeList, TurboQueue, TurboSubstrate} from "turbodombuilder";
import {Component} from "./component";
import {ComponentView} from "./component.view";
import {ComponentModel} from "./component.model";

//A substrate in this toolkit is a structure that maintains a set of "constraints" applied on a list of objects.
//Substrates live as part of an object they are attached to.
//An object can have one or more substrates attached to it, each defined by a string.
//The constraints in a substrate are defined primarily as "solvers", functions that execute after every event fired
//by the user (typically) on an object constrained by the substrate.
//Generic types (<Component, ComponentView, ComponentModel>) are optional but useful for auto-completion.
export class ComponentSubstrate extends TurboSubstrate<Component, ComponentView, ComponentModel> {
    //IMPORTANT!
    //Give your substrate a name. If you don't, it will not be created.
    public readonly substrateName: string = "my-substrate";

    //If many substrates are resolving at the same time (after an interaction with an object they all constrain maybe),
    //you can define which resolves first by giving it a higher priority.
    //A higher priority is equivalent to a lower number. By default, every substrate's priority is 10.
    public priority: number = 10;

    //The list of objects that the substrate constrains. It defaults to children of the element the substrate
    //is attached to. Check the documentation of TurboNodeList to see how to manipulate it.
    public objectList: TurboNodeList;

    //The list of objects that trigger the solving of the substrate. By default, it mirrors this.objectList, but you
    //can modify it to your needs. Check the documentation of TurboNodeList to see how to manipulate it.
    public triggerList: TurboNodeList;

    //When the substrate starts a round of solving, it will instantiate a queue that represents the objects, in order,
    //that it has to process. The first object in the queue is typically the object you interacted with.
    //For each object in the queue, it will execute the solvers.
    //Inside your solver functions (when solving), you can access the queue and manipulate it, to maybe dynamically
    //add objects to process as you go.
    public get queue(): TurboQueue<object> {
        return super.queue;
    }

    //The defaultQueue of the substrate represents the initial list or queue of objects assigned to the
    //substrate's queue when it starts a new round of solving.
    //By default, the defaultQueue is set to all objects in this.objectList, with the first entry in this queue
    //being the object that you interacted with (if applicable).
    public defaultQueue: object[] | TurboQueue<object>;

    //To avoid infinite loops, you can set a maximum number of passes allowed per object when solving the substrate.
    //The default value is 5.
    public maxPasses: number = 5;

    //You can create a solver by using @solver().
    //It will be executed for all objects in the queue when the substrate is solving.
    //The function takes a properties parameter (see SubstrateCallbackProperties).

    //To add a "constraint" to your substrate, you can define @solver() functions.
    //These functions are executed on this.queue automatically everytime you interact with an object in
    //this.triggerList in order to maintain your constraints.
    //Instead of explicitly defining your constraints, you define functions that uphold them.
    @solver() private mySolver(properties: SubstrateCallbackProperties) {
        //A solver takes a SubstrateCallbackProperties parameter. It contains:
        properties.target; //The target object from the queue currently being processed.
        properties.eventTarget; //The object that was interacted with.
        properties.eventType; //The type of event fired on the eventTarget.
        properties.event; //The event fired.
        properties.substrate; //The name of the substrate ("my-substrate" in this case).
        properties.substrateHost; //The object the substrate is attached to (a Component in this case).
        properties.toolName; //The name of the active tool when the event was fired (if any).
    }

    //Here are some useful fields and methods provided by the substrate
    private toolAPI() {
        this.element; //The component this substrate is bound to.
        this.view; //The view of this substrate's component;
        this.model; //The model of this substrate's component;

        //A delegate fired when an object is added/removed from this.objectList.
        //If the object is removed from the DOM only and the list contains an HTMLCollection (like the children
        //of the element the substrate is attached to for example), the delegate will not be fired.
        this.onObjectListChange;

        this.active; //Whether the substrate is active.
        this.getObjectPasses(undefined); //Get the number of passes for the provided object.
        this.getObjectData(undefined); //Get the "temporary" data of the provided object.
        this.setObjectData(undefined, {}); // Set the "temporary" data of the provided object.
    }

    //Setup function called in the substrate's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Custom setup code
    }

    //Initialization method called automatically when you do Component.create() and the instance is assigned this
    //substrate, either through Component's static defaultProperties, or as a custom property passed in the
    //properties parameter for Component.create({...}).
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }
}