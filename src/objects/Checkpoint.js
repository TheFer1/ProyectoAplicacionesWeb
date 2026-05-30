export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'checkpoint');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.active = false;
        
        this.setTint(0x888888); // Inactive state tint
    }
    
    activate() {
        if (!this.active) {
            this.active = true;
            this.clearTint();
            return true;
        }
        return false;
    }
}
