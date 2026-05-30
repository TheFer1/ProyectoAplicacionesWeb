import StorageManager from '../managers/StorageManager.js';
import GameManager from '../managers/GameManager.js';

export class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 4, 'VICTORY!', {
            fontSize: '64px',
            fill: '#00ff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, `Final Score: ${GameManager.state.score}`, {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Check if High Score
        const isNewHighScore = StorageManager.setHighScore(GameManager.state.score);
        if (isNewHighScore) {
            this.add.text(width / 2, height / 2 + 40, 'NEW HIGH SCORE!', {
                fontSize: '28px',
                fill: '#ffff00'
            }).setOrigin(0.5);
        }

        this.add.text(width / 2, height - 100, 'Back to Menu', { fontSize: '28px', fill: '#0ff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            });
    }
}
