// main.js — Punto de entrada del juego.
// Configura la instancia de Phaser con la lista de escenas, físicas
// y opciones de escala, y crea el objeto `Phaser.Game`.

import Phaser from 'phaser';

import { PreloadScene } from './scenes/PreloadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { VictoryScene } from './scenes/VictoryScene.js';

/**
 * Configuración principal de Phaser.
 * - `scene`: orden en el que se registran las escenas del juego.
 * - `scale`: modo de escalado para ajustar al tamaño de la ventana.
 * - `physics`: configuración del sistema de físicas Arcade.
 */
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [
        PreloadScene,
        MenuScene,
        GameScene,
        PauseScene,
        GameOverScene,
        VictoryScene
    ],
    pixelArt: true
};

new Phaser.Game(config);
