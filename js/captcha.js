"use strict";

var captcha;
var alphabets =
  "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
generate_captcha();

function generate_captcha() {
  let first = alphabets[Math.floor(Math.random() * alphabets.length)];
  let second = alphabets[Math.floor(Math.random() * alphabets.length)];
  let third = alphabets[Math.floor(Math.random() * alphabets.length)];
  let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let sixth = Math.floor(Math.random() * 10);
  let status = document.getElementById("status");

  captcha =
    first.toString() +
    second.toString() +
    third.toString() +
    fourth.toString() +
    fifth.toString() +
    sixth.toString();

  document.getElementById("generated-captcha").value = captcha;
  document.getElementById("entered-captcha").value = "";
  status.innerText = "";
}

function check() {
  let userValue = document.getElementById("entered-captcha").value;
  let register = document.getElementById("register_button");
  let status = document.getElementById("status");
  if (userValue == captcha) {
    status.innerText = "The code is correct ✔";
    register.disabled = false;
  } else {
    status.innerText = "Wrong code. Please try again...";
    document.getElementById("entered-captcha").value = "";
  }
}
