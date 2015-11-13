let greeting = [
  {
    // match a request for the key "greeting"
    route: "greeting",
    // respond with a PathValue with the value of "Hello World."
    get: function() {
      return {path:["greeting"], value: "Hello World"};
    }
  }
];

export default greeting;