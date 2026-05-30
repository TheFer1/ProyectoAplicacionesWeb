export default class GameManager {
    static state = {
        score: 0,
        lives: 3,
        level: 1,
        hasPowerUp: false
    };

    static reset() {
        this.state.score = 0;
        this.state.lives = 3;
        this.state.level = 1;
        this.state.hasPowerUp = false;
    }

    static addScore(points) {
        this.state.score += points;
    }

    static addLife() {
        this.state.lives += 1;
    }

    static loseLife() {
        this.state.lives -= 1;
        this.state.hasPowerUp = false;
    }
}
