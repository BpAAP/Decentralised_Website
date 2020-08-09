is_loading = true

loading_screen = document.getElementById("loading_screen")
site_screen = document.getElementById("site_screen")

loading_screen.style.display = 'block'
site_screen.style.display = 'none'

major_subdomain_a = "/ipfs/QmWRHL3V4JFhf3oUnzAfdQG9wQrR1PjWVQBAsieinJtH4w"
major_subdomain_b = "/ipfs/QmcuBhbRbBKThFaASYYyaD8U494uLabnPGMPhwQk8NiJd7"

function show_loading(){
    loading_screen.style.display = 'block'
    site_screen.style.display = 'none'
    loading_screen.classList.add('d-flex')
}

function hide_loading(){
    loading_screen.style.display = 'none'
    loading_screen.classList.remove('d-flex')
    site_screen.style.display = 'block'
}

function resized(){
    if(is_loading){
        show_loading()
    }else{
        hide_loading()
    }
}

checked_major_a = false
checked_major_b = false
major_a_version = -1.0
major_b_version = -1.0



function load_latest_major(){
    fetch(major_subdomain_a+"/version.txt")
    .then(function(response) {
      response.text().then(function(text) {
        
        done_a(text);
      });
    });
  
  function done_a(text) {
    temp_str = text.split('\n')[0]
    temp_str = temp_str.substr(7,temp_str.length)
    major_a_version = parseFloat(temp_str)
    checked_major_a = true
    load_latest()
  }

  fetch(major_subdomain_b+"/version.txt")
    .then(function(response) {
      response.text().then(function(text) {
        done_b(text)
      });
    });
  
  function done_b(text) {
    temp_str = text.split('\n')[0]
    temp_str = temp_str.substr(7,temp_str.length)
    major_b_version = parseFloat(temp_str)
    checked_major_b = true
    load_latest()
  }

  iframe = document.getElementById("iframe")
  function load_latest(){
      if (checked_major_b && checked_major_a){
          if (major_a_version>major_b_version){
              iframe.src = major_subdomain_a
              hide_loading()
          } else{
              iframe.src = major_subdomain_b
              hide_loading()
          }
      }
  }
}

load_latest_major()