import {TurboQueue, TurboSubstrate} from "turbodombuilder";
import {Component} from "./component";
import {ComponentView} from "./component.view";
import {ComponentModel} from "./component.model";

//A substrate in this toolkit is a structure that maintains a set of "constraints" applied on a list of objects.
//Substrates live as part of an object they are attached to.
//An object can have one or more substrates attached to it, each defined by a string.
//The constraints in a substrate are defined primarily as "solvers", functions that execute after every event fired
//by the user on an object constrained by the substrate.
//Generic types (<Component, ComponentView, ComponentModel>) are optional but useful for auto-completion.
export class ComponentSubstrate extends TurboSubstrate<Component, ComponentView, ComponentModel> {
    //IMPORTANT!
    //Give your substrate a name. If you don't, it will not be created.
    public readonly substrateName: string = "my-substrate";

    //If many substrates are resolving at the same time (after an interaction with an object they all constrain maybe),
    //you can define which resolves first by giving it a higher priority.
    //A higher priority is equivalent to a lower number. By default, every substrate's priority is 10.
    public priority: number = 10;


    public defaultQueue: object[] | TurboQueue<object>;

    /**
     * @description The maximum number of passes allowed per object for this substrate during resolving.
     * This helps prevent infinite cycles in constraint propagation. Defaults to 5.
     */
    public maxPasses: number;

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

    //Here are some useful fields and methods provided by the substrate
    private toolAPI() {
        this.element; //The component this substrate is bound to.
        this.view; //The view of this substrate's component;
        this.model; //The model of this substrate's component;
    }
}