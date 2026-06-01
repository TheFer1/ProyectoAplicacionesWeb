import StorageManager from './StorageManager.js';

export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.enabled = StorageManager.getAudioConfig();
        this.currentMusic = null;
        this.currentMusicKey = null;
        this.currentMusicConfig = null;
    }

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

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic.destroy();
            this.currentMusic = null;
        }
    }

    playSound(key, volume = 0.8) {
        if (!this.enabled) return;
        this.scene.sound.play(key, { volume });
    }

    destroyMusic() {
        this.stopMusic();
    }
}