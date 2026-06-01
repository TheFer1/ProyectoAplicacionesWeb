// Clase que administra los controles táctiles para dispositivos móviles
export default class MobileControls {

    // Constructor que recibe la escena donde se usarán los controles
    constructor(scene) {
        this.scene = scene; // Guarda la referencia de la escena
        this.isMobile = !scene.sys.game.device.os.desktop; // Verifica si el dispositivo es móvil

        if (this.isMobile) { // Si es móvil, crea los controles
            this.createControls();
        }
    }

    // Método encargado de crear los botones en pantalla
    createControls() {
        const { width, height } = this.scene.sys.game.config; // Obtiene el tamaño de la pantalla

        this.leftBtn = this.scene.add.rectangle(50, height - 50, 60, 60, 0x888888, 0.5)
            .setInteractive()
            .setScrollFactor(0); // Botón para mover a la izquierda
        this.scene.add.text(50, height - 50, '<', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0); // Texto del botón izquierdo

        this.rightBtn = this.scene.add.rectangle(130, height - 50, 60, 60, 0x888888, 0.5)
            .setInteractive()
            .setScrollFactor(0); // Botón para mover a la derecha
        this.scene.add.text(130, height - 50, '>', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0); // Texto del botón derecho

        this.jumpBtn = this.scene.add.rectangle(width - 50, height - 50, 60, 60, 0x888888, 0.5)
            .setInteractive()
            .setScrollFactor(0); // Botón para saltar
        this.scene.add.text(width - 50, height - 50, '^', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0); // Texto del botón de salto

        this.left = false; // Estado del botón izquierdo
        this.right = false; // Estado del botón derecho
        this.jump = false; // Estado del botón de salto
        this.jumpJustPressed = false; // Detecta una pulsación única de salto

        this.leftBtn.on('pointerdown', () => { this.left = true; }); // Activa movimiento a la izquierda al presionar
        this.leftBtn.on('pointerup', () => { this.left = false; }); // Desactiva movimiento a la izquierda al soltar
        this.leftBtn.on('pointerout', () => { this.left = false; }); // Desactiva movimiento a la izquierda al salir del botón

        this.rightBtn.on('pointerdown', () => { this.right = true; }); // Activa movimiento a la derecha al presionar
        this.rightBtn.on('pointerup', () => { this.right = false; }); // Desactiva movimiento a la derecha al soltar
        this.rightBtn.on('pointerout', () => { this.right = false; }); // Desactiva movimiento a la derecha al salir del botón

        this.jumpBtn.on('pointerdown', () => { this.jump = true; this.jumpJustPressed = true; }); // Activa salto al presionar
        this.jumpBtn.on('pointerup', () => { this.jump = false; this.jumpJustPressed = false; }); // Desactiva salto al soltar
        this.jumpBtn.on('pointerout', () => { this.jump = false; this.jumpJustPressed = false; }); // Desactiva salto al salir del botón
    }

    // Reinicia el indicador de salto después de procesarlo
    get clearJump() {
        this.jumpJustPressed = false;
    }
}