document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const upgradeButton = document.getElementById('upgradeButton');
    const autoClickUpgradeButton = document.getElementById('autoClickUpgradeButton');
    const resetButton = document.getElementById('resetButton');
    const resetHighScoreButton = document.getElementById('resetHighScoreButton');
    const scoreElement = document.getElementById('score');
    const pointsPerClickElement = document.getElementById('pointsPerClick');
    const autoClickIntervalElement = document.getElementById('autoClickInterval');
    const highScoreElement = document.getElementById('highScore');
    const clickSound = document.getElementById('clickSound');
    const pointsForUpgradeElement = document.getElementById('pointsForUpgrade');

    let score = parseInt(localStorage.getItem('score')) || 0;
    let pointsPerClick = parseInt(localStorage.getItem('pointsPerClick')) || 1;
    let highScore = parseInt(localStorage.getItem('highScore')) || 0;
    let autoClickInterval = parseInt(localStorage.getItem('autoClickInterval')) || 10;
    let pointsForUpgrade = parseInt(localStorage.getItem('pointsForUpgrade')) || 1;


    scoreElement.textContent = score;
    pointsPerClickElement.textContent = pointsPerClick;
    autoClickIntervalElement.textContent = autoClickInterval;
    highScoreElement.textContent = highScore;

    const click = () => {
        score += pointsPerClick;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        localStorage.setItem('score', score);
        scoreElement.textContent = score;
        highScoreElement.textContent = highScore;
        clickButton.classList.add('clicked');
        clickSound.currentTime = 0;
        clickSound.play();
        setTimeout(() => {
            clickButton.classList.remove('clicked');
        }, 100);
    };
    const addClickAnimation = (button) => {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 100);
        });
    };
    addClickAnimation(clickButton);
    addClickAnimation(upgradeButton);
    addClickAnimation(autoClickUpgradeButton);
    addClickAnimation(resetButton);
    addClickAnimation(resetHighScoreButton);
    let autoClicker = setInterval(click, autoClickInterval * 1000);
    clickButton.addEventListener('click', click);

    upgradeButton.addEventListener('click', () => {
        const upgradeCost = pointsPerClick * 20;
        if (score >= upgradeCost) {
            score -= upgradeCost;
            pointsPerClick += 1;
            localStorage.setItem('score', score);
            localStorage.setItem('pointsPerClick', pointsPerClick);
            scoreElement.textContent = score;
            pointsPerClickElement.textContent = pointsPerClick;
        } else {
            alert('Not enough points to upgrade!');
        }
    });
    autoClickUpgradeButton.addEventListener('click', () => {
        const upgradeCost = pointsForUpgrade * 30;
        if (score >= upgradeCost && autoClickInterval > 1) {
            score -= upgradeCost;
            autoClickInterval -= 1;
            pointsForUpgrade += 1;
            clearInterval(autoClicker);
            autoClicker = setInterval(click, autoClickInterval * 1000);
            localStorage.setItem('score', score);
            localStorage.setItem('autoClickInterval', autoClickInterval);
            scoreElement.textContent = score;
            autoClickIntervalElement.textContent = autoClickInterval;
        } else if (autoClickInterval <= 1) {
            alert('Auto Click Interval cannot be less than 1 second!');
        } else {
            alert('Not enough points to upgrade auto click!');
        }
    });
    
    resetButton.addEventListener('click', () => {
        score = 0;
        pointsPerClick = 1;
        autoClickInterval = 10;
        clearInterval(autoClicker);
        autoClicker = setInterval(click, autoClickInterval * 1000);
        localStorage.setItem('score', score);
        localStorage.setItem('pointsPerClick', pointsPerClick);
        localStorage.setItem('autoClickInterval', autoClickInterval);
        scoreElement.textContent = score;
        pointsPerClickElement.textContent = pointsPerClick;
        autoClickIntervalElement.textContent = autoClickInterval;
    });
    resetHighScoreButton.addEventListener('click', () => {
        highScore = 0;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = highScore;
    });
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('score', score);
        localStorage.setItem('pointsPerClick', pointsPerClick);
        localStorage.setItem('autoClickInterval', autoClickInterval);
    });
});
