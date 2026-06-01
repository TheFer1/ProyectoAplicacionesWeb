/**
 * PreloadScene
 *
 * Escena encargada de cargar recursos (imágenes, audio) y generar
 * texturas placeholder cuando falten assets reales. Muestra una barra de
 * progreso mientras se cargan los recursos.
 */
export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    /**
     * preload()
     * Carga los assets principales y registra un callback para generar
     * texturas placeholder al terminar la carga (si faltan recursos).
     */
    preload() {
        const { width, height } = this.scale;

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const border = this.add.graphics();
        border.lineStyle(4, 0xffffff, 1);
        border.strokeRect(width / 4, height / 2, width / 2, 30);

        const bar = this.add.graphics();
        
        this.load.on('progress', (value) => {
            bar.clear();
            bar.fillStyle(0x00ff00, 1);
            bar.fillRect(width / 4 + 2, height / 2 + 2, (width / 2 - 4) * value, 26);
        });

        // Cargar audios
        this.load.audio('menuMusic', 'assets/audio/teme_V2.2.mp3');
        this.load.audio('bgMusic', 'assets/audio/teme_V2.3.mp3');
        this.load.audio('jumpSound', 'assets/audio/jump1.mp3');
        this.load.audio('coinSound', 'assets/audio/coin1.mp3');
        this.load.audio('damageSound', 'assets/audio/pain6.mp3');

        this.load.image('player', 'assets/imagenes/Personaje.png');
        this.load.image('boss', 'assets/imagenes/enemigo.png');
        this.load.image('bg_nivel1', 'assets/imagenes/escenario.jpg');
        this.load.image('bg_nivel2', 'assets/imagenes/Escenario2.jpg');
        this.load.image('bg_nivel3', 'assets/imagenes/Escenario3.png');
        this.load.image('menu-bg', 'assets/imagenes/menu-bg.png');
        this.load.image('victory-bg', 'assets/imagenes/victory-bg.png');
        this.load.image('espina', 'assets/imagenes/espinas.png');
        this.load.image('enemy', 'assets/imagenes/enemis.png');
        this.load.image('bloquesPlanta', '/assets/imagenes/bloquesplat.png');
        this.load.image('bloquesMadera', '/assets/imagenes/platmad.png');
        this.load.image('bloquesLava', '/assets/imagenes/plataformapiedra.png');


        // Registrar generación de placeholders solo cuando termine la carga
        // (evita sobrescribir texturas reales cargadas por `this.load`).
        this.load.on('complete', () => this.generateAssets());

        // Cargar imagen real de checkpoint (si existe en public/assets/imagenes)
        this.load.image('checkpoint', 'assets/imagenes/checkpoint.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
    
    /**
     * generateAssets()
     * Genera texturas placeholder solo si no existen ya en el atlas de
     * texturas (evita sobreescribir imágenes reales).
     */
    generateAssets() {
        const g = this.add.graphics();

        if (!this.textures.exists('espina')) {
            g.fillStyle(0xff0000);
            g.fillRect(0, 0, 32, 32);
            g.generateTexture('espina', 32, 32);
            g.clear();
        }

        if (!this.textures.exists('coin')) {
            g.fillStyle(0xffff00);
            g.fillCircle(10, 10, 10);
            g.generateTexture('coin', 20, 20);
            g.clear();
        }

        if (!this.textures.exists('ground')) {
            g.fillStyle(0x000000, 0);
            g.fillRect(0, 0, 800, 32);
            g.generateTexture('ground', 800, 32);
            g.clear();
        }

        if (!this.textures.exists('platform')) {
            g.fillStyle(0x000000, 0);
            g.fillRect(0, 0, 100, 20);
            g.generateTexture('platform', 100, 20);
            g.clear();
        }

        // Usamos la clave 'checkpoint' para mantener compatibilidad con
        // el resto del código que busca esa textura.
        if (!this.textures.exists('checkpoint')) {
            g.fillStyle(0x00ffff);
            g.fillRect(0, 0, 20, 60);
            g.generateTexture('checkpoint', 20, 60);
            g.clear();
        }

        if (!this.textures.exists('powerup')) {
            g.fillStyle(0xff00ff);
            g.fillTriangle(10, 0, 20, 10, 10, 20, 0, 10);
            g.generateTexture('powerup', 20, 20);
            g.clear();
        }

        if (!this.textures.exists('goal')) {
            g.fillStyle(0xffd700);
            g.fillRoundedRect(0, 0, 40, 60, 10);
            g.generateTexture('goal', 40, 60);
            g.clear();
        }
    }
}