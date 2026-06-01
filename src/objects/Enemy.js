// Enemy.js
// Clase que representa enemigos simples del juego. Se mueven patrullando
// alrededor de una posición inicial (`startX`) dentro de un rango, cambian
// de dirección aleatoriamente y pueden saltar ocasionalmente.

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    /**
     * constructor(scene, x, y, range)
     *
     * @param {Phaser.Scene} scene - Escena donde se crea el enemigo.
     * @param {number} x - Posición inicial X.
     * @param {number} y - Posición inicial Y.
     * @param {number} range - Rango horizontal desde `startX` en el que patrulla.
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
        
        // Escala visual reducida
        this.setScale(0.4);

        // Ajuste del cuerpo físico a la escala
        this.body.setSize(this.displayWidth, this.displayHeight);

        this.setVelocityX(this.speed * this.direction);
        this.setFlipX(this.direction < 0);

        // Temporizadores de salto
        this.nextJump = 0;
        this.jumpIntervalMin = 1200;
        this.jumpIntervalMax = 2400;
        this.jumpVelocity = -220;

        // Temporizador para cambios aleatorios de dirección
        this.nextDirectionChange = this.scene.time.now + Phaser.Math.Between(900, 2200);
    }

    /**
     * setDirection(direction)
     *
     * Cambia la dirección del enemigo y actualiza la velocidad y flipX.
     */
    setDirection(direction) {
        this.direction = direction;
        this.setVelocityX(this.speed * this.direction);
        this.setFlipX(this.direction < 0);
    }

    /**
     * update()
     *
     * Llamado cada frame para actualizar la IA del enemigo: mantiene la
     * patrulla dentro de `startX ± range`, aplica cambios aleatorios de
     * dirección y ejecuta saltos ocasionales cuando está en tierra.
     */
    update() {
        if (!this.body) return; // Evita errores si fue destruido
        
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

        // Saltos ocasionales mientras está en el suelo
        if (onGround && now > this.nextJump) {
            this.setVelocityY(this.jumpVelocity);
            this.nextJump = now + Phaser.Math.Between(this.jumpIntervalMin, this.jumpIntervalMax);
        }
    }
}
