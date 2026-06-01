// PowerUp.js
// Representa un power-up que el jugador puede recoger. Está animado con
// un pequeño pulso y no se ve afectado por la gravedad.

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    /**
     * constructor(scene, x, y)
     *
     * Crea un powerup en la escena y aplica una animación de pulso.
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
