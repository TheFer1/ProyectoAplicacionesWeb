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
        this.currentMusic = null;
        this.currentMusicKey = null;
        this.currentMusicConfig = null;
    }

    /**
     * playMusic(key, config)
     *
     * Reproduce una pista de música si el audio está habilitado. Evita
     * iniciar la misma pista más de una vez comprobando `scene.sound.get`.
     */
    playMusic(key, config = { loop: true, volume: 0.5 }) {
        this.currentMusicKey = key;
        this.currentMusicConfig = config;

        if (!this.enabled) return;
        if (this.currentMusic && this.currentMusic.isPlaying) return;

        // Si existe pausado, reanudarlo
        if (this.currentMusic && !this.currentMusic.isPlaying) {
            this.currentMusic.resume();
            return;
        }

        // Crear nuevo
        this.currentMusic = this.scene.sound.add(key, config);
        this.currentMusic.play();
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        StorageManager.setAudioConfig(enabled);

        if (!this.enabled) {
            // Pausar sin destruir
            if (this.currentMusic && this.currentMusic.isPlaying) {
                this.currentMusic.pause();
            }
        } else {
            // Reanudar o crear si no existe
            if (this.currentMusic) {
                if (!this.currentMusic.isPlaying) {
                    this.currentMusic.resume();
                }
            } else if (this.currentMusicKey) {
                this.currentMusic = this.scene.sound.add(this.currentMusicKey, this.currentMusicConfig);
                this.currentMusic.play();
            }
        }
    }

    /**
     * stopMusic()
     *
     * Detiene toda la reproducción de audio en la escena.
     */
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic.destroy();
            this.currentMusic = null;
        }
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

    destroyMusic() {
        this.stopMusic();
    }
}