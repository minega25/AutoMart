// eslint-disable-next-line func-names
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
let isAuth = false;
if (!isAuth) {
  authIn.style.display = 'none';
  authOut.style.display = 'inline-block';
}
function login() {
  authIn.style.display = 'block';
  authOut.style.display = 'none';
  isAuth = true;
}
function logOut() {
  authOut.style.display = 'inline-block';
  authIn.style.display = 'none';
  isAuth = false;
}
