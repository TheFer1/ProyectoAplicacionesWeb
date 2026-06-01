import StorageManager from '../managers/StorageManager.js';
import GameManager from '../managers/GameManager.js';

/**
 * GameOverScene
 *
 * Pantalla que muestra el puntaje final y, si procede, indica un nuevo
 * récord. Permite reiniciar la partida volviendo al menú principal.
 */
export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    /**
     * create()
     * Construye la pantalla de Game Over y maneja reinicio.
     */
    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 4, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
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

        this.add.text(width / 2, height - 100, 'Tap to Restart', { fontSize: '28px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            });
    }
}
