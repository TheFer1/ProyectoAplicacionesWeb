import StorageManager from './StorageManager.js';

/**
 * AudioManager
 *
 * Envoltorio ligero para gestionar música y efectos de sonido respetando
 * la configuración almacenada en `StorageManager`. Se crea por escena y
 * mantiene la pista actual, su clave y configuración.
 */
export default class AudioManager {
    /**
     * @param {Phaser.Scene} scene - Escena que usa el gestor de audio
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
     * Reproduce música de fondo identificada por `key`. Si el audio está
     * deshabilitado no hace nada. Evita crear múltiples instancias si ya
     * hay música en reproducción.
     * @param {string} key - Clave del asset de audio cargado
     * @param {object} config - Configuración de reproducción (loop, volume)
     */
    playMusic(key, config = { loop: true, volume: 0.5 }) {
        this.currentMusicKey = key;
        this.currentMusicConfig = config;

        if (!this.enabled) return;
        if (this.currentMusic && this.currentMusic.isPlaying) return;

        if (this.currentMusic && !this.currentMusic.isPlaying) {
            this.currentMusic.resume();
            return;
        }

        this.currentMusic = this.scene.sound.add(key, config);
        this.currentMusic.play();
    }

    /**
     * setEnabled(enabled)
     *
     * Habilita o deshabilita el audio globalmente y guarda la preferencia.
     * Pausa o reanuda la pista actual según corresponda.
     * @param {boolean} enabled
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        StorageManager.setAudioConfig(enabled);

        if (!this.enabled) {
            if (this.currentMusic && this.currentMusic.isPlaying) {
                this.currentMusic.pause();
            }
        } else {
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
     * Detiene y destruye la pista de música actual.
     */
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic.destroy();
            this.currentMusic = null;
        }
    }

    /**
     * destroyMusic()
     *
     * Alias para `stopMusic` para mejorar legibilidad cuando se libera
     * recursos.
     */
    destroyMusic() {
        this.stopMusic();
    }

    /**
     * playSound(key, volume)
     *
     * Reproduce un efecto de sonido puntual respetando la configuración
     * de audio (si está deshabilitado no hace nada).
     * @param {string} key - Clave del asset de efecto
     * @param {number} volume - Volumen del efecto (0-1)
     */
    playSound(key, volume = 0.8) {
        if (!this.enabled) return;
        this.scene.sound.play(key, { volume });
    }
}