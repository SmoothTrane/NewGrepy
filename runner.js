const State = require("./state");
const NFA = require('./nfa');
const graphviz = require("graphviz");


var nfa = new NFA();


/*
Standard input reader
*/
var fs = require('fs'), input = process.argv[3],
regex = process.argv[2];
fs.readFile(input, 'utf8', function(err, data) {
  if (err) throw err;
  if(matches(regex,data)){
    console.log(data);
  }
});


/*
Detects whether the state contains the appropriate links
*/
function searchNfa(state, char){
  if(state.containsOutLink(char)){
    return state;
  }
  return null;
}

/*
Detects whether a regex string is matchable within this
NFA
*/

function matches(regex, string){
  var matchNFA = parseNfa(regex);
  var currentState = matchNFA.initialState;
  var tmpState = new State();
  for(var i=0; i<string.length; i++){
    tmpState = searchNfa(currentState, string[i]);
    if(tmpState == null ){
      return false;
    }
    currentState = tmpState.transition(string[i])
    if(currentState.isAccept){
      return true;
    }

  }

}
/*
Parses a regex input into an appropriate NFA form
*/
function parseNfa(regex){
  var nfa = new NFA();
  var bracket = [];
  var i = 0;
  while(i<regex.length){
    nfa.addState(regex[i]);
    i++;
  }
  return nfa;
}
