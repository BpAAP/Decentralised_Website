is_loading = true

loading_screen = document.getElementById("loading_screen")
site_screen = document.getElementById("site_screen")

loading_screen.style.display = 'block'
site_screen.style.display = 'none'

minor_a_IPNS = "/ipns/QmZU8fJWrEKfwmhMFmDEt5bThKX7Kz6QxJQP9AZ2E7SHnC"
minor_b_IPNS = "/ipns/Qmaf23Aknagf5Fkc2oNbvCvfGYbkDpZVZqD2RD9cZ2ZuRZ"
minors = [minor_a_IPNS,minor_b_IPNS]

function show_loading(){
  console.log("Showing Loading Screen")
  loading_screen.style.display = 'block'
  site_screen.style.display = 'none'
  loading_screen.classList.add('d-flex')
  is_loading = true
}

function hide_loading(){
  console.log("Hiding Loading Screen")
  loading_screen.style.display = 'none'
  loading_screen.classList.remove('d-flex')
  site_screen.style.display = 'block'
  is_loading = false
}

function resized(){
  console.log("Resize was called")
  if(is_loading){
    show_loading()
  }else{
    hide_loading()
  }
}

minor_a_version = -1.0
minor_b_version = -1.0

//THINGS TO SET
version_loaded = 0
iframe = document.getElementById("iframe").src = "/ipfs/QmTH5Rw6kBsAJgbGySiJeYaqh83hA5V9pavjQz3GVPwU8o" //Put hash of most recent major site version here
hide_loading()

url_to_load = ""

function load_latest(url_a,url_b){
  console.log("Started looking at update IPNSs")
  checked_a = false
  checked_b = false
  
  fetch(url_a+"/version.txt")
    .then(function(response) {
      response.text().then(function(text) {
        done_a(text);
    });
  });
  
  function done_a(text) {
    temp_str = text.split('\n')[0]
    temp_str = temp_str.substr(2)
    minor_a_version = parseFloat(temp_str)
    console.log("Checked path A, got V:"+minor_a_version)
    checked_a = true
    load_latest()
  }

  fetch(url_b+"/version.txt")
    .then(function(response) {
      response.text().then(function(text) {
        done_b(text)
    });
  });
  
  function done_b(text) {
    temp_str = text.split('\n')[0]
    temp_str = temp_str.substr(2)
    minor_b_version = parseFloat(temp_str)
    console.log("Checked path B, got V:"+minor_b_version)
    checked_b = true
    load_latest()
  }
  
  function load_latest(){
    iframe = document.getElementById("iframe")
    if (checked_b && checked_a){
      console.log("Both pathes have been checked")
      if(minor_b_version>minor_a_version && minor_a_version > version_loaded){
        console.log("Chose path b")
        url_to_load = url_b
        version_loaded = minor_b_version
        send_to_url()
      }else if(minor_a_version>minor_b_version && minor_b_version>version_loaded){
        console.log("Chose path a")
        url_to_load = url_a
        version_loaded = minor_a_version
        send_to_url()
      }else if(minor_a_version === version_loaded || minor_b_version === version_loaded){
        console.log("No updates were found")
      }else{
        console.log("Something went wrong with finding the newest version.")
      }          
    }  
  }

  function send_to_url(){
    console.log("Navigating to address")
    iframe.src = url_to_load
    hide_loading()
  }

}

load_latest(minors[0],minors[1])

//Keep checking for new minor release
setInterval(function(){
  console.log("Update interval fired")
  load_latest(minors[0],minors[1]);
 },10000);

//NEED TO IMPLEMENT TIMEOUT FOR CHECKING THE IPNS ADDRESSES. OTHERWISE HOTSWAP HANGS