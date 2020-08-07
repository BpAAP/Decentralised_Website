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