import GameManager from '../managers/GameManager.js';
import StorageManager from '../managers/StorageManager.js';

export default class HUD {
    constructor(scene) {
        this.scene = scene;
        const { width } = scene.scale;

        this.scoreText = scene.add.text(20, 20, '', { fontSize: '20px', fill: '#030303' }).setScrollFactor(0);
        this.livesText = scene.add.text(20, 50, '', { fontSize: '20px', fill: 's#1d1b1b' }).setScrollFactor(0);
        this.levelText = scene.add.text(width / 2, 20, '', { fontSize: '20px', fill: '#141212' }).setOrigin(0.5, 0).setScrollFactor(0);
        this.highScoreText = scene.add.text(width - 20, 20, '', { fontSize: '20px', fill: '#0a0909' }).setOrigin(1, 0).setScrollFactor(0);

        scene.scale.on('resize', this.resize, this);
        this.updateHUD();
    }

    resize(gameSize) {
        const width = gameSize?.width || this.scene.scale.width;
        this.levelText.setX(width / 2);
        this.highScoreText.setX(width - 20);
    }

    updateHUD() {
        this.scoreText.setText(`Score: ${GameManager.state.score}`);
        this.livesText.setText(`Lives: ${GameManager.state.lives}`);
        this.levelText.setText(`Level: ${GameManager.state.level}`);
        this.highScoreText.setText(`High Score: ${StorageManager.getHighScore()}`);
    }
}
