// AudioManager.js
// Encapsula la reproducción de audio del juego (música y efectos) y
// respeta la preferencia del usuario almacenada en `StorageManager`.

import StorageManager from './StorageManager.js';

export default class AudioManager {
    /**
     * constructor(scene)
     *
     * @param {Phaser.Scene} scene - Escena donde se reproducirá el audio.
     * Carga la preferencia de audio (enabled) desde `StorageManager`.
     */
    constructor(scene) {
        this.scene = scene;
        this.enabled = StorageManager.getAudioConfig();
    }

    /**
     * playMusic(key, config)
     *
     * Reproduce una pista de música si el audio está habilitado. Evita
     * iniciar la misma pista más de una vez comprobando `scene.sound.get`.
     */
    playMusic(key, config = { loop: true, volume: 0.5 }) {
        if (!this.enabled) return;
        if (this.scene.sound.get(key)) return; // already playing
        this.scene.sound.play(key, config);
    }

    /**
     * stopMusic()
     *
     * Detiene toda la reproducción de audio en la escena.
     */
    stopMusic() {
        this.scene.sound.stopAll();
    }

    /**
     * playSound(key, volume)
     *
     * Reproduce un efecto de sonido puntual si el audio está habilitado.
     */
    playSound(key, volume = 0.8) {
        if (!this.enabled) return;
        this.scene.sound.play(key, { volume });
    }

    /**
     * toggleAudio()
     *
     * Alterna el estado de audio (on/off), guarda la preferencia en
     * `StorageManager` y detiene la música si se desactiva.
     */
    toggleAudio() {
        this.enabled = !this.enabled;
        StorageManager.setAudioConfig(this.enabled);
        if (!this.enabled) {
            this.stopMusic();
        }
        return this.enabled;
    }
}
