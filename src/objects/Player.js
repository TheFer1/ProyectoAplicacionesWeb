export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Escalamos al personaje dinámicamente (puedes aumentar el número 80 si lo quieres más grande, o bajarlo si lo quieres más pequeño)
        this.baseScale = 80 / this.height; 
        this.setScale(this.baseScale);

        // Ajustamos la caja de colisión
        this.body.setSize(this.width * 0.8, this.height * 0.8);
        this.body.setOffset(this.width * 0.1, this.height * 0.2);

        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        
        this.jumpCount = 0;
        this.isInvulnerable = false;
        
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update(mobileControls) {
        if (!this.active) return;

        const left = this.cursors.left.isDown || this.wasd.left.isDown || (mobileControls && mobileControls.left);
        const right = this.cursors.right.isDown || this.wasd.right.isDown || (mobileControls && mobileControls.right);
        
        const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
                            Phaser.Input.Keyboard.JustDown(this.wasd.up) || 
                            (mobileControls && mobileControls.jumpJustPressed);

        if (left) {
            this.setVelocityX(-200);
            this.setFlipX(true); // Gira la imagen para mirar a la izquierda
        } else if (right) {
            this.setVelocityX(200);
            this.setFlipX(false); // Restaura la imagen para mirar a la derecha
        } else {
            this.setVelocityX(0);
        }
        
        this.angle = 0; // Forced no rotation requested by user

        if (this.body.touching.down) {
            this.jumpCount = 0;
            if (this.prevVelocityY > 100) {
                this.scene.tweens.add({
                    targets: this,
                    scaleY: this.baseScale * 0.6,
                    scaleX: this.baseScale * 1.2,
                    duration: 100,
                    yoyo: true,
                });
            }
        }

        if (jumpPressed && this.jumpCount < 2) {
            this.setVelocityY(-400);
            this.jumpCount++;
            this.scene.sound.play('jumpSound');

            if (mobileControls) {
                mobileControls.clearJump;
                this
            }
            

            this.scene.tweens.add({
                targets: this,
                scaleY: this.baseScale * 1.3,
                scaleX: this.baseScale * 0.8,
                duration: 150,
                yoyo: true
            });
        }

        this.prevVelocityY = this.body.velocity.y;
    }

    takeDamage() {
        if (this.isInvulnerable) return false;
        
        this.isInvulnerable = true;
        this.setTint(0xff0000);
        
        this.scene.time.delayedCall(1000, () => {
            this.scene.sound.play('damageSound');
            this.isInvulnerable = false;
            this.clearTint();
        }, [], this);
        
        return true;
    }
}
