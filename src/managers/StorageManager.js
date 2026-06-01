/**
 * StorageManager
 *
 * Pequeño envoltorio para `localStorage` que centraliza el acceso a
 * preferencias y datos persistentes del juego (puntuación más alta,
 * último nivel jugado, configuración de audio). Devuelve valores por
 * defecto cuando no hay nada guardado.
 */
export default class StorageManager {
    /**
     * getHighScore()
     *
     * Recupera la puntuación más alta almacenada. Si no existe, devuelve 0.
     * @returns {number}
     */
    static getHighScore() {
        return parseInt(localStorage.getItem('guardian_highscore')) || 0;
    }

    /**
     * setHighScore(score)
     *
     * Guarda una nueva puntuación más alta si `score` es mayor que la
     * almacenada. Devuelve `true` si se actualizó el récord.
     * @param {number} score
     * @returns {boolean}
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
     * Recupera el último nivel jugado (por defecto 1).
     * @returns {number}
     */
    static getLastLevel() {
        return parseInt(localStorage.getItem('guardian_lastlevel')) || 1;
    }

    /**
     * setLastLevel(level)
     *
     * Guarda el nivel más reciente alcanzado.
     * @param {number} level
     */
    static setLastLevel(level) {
        localStorage.setItem('guardian_lastlevel', level);
    }

    /**
     * getAudioConfig()
     *
     * Recupera la preferencia de audio. Si no está definida, devuelve `true`.
     * @returns {boolean}
     */
    static getAudioConfig() {
        const val = localStorage.getItem('guardian_audio');
        return val === null ? true : val === 'true';
    }

    /**
     * setAudioConfig(enabled)
     *
     * Guarda la preferencia de audio (habilitado/deshabilitado).
     * @param {boolean} enabled
     */
    static setAudioConfig(enabled) {
        localStorage.setItem('guardian_audio', enabled);
    }
}
