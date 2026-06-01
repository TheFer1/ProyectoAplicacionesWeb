export default class StorageManager {
    static getHighScore() {
        return parseInt(localStorage.getItem('guardian_highscore')) || 0;
    }

    static setHighScore(score) {
        const current = this.getHighScore();
        if (score > current) {
            localStorage.setItem('guardian_highscore', score);
            return true; // new high score
        }
        return false;
    }

    static getLastLevel() {
        return parseInt(localStorage.getItem('guardian_lastlevel')) || 1;
    }

    static setLastLevel(level) {
        localStorage.setItem('guardian_lastlevel', level);
    }

    static getAudioConfig() {
        const val = localStorage.getItem('guardian_audio');
        return val === null ? true : val === 'true';
    }

    static setAudioConfig(enabled) {
        localStorage.setItem('guardian_audio', enabled);
    }
}
