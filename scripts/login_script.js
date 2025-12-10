/*
FLOW
1. get users information
2. check validation
3. if user validation failed, disable click function in submit button
4. if user validation succeeded, move to main page
5. if user click the reset password button, move to reset page
*/

//updated validation using CHATGPT || updated all by Malik Kistodial
//find references in AI tool document

if(localStorage.getItem("users") === null){
  let users = getUsers();
  let firstName = "Unknown";
  let lastName = "Admin";
  let phone = "0000000000";
  let email = "someone@niagaracollege.ca";
  let username = "admin";
  let role = "Administrator";
  let password = "Password1";
  users.push({
    firstName,
    lastName,
    phone,
    email,
    username,
    role,
    password,
  });
  firstName = "Unknown";
  lastName = "QA";
  phone = "0000000000";
  email = "someone@niagaracollege.ca";
  username = "quality";
  role = "Quality Assurance";
  password = "Password1";
  users.push({
    firstName,
    lastName,
    phone,
    email,
    username,
    role,
    password,
  });
  firstName = "Unknown";
  lastName = "Engineer";
  phone = "0000000000";
  email = "someone@niagaracollege.ca";
  username = "engineer";
  role = "Engineering";
  password = "Password1";
  users.push({
    firstName,
    lastName,
    phone,
    email,
    username,
    role,
    password,
  });
  firstName = "Unknown";
  lastName = "OperationsManager";
  phone = "0000000000";
  email = "someone@niagaracollege.ca";
  username = "opman";
  role = "Operations";
  password = "Password1";
  users.push({
    firstName,
    lastName,
    phone,
    email,
    username,
    role,
    password,
  });
  firstName = "Unknown";
  lastName = "Procurement";
  phone = "0000000000";
  email = "someone@niagaracollege.ca";
  username = "procurement";
  role = "Procurement";
  password = "Password1";
  users.push({
    firstName,
    lastName,
    phone,
    email,
    username,
    role,
    password,
  });
  saveUsers(users);
}

const autofill = document.getElementById("sltAutoFill");
autofill.addEventListener("input", () => {
  let username;
  let password = "Password1";
  switch (autofill.value){
    case "admin":
      username = "admin";
    break;
    case "quality":
      username = "quality";
    break;
    case "engineer":
      username = "engineer";
    break;
    case "operations":
      username = "opman";
    break;
    case "procurement":
      username = "procurement";
    break;
    default:
    break;
  }
  loginId.value = username;
  loginPw.value = password;
});

/*prevent flicker until we decide to show or redirect */
document.documentElement.style.display = "none";

// 1. catch the login info variables
const loginId = document.getElementById("username");
const loginPw = document.getElementById("password");
const loginBtn = document.getElementById("btnLogin");
// old: const forgotPasswordLink = document.getElementById("forgotPassword"); // kept if needed later

// (old helper functions left here in case you still need them elsewhere)
function valid() {
  if (loginId.value.trim() === "" || loginPw.value.trim() === "") {
    alert("Please enter both username and password.");
    return false;
  }
  return true;
}

function moveToMain() {
  location.replace("./index.html");
}

function moveToReset() {
  location.replace("");
}

// ===== USER STORAGE HELPERS =====
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// small helper for the red popup message (login + register reuse this)
function showPopup(message) {
  const popup = document.getElementById("loginErrorPopup");
  if (!popup) return;

  popup.textContent = message;
  popup.style.display = "block";

  // hide after 3 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

/* =========================================
   LOGIN CLICK HANDLER
   ========================================= */
/*Remember Me + proper redirect */
document.getElementById("btnLogin").addEventListener("click", function (e) {
  e.preventDefault();

  const username = loginId.value.trim();
  const password = loginPw.value.trim();
  const rememberMe = document.getElementById("rememberMe"); // local reference

  // if nothing (or one field) is entered – do NOT log in, just show message
  if (!username || !password) {
    showPopup("Invalid username and password.");
    return;
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // show real name if we have it, otherwise fall back to username
    const displayName = user.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : user.username;

    localStorage.setItem("loggedInUser", displayName);
    localStorage.setItem("role", user.role);

    // SAVE REMEMBER ME
    if (rememberMe && rememberMe.checked) {
      const expires = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem(
        "rememberedLogin",
        JSON.stringify({ username, password, expires })
      );
    } else {
      localStorage.removeItem("rememberedLogin");
    }

    // SUCCESSFUL LOGIN → redirect
    location.replace("index.html");
  } else {
    showPopup("Invalid username or password.");
  }
});


/* =========================================
   AUTO-LOGIN ON PAGE LOAD (OPTION A: INSTANT)
   ========================================= */
/* instant auto-login, no flicker */
document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("rememberedLogin");

  if (saved) {
    try {
      const data = JSON.parse(saved);

      // if still valid -> go straight to index.html
      if (Date.now() <= data.expires) {
        location.replace("index.html");
        return; // do NOT show login page
      } else {
        // expired → clean up
        localStorage.removeItem("rememberedLogin");
      }
    } catch (err) {
      // bad data -> clear it
      localStorage.removeItem("rememberedLogin");
    }
  }

  // if we get here, we are NOT auto-logging in → show the page
  document.documentElement.style.display = "";
/* END UPDATED BY CHATGPT: the rest of this function sets up forgot password + show/hide etc. */

  /* ============================
     FORGOT PASSWORD — MALIK KISTODIAL
     ============================ */
  const forgotPasswordLink = document.getElementById("forgotPassword");
  const rememberMe = document.getElementById("rememberMe");
  const resetSection = document.getElementById("resetSection");
  const loginForm = document.getElementById("loginForm");
  const backToLogin = document.getElementById("backToLogin");
  const resetForm = document.getElementById("resetForm");
  const resetEmail = document.getElementById("resetEmail");

  if (forgotPasswordLink && resetSection && loginForm && backToLogin && resetForm && resetEmail) {
    // show reset form
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.style.display = "none";
      document.getElementById("registerForm").style.display = "none";
      resetSection.style.display = "block";
    });

    // back to login
    backToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      resetSection.style.display = "none";
      loginForm.style.display = "block";
    });

    // handle reset submission
    resetForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = resetEmail.value.trim();
      const users = getUsers();

      if (!email) {
        showPopup("Please enter your email.");
        return;
      }

      const user = users.find((u) => u.email === email);

      if (!user) {
        showPopup("Email not found.");
        return;
      }

      // simulate sending a reset link
      showPopup("A password reset link has been sent to your email.");

      // return to login after 2 seconds
      setTimeout(() => {
        resetSection.style.display = "none";
        loginForm.style.display = "block";
      }, 2000);
    });
  }

  /*Professional show/hide eye icon */
  document.querySelectorAll(".togglePassword").forEach((icon) => {
    icon.addEventListener("click", () => {
      const target = document.getElementById(icon.dataset.target);
      if (!target) return;

      const isHidden = target.type === "password";

      // toggle state
      target.type = isHidden ? "text" : "password";

      // toggle icon class (for CSS eye/eye-slash)
      if (isHidden) {
        icon.classList.add("showing"); // eye slash
      } else {
        icon.classList.remove("showing"); // normal eye
      }
    });
  });
  /*show/hide password */
});
/* END DOMContentLoaded */


/* =========================================
   REGISTRATION
   ========================================= */
const registerForm = document.querySelector("#registerForm form");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const role = document.getElementById("sltRole").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      showPopup("Passwords do not match.");
      return;
    }

    if(role === ""){
      showPopup("No role selected.");
      return;
    }

    let users = getUsers();
    if (users.find((u) => u.username === username)) {
      // username already exists – show popup, do NOT alert
      showPopup("Username already exists.");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      phone,
      email,
      username,
      role,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    // auto-login new user and send straight to NCR home
    const displayName = `${firstName} ${lastName}`.trim() || username;
    localStorage.setItem("loggedInUser", displayName);
    localStorage.setItem("role", role);
    location.replace("index.html");
  });
}
