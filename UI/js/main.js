Element.prototype.toggle = function () {
  this.addEventListener('click', (event) => {
    event.preventDefault();
  });
  if (this.style.display == '' || this.style.display == 'block') {
    this.style.display = 'none';
  } else {
    this.style.display = 'block';
  }
};
const authOut = document.getElementsByClassName('authOut')[0];
const authIn = document.getElementsByClassName('authIn')[0];
let isAuth = localStorage.getItem('isAuth');
if (isAuth === 'false') {
  authIn.style.display = 'none';
  authOut.style.display = 'block';
}
function login() {
  authIn.style.display = 'block';
  authOut.style.display = 'none';
  localStorage.setItem('isAuth', 'true');
}
function logOut() {
  authOut.style.display = 'block';
  authIn.style.display = 'none';
  localStorage.setItem('isAuth', 'false');
}
