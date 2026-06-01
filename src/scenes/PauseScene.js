import StorageManager from '../managers/StorageManager.js';

/**
 * PauseScene
 *
 * Escena superpuesta que muestra el estado de pausa, permite reanudar
 * la partida o regresar al menú, y cambiar la configuración de audio.
 */
export class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    /**
     * create()
     * Construye la UI de pausa y conecta las acciones a la escena de juego.
     */
    create() {
        const { width, height } = this.scale;

        this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);

        this.add.text(width / 2, height / 4, 'PAUSED', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 40, 'Resume', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume('GameScene');
                this.scene.stop();
            });

        const audioLabel = () => `🔊 Audio: ${StorageManager.getAudioConfig() ? 'ON' : 'OFF'}`;
        const audioText = this.add.text(width / 2, height / 2 + 30, audioLabel(), {
            fontSize: '28px',
            fill: '#ffdd00'
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                const nuevoEstado = !StorageManager.getAudioConfig();
                const gameScene = this.scene.get('GameScene');
                if (gameScene && gameScene.audioManager) {
                    gameScene.audioManager.setEnabled(nuevoEstado);
                }
                audioText.setText(audioLabel());
            });

        this.add.text(width / 2, height / 2 + 100, 'Quit to Menu', { fontSize: '32px', fill: '#f00' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                const gameScene = this.scene.get('GameScene');
                if (gameScene && gameScene.audioManager) {
                    gameScene.audioManager.destroyMusic();
                }
                this.scene.stop('GameScene');
                this.scene.start('MenuScene');
            });
    }
}