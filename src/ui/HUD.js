import GameManager from '../managers/GameManager.js';
import StorageManager from '../managers/StorageManager.js';

/**
 * HUD
 *
 * Interfaz de usuario que muestra información persistente en pantalla:
 * puntuación, vidas, nivel y récord. Se adapta al redimensionado de la
 * ventana y expone un método `updateHUD()` para refrescar los valores.
 */
export default class HUD {
    /**
     * @param {Phaser.Scene} scene - Escena que mostrará el HUD
     */
    constructor(scene) {
        this.scene = scene;
        const { width } = scene.scale;

        this.scoreText = scene.add.text(20, 20, '', { fontSize: '20px', fill: '#000' }).setScrollFactor(0);
        this.livesText = scene.add.text(20, 50, '', { fontSize: '20px', fill: '#000' }).setScrollFactor(0);
        this.levelText = scene.add.text(width / 2, 20, '', { fontSize: '20px', fill: '#000' }).setOrigin(0.5, 0).setScrollFactor(0);
        this.highScoreText = scene.add.text(width - 20, 20, '', { fontSize: '20px', fill: '#000' }).setOrigin(1, 0).setScrollFactor(0);

        scene.scale.on('resize', this.resize, this);
        this.resize();
        this.updateHUD();
    }

    /**
     * updateHUD()
     * Actualiza los textos con los valores actuales de `GameManager` y
     * `StorageManager`.
     */
    updateHUD() {
        this.scoreText.setText(`Score: ${GameManager.state.score}`);
        this.livesText.setText(`Lives: ${GameManager.state.lives}`);
        this.levelText.setText(`Level: ${GameManager.state.level}`);
        this.highScoreText.setText(`High Score: ${StorageManager.getHighScore()}`);
    }

    /**
     * resize()
     * Ajusta la posición de los elementos del HUD cuando cambia el ancho
     * de la pantalla.
     */
    resize() {
        const { width } = this.scene.scale;

        this.levelText.setPosition(width / 2, 20);
        this.highScoreText.setPosition(width - 20, 20);
    }
}
