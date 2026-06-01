// GameManager.js
// Gestor de estado global del juego. Mantiene la puntuación, vidas,
// nivel actual y si el jugador tiene un power-up. Proporciona métodos
// estáticos para modificar ese estado desde cualquier parte del juego.

export default class GameManager {
    // Estado compartido del juego
    static state = {
        score: 0,
        lives: 3,
        level: 1,
        hasPowerUp: false
    };

    /**
     * reset()
     *
     * Restaura el estado del juego a los valores iniciales (puntuación,
     * vidas, nivel y power-up). Usado al comenzar una nueva partida.
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
     */
    static addScore(points) {
        this.state.score += points;
    }

    /**
     * addLife()
     *
     * Incrementa el contador de vidas en uno.
     */
    static addLife() {
        this.state.lives += 1;
    }

    /**
     * loseLife()
     *
     * Resta una vida y elimina cualquier power-up activo.
     */
    static loseLife() {
        this.state.lives -= 1;
        this.state.hasPowerUp = false;
    }
}
