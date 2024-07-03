document.addEventListener("DOMContentLoaded", function () {
    const img = document.getElementById('cadran');
    const esp = document.getElementById('espece').className;
    console.log(esp);

    let isDragging = false;
    let startAngle;
    let currentRotationAngle = 0; // Variable pour stocker l'angle de rotation actuel

    const getAngle = (cx, cy, ex, ey) => {
        const dy = ey - cy;
        const dx = ex - cx;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    };

    const onStart = (x, y) => {
        isDragging = true;
        const rect = img.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const imgCenterY = rect.top + rect.height / 2;

        // Calculer l'angle de la souris par rapport au centre de l'image
        const mouseAngle = getAngle(imgCenterX, imgCenterY, x, y);
        startAngle = mouseAngle - currentRotationAngle;

        // Changer le curseur pour indiquer qu'on peut bouger l'image
        img.style.cursor = 'grabbing';
        img.style.transition = 'none'; // Désactiver la transition pendant le glissement
    };

    const onMove = (x, y) => {
        if (isDragging) {
            const rect = img.getBoundingClientRect();
            const imgCenterX = rect.left + rect.width / 2;
            const imgCenterY = rect.top + rect.height / 2;

            // Calculer l'angle actuel de la souris par rapport au centre de l'image
            const mouseAngle = getAngle(imgCenterX, imgCenterY, x, y);
            // Calculer l'angle de rotation en soustrayant l'angle de départ
            const rotationAngle = mouseAngle - startAngle;
            currentRotationAngle = rotationAngle; // Mettre à jour l'angle actuel

            img.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
        }
    };

    const stopDragging = () => {
        if (isDragging) {
            isDragging = false;
            img.style.cursor = 'grab';

            //redirection vers des liens selon l'angle.
            console.log("Angle juste avant réinitialisation :", currentRotationAngle);
            if(currentRotationAngle>-240 && currentRotationAngle<-200){
                if (esp=="homard"){
                    window.location.replace("http://localhost:5173/video-homard-1.html");
                }
                if (esp=="anemone"){
                    window.location.replace("http://localhost:5173/video-anemone-1.html");
                }
                if (esp=="dorade"){
                    window.location.replace("http://localhost:5173/video-dorade-1.html");
                }
                if (esp=="sar"){
                    window.location.replace("http://localhost:5173/video-sar-1.html");
                }
                if (esp=="etoile"){
                    window.location.replace("http://localhost:5173/video-etoile-1.html");
                }
                if (esp=="syngathe"){
                    window.location.replace("http://localhost:5173/video-syngathe-1.html");
                }
                if (esp=="index"){
                    console.log("Position 1", currentRotationAngle);
                }
                
            }
            else if(currentRotationAngle>-199 && currentRotationAngle<-155){
                if (esp=="homard"){
                    window.location.replace("http://localhost:5173/video-homard-2.html");
                }
                if (esp=="anemone"){
                    window.location.replace("http://localhost:5173/video-anemone-2.html");
                }
                if (esp=="dorade"){
                    window.location.replace("http://localhost:5173/video-dorade-2.html");
                }
                if (esp=="sar"){
                    window.location.replace("http://localhost:5173/video-sar-2.html");
                }
                if (esp=="etoile"){
                    window.location.replace("http://localhost:5173/video-etoile-2.html");
                }
                if (esp=="syngathe"){
                    window.location.replace("http://localhost:5173/video-syngathe-2.html");
                }
                if (esp=="index"){
                    console.log("Position 2", currentRotationAngle);
                }
            }
            else if(currentRotationAngle>-154 && currentRotationAngle<-100){
                if (esp=="homard"){
                    window.location.replace("http://localhost:5173/video-homard-3.html");
                }
                if (esp=="anemone"){
                    window.location.replace("http://localhost:5173/video-anemone-3.html");
                }
                if (esp=="dorade"){
                    window.location.replace("http://localhost:5173/video-dorade-3.html");
                }
                if (esp=="sar"){
                    window.location.replace("http://localhost:5173/video-sar-3.html");
                }
                if (esp=="etoile"){
                    window.location.replace("http://localhost:5173/video-etoile-3.html");
                }
                if (esp=="syngathe"){
                    window.location.replace("http://localhost:5173/video-syngathe-3.html");
                }
                if (esp=="index"){
                    console.log("Position 3", currentRotationAngle);
                }
            }
            else if(currentRotationAngle>-130 && currentRotationAngle<-80){
                console.log("Position : 4", currentRotationAngle);
            }

             // Réinitialisation de la position avec une transition
            img.style.transition = 'transform 0.3s ease';
            img.style.transform = 'translate(-50%, -50%) rotate(0deg)';

            // Réinitialiser l'angle après l'animation
            setTimeout(() => {
                currentRotationAngle = 0;
            }, 300); // La durée doit correspondre à la durée de la transition CSS
        }
    };


    // Gestion des événements de la souris
    img.addEventListener('mousedown', (e) => {
        onStart(e.clientX, e.clientY);
    });

    document.addEventListener('mousemove', (e) => {
        onMove(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', stopDragging);
    img.addEventListener('mouseleave', stopDragging);

    // Gestion des événements tactiles
    img.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            onStart(touch.clientX, touch.clientY);
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            onMove(touch.clientX, touch.clientY);
        }
    });

    document.addEventListener('mouseup', stopDragging);
    img.addEventListener('mouseleave', stopDragging);
});
