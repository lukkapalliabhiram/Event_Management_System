const ownerBtn = document.getElementById("owner-btn");
const userBtn = document.getElementById("user-btn");

ownerBtn.addEventListener("click", () => {
  window.location.href = "Owner_dash.html";
});

userBtn.addEventListener("click", () => {
  window.location.href = "User_dash.html";
});
