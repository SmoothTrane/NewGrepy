class State{
  constructor(label){
    this.label = label;
    this.isAccept = false;
    this.outLinks = [];
    this.inLinks = [];
  }
  appendInLink(edge){
    this.inLinks.push(edge);
  }
  appendOutLink(edge){
    this.outLinks.push(edge);
  }

  containsOutLink(char){
    for(var i=0; i<this.outLinks.length; i++){
      var link = this.outLinks[i];
      if(link.read == char){
        return true;
      }
    }
    return false;
  }
  /*
  Moves from one state to the next
  */
  transition(char){
    var newState = new State();
    for(var i=0; i<this.outLinks.length; i++){
      var link = this.outLinks[i];
      if(link.read == char){
        newState = link.to;
      }
    }
    return newState;
  }
}
module.exports = State;
