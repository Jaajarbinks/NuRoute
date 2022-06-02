
let quoteArea = document.getElementById('quotes-area');
// let quoteText = document.getElementById("quote-text")

// var zenUrl = 'https://zenquotes.io/api/quotes';


fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let i;
    document.getElementById("quote-text").innerHTML ='"' + data[1].text + '"';
    document.getElementById("author").innerHTML = "-" + data [1].author;
setInterval(function() {
    i = Math.floor(Math.random() * 1643) + 1;
    document.getElementById("quote-text").innerHTML = data[i].text;
    document.getElementById("author").innerHTML = data [i].author;
  }, 20000);
    console.log(data);
  });
//main page Modal
class BulmaModal {
  constructor(selector) {
    this.elem = document.querySelector(selector);
    this.close_data();
  }
  show() {
    this.elem.classList.toggle("is-active");
    this.on_show();
  }
  close() {
    this.elem.classList.toggle("is-active");
    this.on_close();
  }
  close_data() {
    var modalClose = this.elem.querySelectorAll(
      "[data-bulma-modal='close'], .modal-background"
    );
    var that = this;
    modalClose.forEach(function (e) {
      e.addEventListener("click", function () {
        that.elem.classList.toggle("is-active");

        var event = new Event("modal:close");

        that.elem.dispatchEvent(event);
      });
    });
  }

  on_show() {
    var event = new Event("modal:show");

    this.elem.dispatchEvent(event);
  }
  on_close() {
    var event = new Event("modal:close");

    this.elem.dispatchEvent(event);
  }

  addEventListener(event, callback) {
    this.elem.addEventListener(event, callback);
  }
}

var beginJourneyBtn = document.getElementById("btn1");
var mdl = new BulmaModal("#myModal");
let continueBtn = document.getElementById("start-btn")
continueBtn.onclick = function () {
  window.open("./pages/map.html",  "_blank")
 };

beginJourneyBtn.addEventListener("click", function () {
  mdl.show();
});

mdl.addEventListener("modal:show", function () {
  console.log("opened");
});

mdl.addEventListener("modal:close", function () {
  console.log("closed");
});

//modal control for the contact button in nav bar
var contactBtn = document.getElementById("contact-btn");
var contactMdl = new BulmaModal('#contact-mdl');
let submitBtn = document.getElementById("#submit-btn");

contactBtn.addEventListener("click", function () {
  contactMdl.show();
})

//modal for the developer button in nav bar
var developerBtn = document.getElementById("dev-btn");
var devMdl = new BulmaModal('#modal-dev');

developerBtn.addEventListener("click", function () {
  devMdl.show();
})