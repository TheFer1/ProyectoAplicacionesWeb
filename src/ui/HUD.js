import GameManager from '../managers/GameManager.js';
import StorageManager from '../managers/StorageManager.js';

export default class HUD {
    constructor(scene) {
        this.scene = scene;
        this.scoreText = scene.add.text(10, 10, '', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
        this.livesText = scene.add.text(10, 40, '', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
        this.levelText = scene.add.text(400, 10, '', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5, 0).setScrollFactor(0);
        this.highScoreText = scene.add.text(790, 10, '', { fontSize: '20px', fill: '#fff' }).setOrigin(1, 0).setScrollFactor(0);
        
        this.updateHUD();
    }

    updateHUD() {
        this.scoreText.setText(`Score: ${GameManager.state.score}`);
        this.livesText.setText(`Lives: ${GameManager.state.lives}`);
        this.levelText.setText(`Level: ${GameManager.state.level}`);
        this.highScoreText.setText(`High Score: ${StorageManager.getHighScore()}`);
    }
}
