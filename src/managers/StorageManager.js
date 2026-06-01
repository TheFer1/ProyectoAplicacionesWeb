// StorageManager.js
// Utilidad para persistir configuraciones y progreso del jugador utilizando
// `localStorage`. Proporciona getters/setters para high score, último nivel
// y preferencia de audio.

export default class StorageManager {
    /**
     * getHighScore()
     *
     * Devuelve el high score almacenado (número). Si no existe, devuelve 0.
     */
    static getHighScore() {
        return parseInt(localStorage.getItem('guardian_highscore')) || 0;
    }

    /**
     * setHighScore(score)
     *
     * Guarda un nuevo high score si es mayor que el actual. Devuelve `true`
     * si se guardó un nuevo récord, `false` en caso contrario.
     */
    static setHighScore(score) {
        const current = this.getHighScore();
        if (score > current) {
            localStorage.setItem('guardian_highscore', score);
            return true; // new high score
        }
        return false;
    }

    /**
     * getLastLevel()
     *
     * Recupera el último nivel donde el jugador guardó su progreso.
     * Devuelve 1 si no hay dato previo.
     */
    static getLastLevel() {
        return parseInt(localStorage.getItem('guardian_lastlevel')) || 1;
    }

    /**
     * setLastLevel(level)
     *
     * Persiste el último nivel jugado.
     */
    static setLastLevel(level) {
        localStorage.setItem('guardian_lastlevel', level);
    }

    /**
     * getAudioConfig()
     *
     * Recupera la preferencia de audio (true/false). Si no existe, por
     * defecto devuelve `true` (audio activado).
     */
    static getAudioConfig() {
        const val = localStorage.getItem('guardian_audio');
        return val === null ? true : val === 'true';
    }

    /**
     * setAudioConfig(enabled)
     *
     * Guarda la preferencia de audio en localStorage.
     */
    static setAudioConfig(enabled) {
        localStorage.setItem('guardian_audio', enabled);
    }
}
