const State = require("./state");
class NFA{
  constructor(){
    this.initialState = new State();
    this.currentState = this.initialState;

  }
  /*
    Appends a new state into the NFA
  */
  addState(char){
    const newState = new State();
    const edge = {
      "read": char,
       "to": newState,
       'from': this.currentState
    };
    this.currentState.appendOutLink(edge);
    newState.appendInLink(edge);
    newState.isAccept = true;
    this.currentState.isAccept = false;
    this.currentState = newState;

    return newState;

  }
}
module.exports = NFA;
