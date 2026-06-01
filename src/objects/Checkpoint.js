export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'checkpoint');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Reducir tamaño visual y ajustar cuerpo físico
        this.setScale(0.4);
        this.body.setSize(this.displayWidth, this.displayHeight);

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        // No use `active` (propiedad controlada por Phaser). Usamos
        // `activated` para la lógica de juego y así evitar deshabilitar
        // el objeto en el motor físico.
        this.activated = false;

        this.setTint(0x888888); // Tinte para estado inactivo
    }
    
    activate() {
        if (!this.activated) {
            this.activated = true;
            this.clearTint();
            return true;
        }
        return false;
    }
}
