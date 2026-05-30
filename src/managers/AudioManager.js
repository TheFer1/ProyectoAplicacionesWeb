import StorageManager from './StorageManager.js';

export default class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.enabled = StorageManager.getAudioConfig();
    }

    playMusic(key, config = { loop: true, volume: 0.5 }) {
        if (!this.enabled) return;
        if (this.scene.sound.get(key)) return; // already playing
        this.scene.sound.play(key, config);
    }

    stopMusic() {
        this.scene.sound.stopAll();
    }

    playSound(key, volume = 0.8) {
        if (!this.enabled) return;
        this.scene.sound.play(key, { volume });
    }

    toggleAudio() {
        this.enabled = !this.enabled;
        StorageManager.setAudioConfig(this.enabled);
        if (!this.enabled) {
            this.stopMusic();
        }
        return this.enabled;
    }
}
