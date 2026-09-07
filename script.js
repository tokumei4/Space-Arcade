for (let i = 0; i < 45; i++) stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 1, speed: Math.random() * 1.5 + 0.5 });

window.addEventListener('keydown', e => { if (e.code === 'ArrowLeft') keys.ArrowLeft = true; if (e.code === 'ArrowRight') keys.ArrowRight = true; if (e.code === 'Space') keys.Space = true; });
window.addEventListener('keyup', e => { if (e.code === 'ArrowLeft') keys.ArrowLeft = false; if (e.code === 'ArrowRight') keys.ArrowRight = false; if (e.code === 'Space') keys.Space = false; });

mobileFireBtn.addEventListener('mousedown', () => isMobileFiring = true);
mobileFireBtn.addEventListener('mouseup', () => isMobileFiring = false);
mobileFireBtn.addEventListener('mouseleave', () => isMobileFiring = false);
mobileFireBtn.addEventListener('touchstart', e => { e.preventDefault(); isMobileFiring = true; });
mobileFireBtn.addEventListener('touchend', () => isMobileFiring = false);

function fireLaser() {
    const b = speedBoostTimer > 0, s = spreadShotTimer > 0, lx = player.x + player.width / 2 - 3, ly = player.y;
    if (s) {
        lasers.push({ x: lx, y: ly, width: 6, height: 18, speedY: -10, speedX: -4, color: '#ff33cc' }, { x: lx, y: ly, width: 6, height: 18, speedY: -10, speedX: -2, color: '#ff33cc' }, { x: lx, y: ly, width: 6, height: 18, speedY: -10, speedX: 0, color: '#ffffff' }, { x: lx, y: ly, width: 6, height: 18, speedY: -10, speedX: 2, color: '#ff33cc' }, { x: lx, y: ly, width: 6, height: 18, speedY: -10, speedX: 4, color: '#ff33cc' });
        playSoundEffect('spread_laser');
    } else {
        lasers.push({ x: lx, y: ly, width: b ? 8 : 6, height: 18, speedY: b ? -14 : -10, speedX: 0, color: b ? '#00ffff' : '#ffff00' });
        playSoundEffect(b ? 'boost_laser' : 'laser');
    }
}

startBtn.addEventListener('click', () => { initAudioEngine(); startScreen.classList.add('hidden'); gameStarted = true; spawnAlienLoop(); });

function spawnAlienLoop() {
    if (isGameOver || !gameStarted) return;
    if (!bossActive) {
        gameTimer++; if (gameTimer % 5 === 0) { dangerLevel += 0.15; difficultyDisplay.innerText = `DANGER: ${dangerLevel.toFixed(1)}x`; }
        const mn = 1.5 * dangerLevel, mx = 3.0 * dangerLevel;
        aliens.push({ x: Math.random() * (canvas.width - 35) + 5, y: -40, width: 35, height: 35, speed: Math.random() * (mx - mn) + mn });
    }
    spawnTimeoutId = setTimeout(spawnAlienLoop, Math.max(300, 1200 - (dangerLevel * 120)));
}

function triggerBossWarpIn() {
    bossActive = true; aliens = []; boss.maxHp = 100 + (score * 0.5); boss.hp = boss.maxHp; boss.x = canvas.width / 2 - boss.width / 2; boss.y = -100; boss.speed = 2.5 + (dangerLevel * 0.4);
    difficultyDisplay.innerText = "🚨 BOSS INBOUND 🚨"; difficultyDisplay.style.color = '#ff3366';
}
