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
    const upgradeClickSound = document.getElementById('upgradeClickSound');
    const autoClickUpgradeSound = document.getElementById('autoClickUpgradeSound');
    const resetSound = document.getElementById('resetSound');
    const resetHighScoreSound = document.getElementById('resetHighScoreSound');
    const pointsForUpgradeElement = document.getElementById('pointsForUpgrade');
    const pointsForAutoClickUpgradeElement = document.getElementById('pointsForAutoClickUpgrade');

    let score = parseInt(localStorage.getItem('score')) || 0;
    let pointsPerClick = parseInt(localStorage.getItem('pointsPerClick')) || 1;
    let highScore = parseInt(localStorage.getItem('highScore')) || 0;
    let autoClickInterval = parseInt(localStorage.getItem('autoClickInterval')) || 10;
    let pointsForUpgrade = pointsPerClick * 20;
    let pointsForAutoClickUpgrade = autoClickInterval * 30;

    scoreElement.textContent = score;
    pointsPerClickElement.textContent = pointsPerClick;
    autoClickIntervalElement.textContent = autoClickInterval;
    highScoreElement.textContent = highScore;
    pointsForUpgradeElement.textContent = `Points needed for upgrade: ${pointsForUpgrade}`;
    pointsForAutoClickUpgradeElement.textContent = `Points needed for upgrade: ${pointsForAutoClickUpgrade}`;

    const updateUpgradeCosts = () => {
        pointsForUpgrade = pointsPerClick * 20;
        pointsForAutoClickUpgrade = (10 - autoClickInterval + 1) * 30;
        pointsForUpgradeElement.textContent = `Points needed for upgrade: ${pointsForUpgrade}`;
        pointsForAutoClickUpgradeElement.textContent = `Points needed for upgrade: ${pointsForAutoClickUpgrade}`;
    };
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
    const addClickAnimation = (button, sound) => {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            sound.currentTime = 0;
            sound.play();
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 100);
        });
    };
    addClickAnimation(clickButton, clickSound);
    addClickAnimation(upgradeButton, upgradeClickSound);
    addClickAnimation(autoClickUpgradeButton, autoClickUpgradeSound);
    addClickAnimation(resetButton, resetSound);
    addClickAnimation(resetHighScoreButton, resetHighScoreSound);
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
            updateUpgradeCosts();
        } else {
            alert('Not enough points to upgrade!');
        }
    });
    autoClickUpgradeButton.addEventListener('click', () => {
        const upgradeCost = (10 - autoClickInterval + 1) * 30;
        if (score >= upgradeCost && autoClickInterval > 1) {
            score -= upgradeCost;
            autoClickInterval -= 1;
            clearInterval(autoClicker);
            autoClicker = setInterval(click, autoClickInterval * 1000);
            localStorage.setItem('score', score);
            localStorage.setItem('autoClickInterval', autoClickInterval);
            scoreElement.textContent = score;
            autoClickIntervalElement.textContent = autoClickInterval;
            updateUpgradeCosts();
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
        updateUpgradeCosts();
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
