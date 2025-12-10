// Show username in header on NCR pages
//updated/edited by Malik Kistodial
const userDisplay = document.getElementById("usernameDisplay");
const storedUser = localStorage.getItem("loggedInUser");

if (userDisplay && storedUser) {
  userDisplay.textContent = storedUser;
}

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    location.replace("logIn.html");
  });
}
//----------------------------------------------------------------\\\\

// nav bar
document
  .querySelector("#navHome")
  .addEventListener("click", () => location.replace("index.html"));
document.querySelector("#navNewForm").addEventListener("click", () => {
  window.localStorage.setItem("ID", NCR.GetNewNCRNo());
  window.location.replace("ncr.html");
});

function CheckIsDigit(value) {
  return value.length > 0 && /^\d+$/.test(value) && value >= 0;
}

function CheckIsString(value) {
  return value.length > 0;
}

function CheckOneChecked(nodelist, start, stop) {
  i = 0;
  Array.prototype.slice
    .call(nodelist)
    .slice(start, stop + 1)
    .forEach((box) => {
      if (box.checked) i++;
    });
  return i == 1;
}

function CheckLessThan(lesser, greater) {
  return Number(lesser) <= Number(greater);
}


//-----------------------------------------------------------------------------------------------------

const frmQA = document.querySelector('#frmQA');
const frmEng = document.querySelector('#frmEng');
const frmPurch = document.querySelector('#frmPurch');

const sectQAForm = document.querySelector('#qaform');
const sectEngForm = document.querySelector('#engform');
const sectPurchForm = document.querySelector('#purchform');
const sectQA2Form = document.querySelector('#qa2form');

const sectQADisplay = document.querySelector('#qadisplay');
const sectEngDisplay = document.querySelector('#engdisplay');
const sectPurchDisplay = document.querySelector('#purchdisplay');
const sectQA2Display = document.querySelector('#qa2display');

const sectFooter = document.querySelector('#ncrfoot');

