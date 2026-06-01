// PauseScene.js
// Escena de pausa sencilla: muestra opciones para reanudar o salir al menú.

export class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    /**
     * create()
     *
     * Dibuja una superposición semitransparente y botones para reanudar
     * la partida o volver al menú. Al reanudar, se detiene la escena de
     * pausa y se reanuda `GameScene`.
     */
    create() {
        const { width, height } = this.scale;

        this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);

        this.add.text(width / 2, height / 4, 'PAUSED', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, 'Resume', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume('GameScene');
                this.scene.stop();
            });

        this.add.text(width / 2, height / 2 + 60, 'Quit to Menu', { fontSize: '32px', fill: '#f00' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop('GameScene');
                this.scene.start('MenuScene');
            });
    }
}
