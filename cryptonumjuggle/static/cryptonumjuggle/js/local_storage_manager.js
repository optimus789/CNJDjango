var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

walletaddress = ""
data2= {}
var mainstore = window.localStorage;
mainstore.setItem("wltaddr","0");

//key = 0 to check if loggedin or not

var count = 1

setInterval(function(){ 
  //var gamevarstate = data2["gameState"].replace(/"/g, "*");
  var gamevarstate =  data2["gameState"].replace(/"/g, "@");
  //console.log(gamevarstate);
  //console.log("Testing: "+JSON.stringify(gamevarstate));
  if(count==2 || count==1){
    $.ajax({
      type: "POST",   
      url: "http://localhost:8000/setitem/",
      data: {"gameState" : JSON.stringify(gamevarstate),
              "wltaddr" : String(mainstore.getItem("wltaddr"))},
      async:false,
      success: function(){
        //console.log("Success POST")
      },
      error: function(){
       // console.log("POST failed")
      }
      });
  }
  else {
    $.ajax({
      type: "POST",  
      url: "http://localhost:8000/setitem/",
      data: {"gameState" : JSON.stringify(gamevarstate),
              "wltaddr" : String(mainstore.getItem("wltaddr"))},
      success: function(){
      //  console.log("Success POST")
      },
      error: function(){
       // console.log("POST failed")
      }
      });
    }
    if(count<=2){
      count=count+1
    }
    
  
  
}, 4000);


  


/*function renderList(data) {
alert(data);
}*/


function bestScoreSave() {
  /*
var wltaddr = String(mainstore.getItem("wltaddr"))
          
  RemixContract.setBest(wltaddr,bestScoreBlock).then(function(transaction){
  console.log(transaction);
  alert("Sent");
  return transaction;
  });

  */
}

//to send to sqlite left

//etimer = gamestate
//ltime = getBestScore //on blockchain

window.fakeStorage = {
  

  //if else according to ids .... i.e from sqlite or blockchain
//position
  setItem: function (id, val) {
      //console.log("setting some value: "+String(val)+" with id:"+String(id));
      
      return data2[id] = String(val);
    
  },
 

  
  //best score fetching
  getItem: function (id) {
    if(String(id)=="gameState"){
     // console.log(mainstore.getItem("wltaddr"));
        $.ajax({
          type: 'GET',
          async: false,
          url: "http://localhost:8000/getitem/",
          data: {"wltaddr" : String(mainstore.getItem("wltaddr"))},
          
          success:  function(data){
            var gamestatevar = String(data).replace(/@/g, '"');
            
            data2[id] = String(gamestatevar.slice(1,-1));
            
           // console.log("getting some value: "+data2[id]+" with id:"+String(id) );
   
            }
            });

            return data2[id]
    }
    else if (String(id)=="bestScore") {
        //var wltaddr = String(mainstore.getItem("wltaddr"));

        var callBestScore = RemixContract.functions.getBest(portiswltaddr).then(function(result){
        console.log("Fetching Data from Blockchain!");
        //console.log("Calling the function blockchain");
        console.log("Bignumber call: "+ethers.BigNumber.from(result));
        data2[id] = String(ethers.BigNumber.from(result));
        //console.log("Bignumber 2nd:"+ethers.BigNumber.from(result.best));
        //console.log(result.best);
        //console.log(result.best.value);
        return ethers.BigNumber.from(result);
        });
        
        //data2[id] = String(callBestScore);
        return data2[id]
      }

    else {
    
      return data2.hasOwnProperty(id) ? data2[id] : undefined;
    }
    
  },

  removeItem: function (id) {
    //alert(id);
    $.ajax({
      type: 'GET',
      async: false,
      url: "http://localhost:8000/removeitem/",
      data: {"wltaddr" : String(mainstore.getItem("wltaddr"))},
      
      success:  function(data){
     //   console.log("Deleted game state");
        }
        });
    return delete data2[id];
  },

  clear: function () {
    return data2 = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  //var supported = this.localStorageSupported();
  this.storage = window.fakeStorage; //supported ? window.localStorage : 
}

/*LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};
*/

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  //alert("state: "+stateJSON);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};

