import {Point, signal, TurboModel, randomColor} from "turbodombuilder";

//Model of the square element
export class SquareModel extends TurboModel {
    //@signal turns any kind of simple field (like a string or a number) into a smart entity.
    //When the value of the @signal changes, it will notify and re-execute all the @effect
    //functions that read the @signal.
    @signal color: string = randomColor([60, 90], [40, 70]);
    @signal position: Point = new Point();
    @signal size: number = 100;
    @signal name: string = "Square";
}