/**
 * GameManager
 *
 * Gestor de estado global del juego. Mantiene una estructura estática
 * `state` con valores compartidos (puntuación, vidas, nivel y estado del
 * potenciador). Provee métodos estáticos para modificar ese estado desde
 * cualquier escena u objeto sin instanciar la clase.
 */
export default class GameManager {
    /** Estado global compartido entre escenas y objetos */
    static state = {
        score: 0,
        lives: 3,
        level: 1,
        hasPowerUp: false
    };

    /**
     * reset()
     *
     * Reinicia el estado del juego a los valores por defecto. Usar al
     * comenzar una nueva partida.
     */
    static reset() {
        this.state.score = 0;
        this.state.lives = 3;
        this.state.level = 1;
        this.state.hasPowerUp = false;
    }

    /**
     * addScore(points)
     *
     * Añade `points` a la puntuación actual.
     * @param {number} points - Puntos a añadir
     */
    static addScore(points) {
        this.state.score += points;
    }

    /**
     * addLife()
     *
     * Incrementa en una la cantidad de vidas.
     */
    static addLife() {
        this.state.lives += 1;
    }

    /**
     * loseLife()
     *
     * Resta una vida y elimina cualquier potenciador activo.
     */
    static loseLife() {
        this.state.lives -= 1;
        this.state.hasPowerUp = false;
    }
}
