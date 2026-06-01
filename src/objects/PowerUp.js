export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    /**
     * PowerUp
     *
     * Objeto de potenciador que pulsa para llamar la atención. No tiene
     * gravedad y es inmóvil; la lógica de recolección se maneja con
     * overlaps en la escena.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'powerup');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        
        scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
}
