export default class Coin extends Phaser.Physics.Arcade.Sprite {
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
