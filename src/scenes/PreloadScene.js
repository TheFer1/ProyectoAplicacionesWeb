export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

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
        this.load.audio('bgMusic', 'assets/audio/kontraa-water-afro-pop-music-445661.mp3');

        // Cargar imagen estática del personaje
        this.load.image('player', 'assets/imagenes/Personaje.png');

        // Cargar enemigo final
        this.load.image('boss', 'assets/imagenes/enemigo.png');

        // Cargar fondo del nivel 1
        this.load.image('bg_nivel1', 'assets/imagenes/escenario.jpg');

        // Since we don't have real assets, we generate them procedurally for testing
        this.generateAssets();
    }

    create() {
        this.scene.start('MenuScene');
    }
    
    generateAssets() {
        // Generate placeholder graphics for objects
        const g = this.add.graphics();
        
        // El personaje ahora es una imagen real, no generamos el cuadrado azul aquí
        
        // Enemy (Red square)
        g.fillStyle(0xff0000);
        g.fillRect(0, 0, 32, 32);
        g.generateTexture('enemy', 32, 32);
        g.clear();
        
        // Coin (Yellow circle)
        g.fillStyle(0xffff00);
        g.fillCircle(10, 10, 10);
        g.generateTexture('coin', 20, 20);
        g.clear();
        
        // Ground/Platform (Green rectangle)
        g.fillStyle(0x00ff00);
        g.fillRect(0, 0, 800, 32);
        g.generateTexture('ground', 800, 32);
        g.clear();
        
        // Platform (short)
        g.fillStyle(0x00ff00);
        g.fillRect(0, 0, 100, 20);
        g.generateTexture('platform', 100, 20);
        g.clear();

        // Checkpoint (Flag)
        g.fillStyle(0x00ffff);
        g.fillRect(0, 0, 20, 60);
        g.generateTexture('checkpoint', 20, 60);
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
