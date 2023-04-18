    var cricket = 1200;
    var badminton = 1000;
    var football = 800;
    var basketball = 500;
    var chess = 300;
    var total = 0;
    var check = 1;
    var gw;
    var price;
    var kits;
    var adder = document.querySelector("#getme");
    adder.addEventListener("click", getMe);
    var by = document.querySelector("#out");
    by.addEventListener("click", checkOut);
    var cme = document.querySelector("#clr");
    cme.addEventListener("click", clearMe);

    function getMe() {
      price = document.querySelector("#sf").value;
      kits = parseFloat(document.querySelector("#entrybox").value);
      gw = document.querySelector("#writeme");
      if (Number.isNaN(kits) === true) {
        alert("Only Numbers !!! Or The Field is Empty");
        check = 0;
      }
      else if (kits<0) {
        alert("Negative value!! @stupid");
        check = 0;
      }
      else{
        check = 1;
      }
      if (check == 1) {
     
        switch (price) {
          case "cricket":
            var st = cricket * kits;
            gw.value += "cricket " + kits + " kits = " + st + " rs\r";
            total += st;
            kits.value = "";
            break;
          case "football":
            var at = football * kits;
            gw.value += "football " + kits + " kits = " + at + " rs\r";
            total += at;
            kits.value = "";
            break;
          case "basketball":
            var gr = basketball * kits;
            gw.value += "basketball " + kits + " kits  = " + gr + " rs\r";
            total += gr;
            kits.value = "";
            break;
          case "badminton":
            var ga = badminton * kits;
            gw.value += "badminton " + kits + " kits  = " + ga + " RS\r";
            total += ga;
            kits.value = "";
            break;
          case "chess":
            var ch = chess * kits;
            gw.value += "chess " + kits + " kits  = " + ch + " rs\r";
            total += ch;
            kits.value = "";
            break;
        }

      }
    }

    function checkOut() {
      gw.value += "---------------------------------------------------\r";
      gw.value += "Your Total Bill Is = " + total + " rs Thanks For Shopping! :)\r";
      gw.value += "---------------------------------------------------\r";
      total = 0;
    }
    function clearMe () {
      gw.value = "";
    }
