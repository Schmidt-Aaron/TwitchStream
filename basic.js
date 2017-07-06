/* 
Basic functionality only. this is my first pass on this challenge and needs to be refactored and improved. 
*/

function displayTwitch(){
  //the channels we will GET
  var channels =["ESL_SC2", "OgamingSC2", "comster404", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
  function getToTheData(channel) {
    var data, rawData;
    var cName, cStatus, logoUrl, url;
    //var url =  "https://wind-bow.gomix.me/twitch-api/streams/" + channel;
    var url =  "https://wind-bow.glitch.me/twitch-api/channels/" + channel;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function(){
      if(this.status >= 200 && this.status < 400) {
        //do if successful
        rawData = this.response;
        data = JSON.parse(this.response);

        //do some stuff with data
         cName = channel;
         
        //if not streaming 
        if(data.status === 404 || data.status === null) {
          cStatus = "Error, this channel does not exist";
          logoUrl = "http://";
          url = "https://www.twitch.tv/";
        } else
        if(data.status === "offline") {
          cStatus = "Offline";
          logoUrl = "http://";
          url = "https://www.twitch.tv/" + cName;
        } 
        else {
         cStatus = data.status;
         logoUrl = data.logo;
         url = data.url;
        }
        
        //add our data to the page
        //main div per stream
        var newHTML = document.createElement("div");
        newHTML.className = "stream";
        newHTML.id = cName;
        document.getElementById("streams").appendChild(newHTML);

        //logo div + image
        var logoHTML = document.createElement("div");
        logoHTML.className = "logo";
        logoHTML.innerHTML = "<a href='" + url + "'><img src='" + logoUrl + "' height='50px' width='50px'></a>";
        document.getElementById(cName).appendChild(logoHTML);

        //stream name html
        var nameHTML = document.createElement("div");
        nameHTML.className = "title";
        nameHTML.innerHTML = "<p>" + cName + "</p>";
        document.getElementById(cName).appendChild(nameHTML);

        //stream status html
        var statusHTML = document.createElement("div");
        statusHTML.className = "status";
        statusHTML.innerHTML = "<p>" + cStatus + "</p>";
        document.getElementById(cName).appendChild(statusHTML);

      }  else {
        //connection, but error state
        console.log(this.status);
     }
    };

    request.onerror = function() {
      // no connection; now what
    };

    request.send();

  }//end getdata
  
   //call api for each channel
   function getStream(){
    channels.forEach(function(channel){
      getToTheData(channel);
  }); 
  } //end getStream
  
  //call getStream
     getStream();
  
}//end display Twitch

//fires function on window load
window.onload(displayTwitch());
