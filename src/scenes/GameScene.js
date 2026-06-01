import Player from '../objects/Player.js';
import Enemy from '../objects/Enemy.js';
import Coin from '../objects/Coin.js';
import Checkpoint from '../objects/Checkpoint.js';
import PowerUp from '../objects/PowerUp.js';
import HUD from '../ui/HUD.js';
import MobileControls from '../ui/MobileControls.js';
import GameManager from '../managers/GameManager.js';
import AudioManager from '../managers/AudioManager.js';
import StorageManager from '../managers/StorageManager.js';

/**
 * GameScene
 *
 * Escena principal de juego: controla la creación del nivel, jugador,
 * enemigos, jefes, colisiones y la lógica de progreso entre niveles.
 */
export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    /**
     * create()
     * Método de entrada de Phaser: arranca la inicialización completa de
     * la escena delegando en `inicializarEscena()`.
     */
    create() {
        this.inicializarEscena();
    }

    /**
     * inicializarEscena()
     * Prepara fondo, audio, jugador, colisiones, HUD y configura el
     * nivel actual según `GameManager.state.level`.
     */
    inicializarEscena() {
        this.isTransitioning = false;
        this.cameras.main.fadeIn(800, 0, 0, 0);

        // Seleccionar fondo según el nivel
        let bgKey = 'bg_nivel1';
        let worldWidth = 3000; // Por defecto el nivel 1 medirá 3000 pixeles de largo
        if (GameManager.state.level === 2) {
            bgKey = 'bg_nivel2';
            worldWidth = 3500; // El nivel 2 medirá 3500
        } else if (GameManager.state.level === 3) {
            bgKey = 'bg_nivel3';
            worldWidth = 2400; // Nivel 3 ampliado para evitar el tope derecho
        }

        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, bgKey);
        bg.setScrollFactor(0);
        bg.setOrigin(0.5);
        bg.setDepth(-10);

        const resizeBackground = () => {
            const scaleX = this.scale.width / bg.width;
            const scaleY = this.scale.height / bg.height;
            const bgScale = Math.max(scaleX, scaleY);
            bg.setScale(bgScale);
            bg.setPosition(this.scale.width / 2, this.scale.height / 2);
        };

        resizeBackground();
        this.scale.on('resize', resizeBackground);

        this.audioManager = new AudioManager(this);
        this.audioManager.playMusic('bgMusic', { loop: true, volume: 0.3 });

        this.configurarNivel();
        
        this.player = new Player(this, 50, 400);
        this.physics.world.setBounds(0, 0, worldWidth, this.scale.height);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, worldWidth, this.scale.height);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        
        this.physics.add.overlap(this.player, this.coins, this.recogerMoneda, null, this);
        this.physics.add.overlap(this.player, this.checkpoints, this.activarCheckpoint, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.recogerPotenciador, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.colisionarConEnemigo, null, this);

        this.hud = new HUD(this);
        this.mobileControls = new MobileControls(this);

        this.add.text(750, 50, '||', { fontSize: '32px', fill: '#fff' })
            .setScrollFactor(0)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.pause();
                this.scene.launch('PauseScene');
            });

        if (GameManager.state.level === 3) {
            this.crearJefeFinal();
        }
    }

    /**
     * configurarNivel()
     * Crea grupos de plataformas, enemigos, monedas, checkpoints y
     * potenciadores según el nivel actual. Reutiliza `Coin`, `Enemy`,
     * `Checkpoint` y `PowerUp` para poblar el mapa.
     */
    configurarNivel() {
        this.platforms = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();
        this.coins = this.physics.add.group({ allowGravity: false });
        this.checkpoints = this.physics.add.group({ allowGravity: false });
        this.powerups = this.physics.add.group({ allowGravity: false });

        const level = GameManager.state.level;

        // Expandir el piso base (ground). Según el nivel, añadimos más cuadros de tierra en el suelo para que no caiga al infinito.
        let groundTiles = 1; // Para el nivel 3 (Jefe) solo 1 piso de 800
        if (level === 1) groundTiles = 4; // Suelo hasta 3200
        if (level === 2) groundTiles = 5; // Suelo hasta 4000
        if (level === 3) groundTiles = 3; // Suelo hasta 2400 para cubrir todo el nivel
        
        for (let i = 0; i < groundTiles; i++) {
            this.platforms.create(400 + (i * 800), 584, 'ground');
        }

        if (level === 1) {
            // Nivel 1 ampliado (Nuevas plataformas a lo largo del mapa entero)
            const coords = [400, 600, 800, 1100, 1400, 1700, 2000, 2400, 2700];
            const heights = [450, 350, 250, 350, 450, 350, 250, 350, 450];
            
            for(let i = 0; i < coords.length; i++) {
                
              const plataforma = this.platforms.create(
                 coords[i],
                 heights[i],
                'bloquesPlanta');

             plataforma.setDisplaySize(120, 40);
             plataforma.refreshBody();

            this.coins.add(new Coin(this, coords[i], heights[i] - 50))
            }

            // Múltiples enemigos
            this.enemies.add(new Enemy(this, 500, 500, 100));
            this.enemies.add(new Enemy(this, 1500, 500, 150));
            this.enemies.add(new Enemy(this, 2200, 500, 100));

            this.checkpoints.add(new Checkpoint(this, 1000, 530));
            this.checkpoints.add(new Checkpoint(this, 2000, 530));

        } else if (level === 2) {
            // Nivel 2 más largo y con más obstáculos
            const coords = [300, 500, 700, 1000, 1300, 1600, 1900, 2200, 2600, 3000];
            const heights = [450, 300, 450, 350, 250, 400, 250, 150, 350, 250];

            for(let i = 0; i < coords.length; i++) {

                                
              const plataforma = this.platforms.create(
                 coords[i],
                 heights[i],
                'bloquesMadera');

             plataforma.setDisplaySize(120, 40);
             plataforma.refreshBody();

                this.coins.add(new Coin(this, coords[i], heights[i] - 50));
            }

            // Más enemigos esparcidos por el mapa
            this.enemies.add(new Enemy(this, 300, 400, 50));
            this.enemies.add(new Enemy(this, 700, 400, 50));
            this.enemies.add(new Enemy(this, 1000, 500, 150));
            this.enemies.add(new Enemy(this, 1500, 500, 100));
            this.enemies.add(new Enemy(this, 2100, 500, 150));
            this.enemies.add(new Enemy(this, 2600, 500, 100));

            this.powerups.add(new PowerUp(this, 500, 250));
            this.powerups.add(new PowerUp(this, 1900, 200));

            this.checkpoints.add(new Checkpoint(this, 1200, 530));
            this.checkpoints.add(new Checkpoint(this, 2400, 530));

        } else if (level === 3) {
            const plataformas = [
                { x: 180, y: 460, w: 120, h: 20 },
                { x: 320, y: 360, w: 120, h: 20 },
                { x: 600, y: 320, w: 120, h: 20 },
                { x: 740, y: 420, w: 120, h: 20 },
                { x: 860, y: 300, w: 120, h: 20 },
                { x: 1260, y: 340, w: 120, h: 20 },
                { x: 1460, y: 460, w: 120, h: 20 },
                { x: 1900, y: 430, w: 120, h: 20 },
                { x: 2120, y: 300, w: 120, h: 20 }
            ];

            plataformas.forEach(pos => {
                const p = this.platforms.create(pos.x, pos.y, 'bloquesLava');
                p.setDisplaySize(pos.w, pos.h);
                p.refreshBody();
            });

            this.coins.add(new Coin(this, 180, 410));
            this.coins.add(new Coin(this, 320, 310));
            this.coins.add(new Coin(this, 460, 410));
            this.coins.add(new Coin(this, 600, 270));
            this.coins.add(new Coin(this, 740, 370));
            this.coins.add(new Coin(this, 860, 250));
            this.coins.add(new Coin(this, 1040, 390));
            this.coins.add(new Coin(this, 1260, 290));
            this.coins.add(new Coin(this, 1460, 410));
            this.coins.add(new Coin(this, 1680, 270));
            this.coins.add(new Coin(this, 1900, 380));
            this.coins.add(new Coin(this, 2120, 250));
}
    }

    /**
     * crearJefeFinal()
     * Configura al jefe del nivel 3: sprite, física, propiedades de vida
     * y comportamiento básico de IA.
     */
    crearJefeFinal() {
        this.boss = this.physics.add.sprite(800, 400, 'boss');
        // Escalamos al jefe de manera similar al jugador para que mida unos 120 pixeles de alto (puedes cambiar este 120 si lo quieres más grande/pequeño)
        const bossScale = 120 / this.boss.height;
        this.boss.setScale(bossScale);
        
        // Ajustamos su tamaño de colisión
        this.boss.body.setSize(this.boss.width * 0.8, this.boss.height * 0.8);
        this.boss.body.setOffset(this.boss.width * 0.1, this.boss.height * 0.2);

        this.boss.setCollideWorldBounds(true);
        this.physics.add.collider(this.boss, this.platforms, this.handleBossPlatformCollision, null, this);
        this.bossHealth = 100;
        this.bossPhase = 1;
        this.bossDirection = Phaser.Math.Between(0, 1) ? 1 : -1;
        this.bossSpeed = 120;
        this.bossArenaMinX = 170;
        this.bossArenaMaxX = 870;
        this.bossLastPlatformBreak = 0;
        this.nextBossDecision = this.time.now + Phaser.Math.Between(1000, 1800);
        this.nextBossJump = this.time.now + Phaser.Math.Between(1400, 2600);
        
        this.bossText = this.add.text(400, 50, 'BOSS: 100%', { fontSize: '24px', fill: '#f00' }).setOrigin(0.5).setScrollFactor(0);
        this.physics.add.overlap(this.player, this.boss, this.golpearJefe, null, this);
    }

    /**
     * update()
     * Loop principal de actualización llamado por Phaser cada frame.
     */
    update() {
        this.actualizarEscena();
    }

    /**
     * actualizarEscena()
     * Procesa entrada del jugador, actualiza enemigos, jefe y verifica
     * condiciones de muerte o transición de nivel.
     */
    actualizarEscena() {
        if (!this.player.active || this.isTransitioning) return;

        this.player.update(this.mobileControls);
        
        this.enemies.getChildren().forEach(enemy => {
            enemy.update();
        });

        if (this.boss && this.boss.active) {
            this.actualizarJefeFinal();
        }

        if (this.player.y > this.scale.height) {
            this.manejarMuerteJugador();
        }
    }

    /**
     * actualizarJefeFinal()
     * Lógica de IA del jefe: movimiento dentro del arena, decisiones aleatorias
     * de persecución y saltos ocasionales.
     */
    actualizarJefeFinal() {
        const now = this.time.now;
        const onGround = this.boss.body.blocked.down || this.boss.body.touching.down;
        const chasePlayer = Phaser.Math.Between(0, 100) < 55;

        if (this.boss.x <= this.bossArenaMinX) {
            this.bossDirection = 1;
        } else if (this.boss.x >= this.bossArenaMaxX) {
            this.bossDirection = -1;
        } else if (now > this.nextBossDecision) {
            if (chasePlayer) {
                this.bossDirection = this.player.x < this.boss.x ? -1 : 1;
            } else if (Phaser.Math.Between(0, 1)) {
                this.bossDirection *= -1;
            }

            this.nextBossDecision = now + Phaser.Math.Between(1000, 1800);
        }

        this.boss.setVelocityX(this.bossSpeed * this.bossDirection);
        this.boss.setFlipX(this.bossDirection < 0);

        if (onGround && now > this.nextBossJump && Phaser.Math.Between(0, 100) < 35) {
            this.boss.setVelocityY(-360);
            this.nextBossJump = now + Phaser.Math.Between(1400, 2600);
        }

        if (this.bossPhase === 2) {
            this.bossSpeed = 170;
        }
    }

    /**
     * handleBossPlatformCollision(boss, platform)
     * Controla la colisión entre jefe y plataformas para permitir romper
     * plataformas específicas del nivel 3.
     */
    handleBossPlatformCollision(boss, platform) {
        if (!boss.active || !platform.active) return;

        // Solo romper las plataformas del nivel 3, no el suelo base.
        if (platform.texture && platform.texture.key !== 'bloquesLava') return;

        const now = this.time.now;
        const bossBody = boss.body;

        // Romper solo cuando el boss cae o aterriza encima.
        if (!bossBody || !(bossBody.blocked.down || bossBody.touching.down) || bossBody.velocity.y < 0) {
            return;
        }

        if (now - this.bossLastPlatformBreak < 700) {
            return;
        }

        this.bossLastPlatformBreak = now;
        platform.destroy();
        boss.setVelocityY(-220);
    }

    /**
     * recogerMoneda(player, coin)
     * Maneja la recolección de una moneda: oculta el objeto, suma puntos
     * y comprueba si hay que iniciar la transición de nivel.
     */
    recogerMoneda(player, coin) {
        coin.disableBody(true, true); // En lugar de destroy(), las ocultamos visual y físicamente.
        GameManager.addScore(10);
        this.hud.updateHUD();
        this.audioManager.playSound('coinSound');   

        // Validamos si aún quedan monedas vivas. disableBody apaga 'active'.
        if (this.coins.countActive(true) === 0 && GameManager.state.level < 3) {
            this.iniciarTransicionDeNivel();
        }
    }

    /**
     * activarCheckpoint(player, checkpoint)
     * Activa el checkpoint tocado por el jugador, guarda el punto de
     * respawn y persiste el nivel actual.
     */
    activarCheckpoint(player, checkpoint) {
        if (checkpoint.activate()) {
            this.spawnPoint = { x: checkpoint.x, y: checkpoint.y };
            GameManager.addScore(50);
            this.hud.updateHUD();
            StorageManager.setLastLevel(GameManager.state.level);

            this.tweens.add({
                targets: checkpoint,
                scaleY: 1.5,
                duration: 200,
                yoyo: true
            });
        }
    }

    /**
     * recogerPotenciador(player, powerup)
     * Aplica el efecto del potenciador al jugador y añade puntos.
     */
    recogerPotenciador(player, powerup) {
        powerup.destroy();
        GameManager.state.hasPowerUp = true;
        this.player.setTint(0x00ffff);
        GameManager.addScore(100);
        this.hud.updateHUD();
    }

    /**
     * colisionarConEnemigo(player, enemy)
     * Determina si el jugador pisa al enemigo (lo elimina) o recibe daño.
     */
    colisionarConEnemigo(player, enemy) {
        if (player.body.velocity.y > 0 && player.y < enemy.y - 10) {
            enemy.destroy();
            player.setVelocityY(-350); 
            GameManager.addScore(20);
            this.hud.updateHUD();
        } else {
            this.procesarDañoJugador();
        }
    }

    /**
     * golpearJefe(player, boss)
     * Maneja el daño que el jugador puede infligir al jefe y las fases
     * de cambio de comportamiento del mismo.
     */
    golpearJefe(player, boss) {
        if (player.body.velocity.y > 0 && player.y < boss.y - 20) {
            this.bossHealth -= 20;
            player.setVelocityY(-400); 
            this.bossText.setText(`BOSS: ${this.bossHealth}%`);
            
            this.tweens.add({
                targets: boss,
                alpha: 0.3,
                duration: 100,
                yoyo: true,
                repeat: 2
            });

            if (this.bossHealth <= 0) {
                boss.destroy();
                this.bossText.setText('BOSS DEFEATED');
                GameManager.addScore(1000);
                
                this.time.delayedCall(1000, () => {
                    this.iniciarTransicionDeNivel();
                });
            } else if (this.bossHealth <= 50 && this.bossPhase === 1) {
                this.bossPhase = 2;
                boss.setTint(0xff00ff); 
            }
        } else {
            this.procesarDañoJugador();
        }
    }

    /**
     * iniciarTransicionDeNivel()
     * Realiza la animación/fade y prepara el avance al siguiente nivel.
     */
    iniciarTransicionDeNivel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.player.setVelocity(0); 
        this.player.body.setAllowGravity(false); 
        this.player.active = false;
        this.player.angle = 0;

        this.cameras.main.fadeOut(1200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.avanzarAlSiguienteNivel();
        });
    }

    /**
     * procesarDañoJugador()
     * Aplica el flujo de daño: si el jugador tiene potenciador lo pierde,
     * en caso contrario se procesa la muerte.
     */
    procesarDañoJugador() {
        if (this.player.takeDamage()) {
            if (GameManager.state.hasPowerUp) {
                GameManager.state.hasPowerUp = false;
                this.player.clearTint();
            } else {
                this.manejarMuerteJugador();
            }
        }
    }

    /**
     * manejarMuerteJugador()
     * Controla la lógica al morir: decrementa vidas, reinicia la escena o
     * muestra la pantalla de Game Over.
     */
    manejarMuerteJugador() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    GameManager.loseLife();

    this.cameras.main.fadeOut(500, 255, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        if (GameManager.state.lives <= 0) {
            this.sound.stopAll();
            this.scene.start('GameOverScene');
        } else {
            this.scene.restart();
        }
    });
}

    /**
     * avanzarAlSiguienteNivel()
     * Si no hay más niveles muestra la escena de victoria, si no incrementa
     * el nivel y reinicia `GameScene`.
     */
    avanzarAlSiguienteNivel() {
    if (GameManager.state.level >= 3) {
        this.sound.stopAll();
        this.scene.start('VictoryScene');
    } else {
        GameManager.state.level++;
        StorageManager.setLastLevel(GameManager.state.level);
        this.scene.start('GameScene');
    }
}
}
