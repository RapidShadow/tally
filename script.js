let firebaseConfig = {
  apiKey: "AIzaSyAGmtgGm-SBv-iMZdpq9ZVqKjPqlY5nkYg",
  authDomain: "tally-6f3e8.firebaseapp.com",
  databaseURL: "https://tally-6f3e8-default-rtdb.firebaseio.com",
  projectId: "tally-6f3e8",
  storageBucket: "tally-6f3e8.appspot.com",
  messagingSenderId: "141313066658",
  appId: "1:141313066658:web:7466e4e26cc4bb892479fb",
  measurementId: "G-K0RTKE0NBB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 //reference to database
let db = firebase.database();
let tallyRef = db.ref('tally')
let length;
let dbJSON;
let latest = "<h1>Mr Varian has not said Zero Ums.</h1>"
document.getElementById("latest").insertAdjacentHTML("beforeend",latest)
tallyRef.once("value")
.then(function(snapshot) {

  length = snapshot.numChildren();
  if(length > 0){
    document.getElementById("latest").innerHTML = "";
  }
  dbJSON = snapshot.toJSON()
  latest = `<h1> Mr Varian's latest um was at ${dbJSON[length-1].Date} at ${dbJSON[length-1].Time}.</h1>
            <h1> He has said um a total of ${length} time(s) since 1-10-2022.</h1>`
  console.log(latest);
  document.getElementById("latest").insertAdjacentHTML("beforeend",latest)
});
//sumbitting new entry
document.getElementById("tally").onclick = function(){

//assigns value of the form to variables and then pushes it to the database
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+ today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
     tallyRef.child(length).set({
       Date : date,
       Time : time,
   });
   length++;
  //Alert to that has acknowledge it has been sumbited
  // window.alert("form has been sumbited");
  window.location.reload()
}
