// PWA Install Prompt
let deferredPrompt;
const installContainer = document.getElementById('installContainer');
const installButton = document.createElement('button');
installButton.id = 'installButton';
installButton.textContent = 'Install App';
installContainer.appendChild(installButton);
installButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
    
    installButton.addEventListener('click', async () => {
        installButton.style.display = 'none';
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User ${outcome} the install prompt`);
        deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    installButton.style.display = 'none';
});

// Check if running as PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
    installButton.style.display = 'none';
}

// Main App Functionality
document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/data/marineLife.json')
        .then(response => response.json())
        .then(data => {
            const marineLife = data.marineLife;
            let currentIndex = 0;
            let audioElement = null;

            const canvas = document.getElementById('marineCanvas');
            const ctx = canvas.getContext('2d');
            const titleElement = document.getElementById('title');
            const descriptionElement = document.getElementById('description');
            const playAudioButton = document.getElementById('playAudio');

            function displayContent() {
                const item = marineLife[currentIndex];
                titleElement.textContent = item.title;
                descriptionElement.textContent = item.description;
                
                // Load and draw image
                const img = new Image();
                img.src = item.image;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };

                // Set up audio
                if (audioElement) {
                    audioElement.pause();
                }
                audioElement = new Audio(item.audio);
                
                playAudioButton.onclick = () => {
                    audioElement.play();
                };
            }

            // Initial display
            displayContent();

            // Rotate content every 10 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % marineLife.length;
                displayContent();
            }, 10000);
        })
        .catch(error => console.error('Error loading data:', error));
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}