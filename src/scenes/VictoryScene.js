import StorageManager from '../managers/StorageManager.js';
import GameManager from '../managers/GameManager.js';

/**
 * VictoryScene
 *
 * Muestra la pantalla de victoria al completar todos los niveles. Muestra
 * el puntaje final y actualiza el récord si corresponde.
 */
export class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }

    /**
     * create()
     * Construye la UI de victoria y ofrece volver al menú.
     */
    create() {
        const { width, height } = this.scale;

        // Fondo
        this.add.image(width / 2, height / 2, 'victory-bg').setDisplaySize(width, height);

        // Puntaje final
        this.add.text(width / 2, height * 0.5, `Puntaje Final: ${GameManager.state.score}`, {
            fontSize: '36px',
            fill: '#00ff88',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Nuevo High Score
        const isNewHighScore = StorageManager.setHighScore(GameManager.state.score);
        if (isNewHighScore) {
            this.add.text(width / 2, height * 0.6, '¡NUEVO RÉCORD!', {
                fontSize: '28px',
                fill: '#ffff00',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0.5);
        }

        // Botón regresar
        const btn = this.add.rectangle(width / 2, height * 0.72, 280, 55, 0x006a8a)
            .setStrokeStyle(2, 0xc8a000)
            .setInteractive({ useHandCursor: true });

        this.add.text(width / 2, height * 0.72, 'Regresar al Menú', {
            fontSize: '22px',
            fill: '#ffffff',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5);

        btn.on('pointerover', () => btn.setAlpha(0.75));
        btn.on('pointerout', () => btn.setAlpha(1));
        btn.on('pointerdown', () => {
            StorageManager.setLastLevel(1);
            this.scene.start('MenuScene');
        });
    }
}
