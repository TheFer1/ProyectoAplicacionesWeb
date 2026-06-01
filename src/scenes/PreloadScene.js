/**
 * PreloadScene
 *
 * Escena encargada de cargar los recursos del juego (imágenes, audio,
 * texturas generadas) antes de arrancar la aplicación. Contiene una barra
 * de progreso y genera texturas placeholder para pruebas locales.
 */
export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    /**
     * preload()
     *
     * Carga los assets necesarios mediante `this.load` y muestra una barra
     * de progreso. También invoca `generateAssets()` para crear texturas
     * placeholder cuando alguna imagen real no esté disponible.
     */
    preload() {
        const { width, height } = this.scale;

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Progress bar outline
        const border = this.add.graphics();
        border.lineStyle(4, 0xffffff, 1);
        border.strokeRect(width / 4, height / 2, width / 2, 30);

        // Progress bar fill
        const bar = this.add.graphics();
        
        this.load.on('progress', (value) => {
            bar.clear();
            bar.fillStyle(0x00ff00, 1);
            bar.fillRect(width / 4 + 2, height / 2 + 2, (width / 2 - 4) * value, 26);
        });

        // Cargar audios
        this.load.audio('bgMusic', 'assets/audio/teme_V2.3.mp3');
        this.load.audio('jumpSound', 'assets/audio/jump1.mp3');
        this.load.audio('coinSound', 'assets/audio/coin1.mp3');
        this.load.audio('damageSound', 'assets/audio/pain6.mp3');

        // Cargar imagen estática del personaje
        this.load.image('player', 'assets/imagenes/Personaje.png');

        // Cargar enemigo final
        this.load.image('boss', 'assets/imagenes/enemigo.png');

        // Cargar fondos
        this.load.image('bg_nivel1', 'assets/imagenes/escenario.jpg');
        this.load.image('bg_nivel2', 'assets/imagenes/Escenario2.jpg');
        this.load.image('bg_nivel3', 'assets/imagenes/Escenario3.png');

        // Fondo del menú
        this.load.image('menu-bg', 'assets/imagenes/menu-bg.png');
        this.load.image('victory-bg', 'assets/imagenes/victory-bg.png');
        this.load.image('espina', 'assets/imagenes/espinas.png');

        // Enemigo (imagen real)
        this.load.image('enemy', 'assets/imagenes/enemis.png');

        // bloques y plataformas
        this.load.image('bloquesPlanta', '/assets/imagenes/bloquesplat.png');
        this.load.image('bloquesMadera', '/assets/imagenes/platmad.png');
        this.load.image('bloquesLava', '/assets/imagenes/plataformapiedra.png');


        // Since we don't have real assets, we generate them procedurally for testing
        this.generateAssets();

        // Cargar imagen real de checkpoint (si existe en public/assets/imagenes)
        this.load.image('checkpoint', 'assets/imagenes/checkpoint.png');
    }

    /**
     * create()
     *
     * Ejecutado por Phaser tras completar `preload`. Aquí simplemente
     * arrancamos la escena del menú.
     */
    create() {
        this.scene.start('MenuScene');
    }
    
    /**
     * generateAssets()
     *
     * Genera texturas simples (coloreadas o transparentes) utilizadas como
     * placeholders durante el desarrollo si faltan recursos reales.
     */
    generateAssets() {
        // Generate placeholder graphics for objects
        const g = this.add.graphics();
        
        // El personaje ahora es una imagen real, no generamos el cuadrado azul aquí
        
        // Enemy (Red square)
        g.fillStyle(0xff0000);
        g.fillRect(0, 0, 32, 32);
        g.generateTexture('espina', 32, 32);
        g.clear();
        
        // Coin (Yellow circle)
        g.fillStyle(0xffff00);
        g.fillCircle(10, 10, 10);
        g.generateTexture('coin', 20, 20);
        g.clear();
        
        // Ground/Platform (invisible physical body used as floor)
        g.fillStyle(0x000000, 0); // fully transparent
        g.fillRect(0, 0, 800, 32);
        g.generateTexture('ground', 800, 32);
        g.clear();

        // Platform (short) - invisible placeholder if needed
        g.fillStyle(0x000000, 0); // fully transparent
        g.fillRect(0, 0, 100, 20);
        g.generateTexture('platform', 100, 20);
        g.clear();

        // Checkpoint (Flag)
        g.fillStyle(0x00ffff);
        g.fillRect(0, 0, 20, 60);
        g.generateTexture('checkpoint-placeholder', 20, 60);
        g.clear();

        // PowerUp (Magenta Diamond)
        g.fillStyle(0xff00ff);
        g.fillTriangle(10, 0, 20, 10, 10, 20, 0, 10);
        g.generateTexture('powerup', 20, 20);
        g.clear();

        // Goal / Portal
        g.fillStyle(0xffd700); // Oro
        g.fillRoundedRect(0, 0, 40, 60, 10);
        g.generateTexture('goal', 40, 60);
        g.clear();
    }
}
