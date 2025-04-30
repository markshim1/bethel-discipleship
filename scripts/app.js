document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-button');
    
    const verseTitle = document.getElementById('verse-title');
    const verseReference = document.getElementById('verse-reference');
    const verseText = document.getElementById('verse-text');
    
    const randomCheckbox = document.getElementById('random-checkbox');
    const prevButton = document.getElementById('prev-button');
    const hintButton = document.getElementById('hint-button');
    const fullButton = document.getElementById('full-button');
    const nextButton = document.getElementById('next-button');
    
    // State
    let currentVerseIndex = 0;
    let isShowClicked = false;
    let isHintClicked = false;
    
    // Function to display current verse
    function displayVerse() {
        const verse = verses[currentVerseIndex];
        verseTitle.textContent = verse.title;
        verseReference.textContent = verse.reference;
        
        // Reset text display
        verseText.textContent = '';
        
        if (isHintClicked) {
            const words = verse.text.split(' ');
            const firstThreeWords = words.length >= 3 ? 
                `${words[0]} ${words[1]} ${words[2]}` : 
                words.length === 1 ? words[0] : '';
            
            verseText.textContent = firstThreeWords;
        }
        
        if (isShowClicked) {
            verseText.textContent = verse.text;
        }
    }
    
    // Function to navigate to next verse
    function goToNextVerse() {
        if (randomCheckbox.checked) {
            const currentIndex = currentVerseIndex;
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * verses.length);
            } while (verses.length > 1 && randomIndex === currentIndex);
            
            currentVerseIndex = randomIndex;
        } else if (currentVerseIndex < verses.length - 1) {
            currentVerseIndex++;
        } else {
            currentVerseIndex = 0;
        }
        
        isShowClicked = false;
        isHintClicked = false;
        displayVerse();
    }
    
    // Function to navigate to previous verse
    function goToPrevVerse() {
        if (randomCheckbox.checked) {
            const currentIndex = currentVerseIndex;
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * verses.length);
            } while (verses.length > 1 && randomIndex === currentIndex);
            
            currentVerseIndex = randomIndex;
        } else if (currentVerseIndex > 0) {
            currentVerseIndex--;
        } else {
            currentVerseIndex = verses.length - 1;
        }
        
        isShowClicked = false;
        isHintClicked = false;
        displayVerse();
    }
    
    // Initialize event listeners
    startButton.addEventListener('click', function() {
        splashScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        displayVerse();
    });
    
    prevButton.addEventListener('click', goToPrevVerse);
    
    hintButton.addEventListener('click', function() {
        isShowClicked = false;
        isHintClicked = true;
        displayVerse();
    });
    
    fullButton.addEventListener('click', function() {
        isShowClicked = true;
        isHintClicked = false;
        displayVerse();
    });
    
    nextButton.addEventListener('click', goToNextVerse);
});
