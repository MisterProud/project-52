
fetch('assets/data/marineLife.json')
    .then(response => response.json())
    .then(data => {
        const marineLife = data.marineLife;
        let currentIndex = 0;

        
        displayContent(marineLife[currentIndex]);

        const canvas = document.getElementById('marineCanvas');
        const ctx = canvas.getContext('2d');

        function drawImage(imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }

        function displayContent(item) {
            document.getElementById('title').textContent = item.title;
            document.getElementById('description').textContent = item.description;
            drawImage(item.image);

            
            const audio = new Audio(item.audio);
            document.getElementById('playAudio').onclick = () => {
                audio.play();
            };
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % marineLife.length;
            displayContent(marineLife[currentIndex]);
        }, 10000); 
    });