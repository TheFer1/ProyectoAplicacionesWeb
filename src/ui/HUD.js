// HUD.js — Interfaz de usuario del juego.
// Muestra en pantalla la puntuación, las vidas, el nivel y el récord (high score).
// Los textos se añaden a la escena Phaser y se actualizan leyendo el estado
// desde `GameManager` y `StorageManager`.

import GameManager from '../managers/GameManager.js';
import StorageManager from '../managers/StorageManager.js';

export default class HUD {
    /**
     * Constructor del HUD.
     * @param {Phaser.Scene} scene - Escena de Phaser donde se mostrará el HUD.
     *
     * Crea los objetos de texto para `score`, `lives`, `level` y `high score`
     * y fija su comportamiento para que no se muevan con la cámara
     * (setScrollFactor(0)). Finalmente llama a `updateHUD()` para mostrar
     * los valores iniciales.
     */
    constructor(scene) {
        this.scene = scene;
        this.scoreText = scene.add.text(10, 10, '', { fontSize: '20px', fill: '#000' }).setScrollFactor(0);
        this.livesText = scene.add.text(10, 40, '', { fontSize: '20px', fill: '#000' }).setScrollFactor(0);
        this.levelText = scene.add.text(400, 10, '', { fontSize: '20px', fill: '#000' }).setOrigin(0.5, 0).setScrollFactor(0);
        this.highScoreText = scene.add.text(790, 10, '', { fontSize: '20px', fill: '#000' }).setOrigin(1, 0).setScrollFactor(0);

        // Inicializa los textos con los valores actuales del juego.
        this.updateHUD();
    }

    /**
     * updateHUD()
     *
     * Lee los valores actuales del juego desde `GameManager.state`
     * y del almacenamiento persistente mediante `StorageManager.getHighScore()`,
     * y actualiza los textos visibles del HUD con `setText`.
     *
     * Debe llamarse siempre que cambie la puntuación, las vidas o el nivel
     * para que el HUD refleje el estado real del juego.
     */
    updateHUD() {
        this.scoreText.setText(`Score: ${GameManager.state.score}`);
        this.livesText.setText(`Lives: ${GameManager.state.lives}`);
        this.levelText.setText(`Level: ${GameManager.state.level}`);
        this.highScoreText.setText(`High Score: ${StorageManager.getHighScore()}`);
    }
}
