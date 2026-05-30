export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, range = 100) {
        super(scene, x, y, 'espina');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.startX = x;
        this.range = range;
        this.speed = 50;
        
        this.setVelocityX(this.speed);
    }

    update() {
        if (!this.body) return; // Prevent errors if destroyed
        
        if (this.x > this.startX + this.range) {
            this.setVelocityX(-this.speed);
        } else if (this.x < this.startX - this.range) {
            this.setVelocityX(this.speed);
        }

        // Animación de rotación constante
        this.angle += (this.body.velocity.x > 0 ? 4 : -4);
    }
}
