document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 2; // Start with the middle card (0-indexed)
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateCards() {
        cards.forEach((card, index) => {
            card.className = 'card'; // Reset classes
            const diff = index - currentIndex;
            
            if (diff === 0) {
                card.classList.add('active');
            } else if (diff === -1) {
                card.classList.add('prev');
            } else if (diff === 1) {
                card.classList.add('next');
            } else if (diff < -1) {
                card.classList.add('far-prev');
            } else if (diff > 1) {
                card.classList.add('far-next');
            }
            
            // Add click listener to active card for navigation
            card.onclick = (e) => {
                if (index === currentIndex) {
                    // Navigate only if it's the active card
                    return true; 
                } else {
                    e.preventDefault();
                    currentIndex = index;
                    updateCards();
                    return false;
                }
            };
        });
    }

    // Initial update
    updateCards();

    // Drag functionality
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('touchend', dragEnd);
    container.addEventListener('mousemove', drag);
    container.addEventListener('touchmove', drag);

    function dragStart(e) {
        isDragging = true;
        startX = getPositionX(e);
    }

    function dragEnd() {
        isDragging = false;
        const movedBy = currentTranslate - startX;
        
        // Threshold to change card
        if (movedBy < -50 && currentIndex < cards.length - 1) {
            currentIndex++;
        } else if (movedBy > 50 && currentIndex > 0) {
            currentIndex--;
        }
        
        updateCards();
    }

    function drag(e) {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            currentTranslate = currentPosition;
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    // Wheel support
    container.addEventListener('wheel', (e) => {
        if (e.deltaY > 0 && currentIndex < cards.length - 1) {
            currentIndex++;
            updateCards();
        } else if (e.deltaY < 0 && currentIndex > 0) {
            currentIndex--;
            updateCards();
        }
    });
});
