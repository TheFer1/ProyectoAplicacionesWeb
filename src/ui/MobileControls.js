// MobileControls.js
// Crea controles táctiles simples para dispositivos móviles: botones de
// izquierda, derecha y salto. Proporciona un estado que puede ser consultado
// por `Player.update()` para integrar input táctil.

export default class MobileControls {
    constructor(scene) {
        this.scene = scene;
        this.isMobile = !scene.sys.game.device.os.desktop;

        if (this.isMobile) {
            this.createControls();
        }
    }

    /**
     * createControls()
     *
     * Crea los elementos visuales (rectángulos y textos) que actúan como
     * botones táctiles y conecta eventos pointer para actualizar el estado
     * (`left`, `right`, `jump`, `jumpJustPressed`).
     */
    createControls() {
        const { width, height } = this.scene.sys.game.config;

        this.leftBtn = this.scene.add.rectangle(50, height - 50, 60, 60, 0x888888, 0.5)
            .setInteractive()
            .setScrollFactor(0);
        this.scene.add.text(50, height - 50, '<', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0);

        this.rightBtn = this.scene.add.rectangle(130, height - 50, 60, 60, 0x888888, 0.5)
            .setInteractive()
            .setScrollFactor(0);
        this.scene.add.text(130, height - 50, '>', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0);

        this.jumpBtn = this.scene.add.rectangle(width - 50, height - 50, 60, 60, 0x888888, 0.5)
            .setInteractive()
            .setScrollFactor(0);
        this.scene.add.text(width - 50, height - 50, '^', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0);

        // Estado de los controles
        this.left = false;
        this.right = false;
        this.jump = false;
        this.jumpJustPressed = false;

        this.leftBtn.on('pointerdown', () => { this.left = true; });
        this.leftBtn.on('pointerup', () => { this.left = false; });
        this.leftBtn.on('pointerout', () => { this.left = false; });

        this.rightBtn.on('pointerdown', () => { this.right = true; });
        this.rightBtn.on('pointerup', () => { this.right = false; });
        this.rightBtn.on('pointerout', () => { this.right = false; });

        this.jumpBtn.on('pointerdown', () => { this.jump = true; this.jumpJustPressed = true; });
        this.jumpBtn.on('pointerup', () => { this.jump = false; this.jumpJustPressed = false; });
        this.jumpBtn.on('pointerout', () => { this.jump = false; this.jumpJustPressed = false; });
    }

    /**
     * clearJump
     *
     * Getter diseñado para limpiar la bandera `jumpJustPressed` cuando el
     * salto ya fue procesado por el `Player`. Se usa accediendo a
     * `mobileControls.clearJump` desde el código del jugador.
     */
    get clearJump() {
        this.jumpJustPressed = false;
    }
}
