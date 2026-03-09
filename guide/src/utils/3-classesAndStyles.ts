import {div, turbo} from "turbodombuilder";

//Through the toolkit's wrapper, you have access to a bunch of functions to
//manipulate elements' classes and styles.

const el = div();

//You can add/remove/toggle classes (like you would in native JavaScript), but with an additional level of
//error prevention and with a support for arrays or strings of space-separated classes.
turbo(el)
    .addClass("class1 class2 class3")
    .removeClass(["class1", "class2"])
    .toggleClass(["class2", "class3"]);
const b = turbo(el).hasClass("class1");

