export function alerta(type, message, alert){
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible py-2" role="alert">`,
      `   <div>${message}</div>`,
      `   <button type="button" class="btn-close p-2 mt-2 h-25 me-2" data-bs-dismiss="alert" aria-label="Close" onclick="document.getElementById('${alert.id}').innerHTML=''"</button>`,
      '</div>'
    ].join('')
    alert.innerHTML="";
    alert.append(wrapper);
}
