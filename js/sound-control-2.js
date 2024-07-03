document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('background-audio');
    const soundBar = document.getElementById('sound-bar');
    const thumb = document.getElementById('sound-bar-thumb');
    const soundBarBg = document.getElementById('sound-bar-bg');

    // Fonction pour ajuster le volume
    const setVolume = (y) => {
        const rect = soundBar.getBoundingClientRect();
        const height = rect.bottom - rect.top;
        let volume = (rect.bottom - y) / height;
        volume = Math.min(Math.max(volume, 0), 1); // Contrainte entre 0 et 1
        audio.volume = volume;
        thumb.style.top = `${(1 - volume) * 100}%`;
    };

    // Écouteur pour ajuster le volume en cliquant ou en touchant la barre
    const handleInteraction = (e) => {
        if (e.type.startsWith('touch')) {
            setVolume(e.touches[0].clientY);
        } else {
            setVolume(e.clientY);
        }
    };

    // Écouteurs pour ajuster le volume en glissant le curseur
    let isDragging = false;

    const startDrag = (e) => {
        isDragging = true;
        e.preventDefault(); // Empêcher le comportement par défaut pour les événements tactiles
    };

    const endDrag = () => {
        isDragging = false;
    };

    const drag = (e) => {
        if (isDragging) {
            if (e.type.startsWith('touch')) {
                handleInteraction(e);
            } else {
                setVolume(e.clientY);
            }
        }
    };

    thumb.addEventListener('mousedown', startDrag);
    thumb.addEventListener('touchstart', startDrag);

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    setTimeout(() => {
        audio.currentTime = 0; // 1 minute 41 secondes en secondes
        audio.play().catch(error => {
            console.error('La lecture automatique a été bloquée:', error);
        });
    }, 10);

    // Lecture automatique après une interaction utilisateur
    const startAudio = () => {
        audio.play();
    };

    document.body.addEventListener('click', startAudio, { once: true });
    document.body.addEventListener('touchstart', startAudio, { once: true });
    // Initialisation de la position du curseur
    thumb.style.top = `${(1 - audio.volume) * 100}%`;
});