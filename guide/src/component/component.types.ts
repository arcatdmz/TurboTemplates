//Type representing data associated with a Component.
//You don't have to create something like that, but it's useful for auto-completion.
//Here I just defined the data to be an object (defined between {...}), containing an
// optional (? symbol) string "a", an optional string "b", and an optional number "x".
export type ComponentData = {
    a?: string,
    b?: string,
    x?: number
};