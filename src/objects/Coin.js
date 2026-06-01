// Coin.js
// Representa una moneda coleccionable en el juego. Las monedas no tienen
// gravedad y son inamovibles (sirven solo como objetos de recolección).

export default class Coin extends Phaser.Physics.Arcade.Sprite {
    /**
     * constructor(scene, x, y)
     *
     * Crea una moneda en la posición dada y desactiva la gravedad para que
     * flote estática en su lugar.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'coin');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        if (this.body) {
            this.body.allowGravity = false;
            this.body.setImmovable(true);
        }
    }
}
