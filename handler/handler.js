//SETTINGS

//Major version path
major_url = "/ipfs/QmVs5kp5dz1hjHzqWmChHRRcGQ4zaCbFA9bWJ87YAibWtC"
version_loaded = 0

//IPNS version check paths
minor_a_IPNS = "/ipns/QmYnaYmaMAdoMM1TYcoBzPdfdvcy5HD5NgM1zE6MNEMUA8"
minor_b_IPNS = "/ipns/QmNT1dKQ7vTodTjDiCZjdh4F1nhArLikLLKUzpWityLdvT"
minors = [minor_a_IPNS,minor_b_IPNS]

//------------------------------------------------------------------------

//Find all of the document elements
loading_screen = document.getElementById("loading_screen")
site_screen = document.getElementById("site_screen")
iframe = document.getElementById("iframe")

//Initial loading screen setup
is_loading = true
loading_screen.style.display = 'block'
site_screen.style.display = 'none'

//Function for transitioning to loading screen
function show_loading(){
  console.log("Showing Loading Screen")
  loading_screen.style.display = 'block'
  site_screen.style.display = 'none'
  loading_screen.classList.add('d-flex')
  is_loading = true
}

//Function for transitioning away from loading screen
function hide_loading(){
  console.log("Hiding Loading Screen")
  loading_screen.style.display = 'none'
  loading_screen.classList.remove('d-flex')
  site_screen.style.display = 'block'
  is_loading = false
}

//Function when window is resized
function resized(){
  console.log("Resize was called")
  if(is_loading){
    show_loading()
  }else{
    hide_loading()
  }
}




async function load_latest(url_a,url_b,first_load){
  console.log("Started looking at update IPNS paths")
  checked_a = false
  checked_b = false

  a_version = -1
  b_version = -1

  const controller = new AbortController();
  const signal = controller.signal;

  
  setTimeout(() => controller.abort(), 20000);
  await fetch(url_a+"/version.txt", { signal }).then(function(response){
    response.text().then(function(text){
      done_a(text)
      clearTimeout()
    })
  }).catch(err => {
    clearTimeout()
    if (err.name === 'AbortError') {
      console.log('Fetch of A path aborted');
    } else {
      console.error('A Fetch error occoured!', err);
    }
  })

  function done_a(text){
    temp_str = text.split('\n')[0]
    temp_str = temp_str.substr(2)
    a_version = parseFloat(temp_str)
    console.log("Checked path A, got V:" + a_version)
    checked_a = true
    load_latest()
  }

  setTimeout(() => controller.abort(), 20000);
  await fetch(url_b+"/version.txt", { signal }).then(function(response){
    response.text().then(function(text){
      done_b(text)
      clearTimeout()
    })
  }).catch(err => {
    clearTimeout()
    if (err.name === 'AbortError') {
      console.log('Fetch of B path aborted');
    } else {
      console.error('B Fetch error occoured!', err);
    }
  })

  function done_b(text){
    temp_str = text.split('\n')[0]
    temp_str = temp_str.substr(2)
    b_version = parseFloat(temp_str)
    console.log("Checked path B, got V:" + b_version)
    checked_b = true
    load_latest()
  }

  
  function load_latest(){
    if(a_version > b_version && a_version > version_loaded){
      console.log("Chose path A")
      version_loaded = a_version
      suggest_navigate(url_a)
    }else if(b_version > a_version && b_version > version_loaded){
      console.log("Chose path B")
      version_loaded = b_version
      suggest_navigate(url_b)
    }else{
      console.log("No update was found")
    }
  }

  function suggest_navigate(url){
    if(first_load){
      iframe.src = url
      console.log("Navigating to:"+url)
      hide_loading()
    }else{
      $('.toast').toast('show')
    }
  }

}

setTimeout(function(){
  //Loading Major
  iframe.src = major_url
  hide_loading()
  //Checking for update on-load
  load_latest(minors[0],minors[1],true)
  clearTimeout()
},1000)

//Keep checking for new minor release
setInterval(function(){
  console.log("Update interval fired")
  load_latest(minors[0],minors[1],false)
 },30000)


