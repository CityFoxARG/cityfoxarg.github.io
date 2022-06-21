var form = document.getElementById("form-contacto");
async function handleSubmit(event) {
event.preventDefault();
var status = document.getElementById("form-status");
var data = new FormData(event.target);
fetch(event.target.action, {
  method: form.method,
  body: data,
  headers: {
    'Accept': 'application/json'
}
}).then(response => {
  if (response.ok) {
    status.classList.add('form-success');
    status.innerHTML = "Tu mensaje se a enviado correctamente!";
    form.reset()
  } else {
    response.json().then(data => {
    if (Object.hasOwn(data, 'errors')) {
     status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
    } else {
      status.classList.add('form-fail');
      status.innerHTML = "Oops! Error, intenta otra vez";
    }
  })
}
}).catch(error => {
  status.classList.add('form-fail');
  status.innerHTML = "Oops! Error, intenta otra vez";
});
}
form.addEventListener("submit", handleSubmit)