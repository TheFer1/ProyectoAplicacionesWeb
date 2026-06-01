// Checkpoint.js
// Objeto de checkpoint que el jugador puede activar para guardar su
// progreso y establecer un punto de reaparición. Tiene un estado activo
// y visualmente cambia de color cuando se activa.

export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    /**
     * constructor(scene, x, y)
     *
     * Crea el sprite del checkpoint, ajusta su escala y cuerpo físico,
     * lo marca como inactivo y aplica un tinte para indicar estado.
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'checkpoint');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Reducir tamaño visual y ajustar cuerpo físico
        this.setScale(0.4);
        this.body.setSize(this.displayWidth, this.displayHeight);

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.active = false;
        
        this.setTint(0x888888); // Inactive state tint
    }
    
    /**
     * activate()
     *
     * Activa el checkpoint la primera vez que lo toca el jugador,
     * quita el tinte y devuelve true si se activó, false si ya estaba activo.
     */
    activate() {
        if (!this.active) {
            this.active = true;
            this.clearTint();
            return true;
        }
        return false;
    }
}
