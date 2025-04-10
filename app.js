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
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', () => {
    console.log('App was installed');
    installButton.style.display = 'none';
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    installButton.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/project-52/assets/data/marineLife.json')
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

                const img = new Image();
                img.src = item.image;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };

                if (audioElement) {
                    audioElement.pause();
                }
                audioElement = new Audio(item.audio);
                playAudioButton.onclick = () => {
                    audioElement.play();
                };
            }

            displayContent();
            setInterval(() => {
                currentIndex = (currentIndex + 1) % marineLife.length;
                displayContent();
            }, 5000);
        })
        .catch(err => console.error('Error loading JSON data:', err));
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/project-52/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered');
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
