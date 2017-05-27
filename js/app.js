/*
Initial Load of Participants (all) from users.json
Populates list with names. 
*/

function fetchJSONFile(path, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        var data = JSON.parse(httpRequest.responseText);
                        if (callback) callback(data);
                    }
                }
            };
            httpRequest.open('GET', path);
            httpRequest.send(); 
        }

fetchJSONFile('/js/users.json', function(data){

    var names = [];
    //console.log(names);
    for(i= 0; i < data.users.length; i++){
        document.getElementById("participant-list").innerHTML += '<li>' + data.users[i].name.first + ' ' + data.users[i].name.last + ' - ' + '<a href="mailto:' + data.users[i].email + '">' + data.users[i].email + '</a></li>';
    }
});    
            

/* Assign Names 

Starts with empty "pairs" array. 
If array empty or doesn't exist, return null, 
Otherwise, split the "givers" array and shuffle it. 
Loop over givers array and assign recipient to the next item in the recipient array
- so as to avoid self-pairs. Nobody wants that, 

*/

function assignNames(array) {
  var pairs = []; 
  if(!array || !array.length) {
    return null;
  }

  var givers = array.slice();
  shuffle(givers);

  for(var i=0; i<givers.length; i++) {
    var giver = givers[i],
        recipient;
    // Assign giver to the person next to them to avoid assigning to self and avoid duplicate recipients
    if(i !== givers.length-1) {
      recipient = givers[i+1];
    } else {
      recipient = givers[0];      
    }
    /* Assign pairs to the relevant arrays - giver/recipent */
    pairs.push({ "giver": giver, "recipient": recipient });
  }

  /* return the pairs*/
  return pairs;
};


/* Shuffle function */
function shuffle(array) {
  var n = array.length, 
      i, 
      j;
  while(n) {
    i = Math.floor(Math.random() * n--);

    j = array[n];
    array[n] = array[i];
    array[i] = j;
  } 
}

/* Show People 

Covers the actual output

*/


function showPeople(array) {
  var list = document.getElementById('secret-santa-pairs');
  list.innerHTML = '';

  for(var i=0; i<array.length; i++) {

    var pairing   = array[i],
        giver     = pairing.giver,
        recipient = pairing.recipient,
        li        = document.createElement('li');
      
        li.innerHTML += '<span class="giver">' + pairing.giver.name.first + ' ' + pairing.giver.name.last  + '</span> will buy a present for <span class="receiver"><strong>' + pairing.recipient.name.first + ' ' + pairing.recipient.name.last + '</strong></span>';
        list.appendChild(li);
  }
}


if (typeof(document) !== 'undefined') {
  //var button  = document.getElementById('submit');
  var shufflebutton  = document.getElementById('shuffle');
  
  // onClick - load in the JSON file again, not ideal but I don't have a lot of time
  
  shufflebutton.addEventListener('click', function(e){

    e.preventDefault();

        function fetchJSONFile(path, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        var data = JSON.parse(httpRequest.responseText);
                        if (callback) callback(data);
                    }
                }
            };
            httpRequest.open('GET', path);
            httpRequest.send(); 
        }

        fetchJSONFile('/js/users.json', function(data){
        // grab the file
        // set empty names array
            var names = [];


            // console.log(names); - let's just have a peek
            // loop over data and assign to names array

            for(i= 0; i < data.users.length; i++){
                names.push(data.users[i]); 
            }   
            
            // lets have a look and see what's outputting
            //console.log(JSON.parse(JSON.stringify(names)));
            
            //Sweet! Assign set var pairs equal to assignNames function, passing the names array in 
            var pairs = assignNames(names);
            // aaaaand show people -> pass in the pairs array
            showPeople(pairs);
        });
 
    // little bit of housekeeping - change button text onClick. 
    shufflebutton.innerHTML = 'RE-SHUFFLE';
  });  
}

//export assignNames module

if (typeof(module) !== 'undefined') {
  module.exports.assignNames = assignNames;
}