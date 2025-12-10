# RedYonderGroupInc_Demo
RedYonderGroup, Inc. - F2025 Project Planning &amp; Design, Niagara College
© 2025 RedYounderInc. Created by Matthew, Justin, David (GeonUK), and Malik. All rights reserved.


## 🔐 Developer / Demo Access (Skip Login)

This project normally **requires you to log in** to access `index.html`.  
However, for classmates, group members, or the professor who just want to **view and test the site without creating an account**, I added a **developer mode**.

Developer mode lets you open the website **without logging in** using a special URL.

---

### ✅ Option 1 – Open `index.html` in Developer Mode (No Login Required)

1. Make sure you have this project folder on your computer:
   - `redyonder.github.io-main` (or whatever the folder is called for you)

2. Open the folder and find the file:
   - `index.html`

3. **Right-click** `index.html` and choose:
   - **Open with** → your browser (Chrome, Edge, etc.)

4. Look at the address bar in your browser.  
   It will look something like this (your path will be different):

   file:///C:/Users/.../redyonder.github.io-main/index.html

5. Go to the end of the URL and add this:

   ?dev=true

   So it becomes:

   file:///C:/Users/.../redyonder.github.io-main/index.html?dev=true

6. Press **Enter** to load that URL.

7. You should now:
   - **NOT** be redirected to the login page  
   - See the site loaded normally  
   - See **"Developer Mode"** where the username usually appears  

This means you are in **developer/demo mode** and can use the site **without logging in**.

---

### ✅ Option 2 – Using VS Code Live Server (Recommended)

If you’re using **VS Code + Live Server**:

1. Open the project folder in VS Code.
2. Right-click `index.html` → click **“Open with Live Server”**.
3. Your browser will open something like:

   http://127.0.0.1:5500/index.html

4. In the address bar, change it to:

   http://127.0.0.1:5500/index.html?dev=true

5. Press **Enter**.

You are now in **developer mode** and can access the full site without logging in.

---

### ❗ Important Notes

- Developer mode only works on **`index.html?dev=true`**  
  It does **not** work on `logIn.html`.

- Normal behavior (for real users) is:
  - `index.html` **without** `?dev=true`  
  → will **force login** if you are not signed in.

- To test the **real login system**, just open:
  index.html  
  (without `?dev=true`) and it will redirect you to `logIn.html` if you are not logged in.

- If you ever get stuck in a weird loop or want to fully log out:
  1. Open Dev Tools → **Application → Local Storage**
  2. Clear:
     - `loggedInUser`
     - `rememberedLogin`

---

### 👤 Why Developer Mode Exists

- This is mainly for:
  - Me (the programmer)  
  - My group members  
  - The professor
- It allows viewing and testing the website quickly **without having to log in or register every time**.
- Real users would not normally see or use `?dev=true` in a production version.
