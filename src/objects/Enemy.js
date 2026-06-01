export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    /**
     * Enemy
     *
     * Enemigo con movimiento patrulla y saltos ocasionales. Se inicializa
     * con un rango de patrulla y velocidad, y ajusta su cuerpo físico
     * para adaptarse al escalado.
     */
    constructor(scene, x, y, range = 100) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.startX = x;
        this.range = range;
        this.speed = 50;
        this.direction = Phaser.Math.Between(0, 1) ? 1 : -1;
        
        // Scale down visual size
        this.setScale(0.4);

        // Adjust physics body to match scaled sprite
        this.body.setSize(this.displayWidth, this.displayHeight);

        this.setVelocityX(this.speed * this.direction);
        this.setFlipX(this.direction < 0);

        // Jump timing
        this.nextJump = 0;
        this.jumpIntervalMin = 1200;
        this.jumpIntervalMax = 2400;
        this.jumpVelocity = -220;

        // Random direction timing
        this.nextDirectionChange = this.scene.time.now + Phaser.Math.Between(900, 2200);
    }

    setDirection(direction) {
        /** Cambia la dirección horizontal del enemigo */
        this.direction = direction;
        this.setVelocityX(this.speed * this.direction);
        this.setFlipX(this.direction < 0);
    }

    update() {
        if (!this.body) return; // Prevent errors if destroyed
        
        if (this.x > this.startX + this.range) {
            this.setDirection(-1);
        } else if (this.x < this.startX - this.range) {
            this.setDirection(1);
        }

        const now = this.scene.time.now;
        const onGround = this.body.blocked.down || this.body.touching.down;
        if (onGround && now > this.nextDirectionChange) {
            if (Phaser.Math.Between(0, 1)) {
                this.setDirection(this.direction * -1);
            }
            this.nextDirectionChange = now + Phaser.Math.Between(900, 2200);
        }

        // Saltos ocasionales mientras se mueven
        if (onGround && now > this.nextJump) {
            this.setVelocityY(this.jumpVelocity);
            this.nextJump = now + Phaser.Math.Between(this.jumpIntervalMin, this.jumpIntervalMax);
        }
    }
}
