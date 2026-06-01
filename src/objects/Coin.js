export default class Coin extends Phaser.Physics.Arcade.Sprite {
    /**
     * Coin
     *
     * Moneda coleccionable. No se ve afectada por gravedad y es inmóvil
     * para que el jugador pueda recogerla mediante overlaps.
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
