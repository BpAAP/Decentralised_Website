showing_splash_screen = true;

function resize(){
    iframe = document.getElementById('iframe');
    
    splash_screen = document.getElementById('splash_screen');
    if (showing_splash_screen){
        splash_screen.style.display = 'block';
        iframe.style.display = 'none';
    } else {
        splash_screen.style.display = 'none';
        iframe.style.display = 'block';
    }
    
    
}

function loaded(){
    resize();
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker-bundle.js')
      .then((reg) => console.log('Successful service worker register'))
      .catch((err) => console.error('Failed service worker register', err))
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker-bundle.js')
      .then(async () => {
        ipfs = createProxyClient({ /* ...config... */ })
  
        // Now use `ipfs` as usual! e.g.
        const { agentVersion, id } = await ipfs.id()
      })
  }