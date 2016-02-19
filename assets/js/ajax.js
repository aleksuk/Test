function sendRequest(params) {
  var xhr = new XMLHttpRequest();

  xhr.open(params.method || 'GET', params.url, true);

  xhr.send(); 

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
    
    if (xhr.status === 200) {
      params.callback(xhr);
    } else {
      console.error(xhr.responseText);
    }

  }
}

function destroy(e) {
  var url = e.target.href;

  sendRequest({
    method: 'DELETE',
    url: url,
    callback: function () {
      location.href = '/user';
    }
  });
  
  e.preventDefault();
}

window.onload = function () {
  var links = document.querySelectorAll('.user-destroy');
  
  if (links) {
    [].slice.call(links).forEach(function (link) {
      link.addEventListener('click', destroy, false);
    })
  }
};