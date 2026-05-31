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

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
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
            worldWidth = 1000; // El nivel del Jefe es de tamaño de pantalla (800)
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

        this.createLevel();
        
        this.player = new Player(this, 50, 400);
        this.physics.world.setBounds(0, 0, worldWidth, this.scale.height);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, worldWidth, this.scale.height);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.checkpoints, this.hitCheckpoint, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);

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
            this.createBoss();
        }
    }

    createLevel() {
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
        { x: 350, y: 350 },
        { x: 550, y: 450 },
        { x: 750, y: 350 }
    ];

    plataformas.forEach(pos => {
        const p = this.platforms.create(
            pos.x,
            pos.y,
            'bloquesLava'
        );

        p.setDisplaySize(100, 20);
        p.refreshBody();
    });
}
    }

    createBoss() {
        this.boss = this.physics.add.sprite(800, 400, 'boss');
        // Escalamos al jefe de manera similar al jugador para que mida unos 120 pixeles de alto (puedes cambiar este 120 si lo quieres más grande/pequeño)
        const bossScale = 120 / this.boss.height;
        this.boss.setScale(bossScale);
        
        // Ajustamos su tamaño de colisión
        this.boss.body.setSize(this.boss.width * 0.8, this.boss.height * 0.8);
        this.boss.body.setOffset(this.boss.width * 0.1, this.boss.height * 0.2);

        this.boss.setCollideWorldBounds(true);
        this.physics.add.collider(this.boss, this.platforms);
        this.bossHealth = 100;
        this.bossPhase = 1;
        
        this.bossText = this.add.text(400, 50, 'BOSS: 100%', { fontSize: '24px', fill: '#f00' }).setOrigin(0.5).setScrollFactor(0);
        this.physics.add.overlap(this.player, this.boss, this.hitBoss, null, this);
        
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                if (!this.boss || !this.boss.active) return;
                
                if (Phaser.Math.Between(0, 1) === 0) {
                    this.boss.setVelocityY(-400);
                    const dir = this.player.x < this.boss.x ? -150 : 150;
                    this.boss.setVelocityX(dir);
                } else {
                    this.boss.setVelocityX(0);
                }
            },
            loop: true
        });
    }

    update() {
        if (!this.player.active || this.isTransitioning) return;

        this.player.update(this.mobileControls);
        
        this.enemies.getChildren().forEach(enemy => {
            enemy.update();
        });

        if (this.player.y > this.scale.height) {
            this.handlePlayerDeath();
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true); // En lugar de destroy(), las ocultamos visual y físicamente.
        GameManager.addScore(10);
        this.hud.updateHUD();
        this.audioManager.playSound('coinSound');   

        // Validamos si aún quedan monedas vivas. disableBody apaga 'active'.
        if (this.coins.countActive(true) === 0 && GameManager.state.level < 3) {
            this.completeLevelTransition();
        }
    }

    hitCheckpoint(player, checkpoint) {
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

    collectPowerUp(player, powerup) {
        powerup.destroy();
        GameManager.state.hasPowerUp = true;
        this.player.setTint(0x00ffff);
        GameManager.addScore(100);
        this.hud.updateHUD();
    }

    hitEnemy(player, enemy) {
        if (player.body.velocity.y > 0 && player.y < enemy.y - 10) {
            enemy.destroy();
            player.setVelocityY(-350); 
            GameManager.addScore(20);
            this.hud.updateHUD();
        } else {
            this.handlePlayerDamage();
        }
    }

    hitBoss(player, boss) {
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
                    this.completeLevelTransition();
                });
            } else if (this.bossHealth <= 50 && this.bossPhase === 1) {
                this.bossPhase = 2;
                boss.setTint(0xff00ff); 
            }
        } else {
            this.handlePlayerDamage();
        }
    }

    completeLevelTransition() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.player.setVelocity(0); 
        this.player.body.setAllowGravity(false); 
        this.player.active = false;
        this.player.angle = 0;

        this.cameras.main.fadeOut(1200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.nextLevel();
        });
    }

    handlePlayerDamage() {
        if (this.player.takeDamage()) {
            if (GameManager.state.hasPowerUp) {
                GameManager.state.hasPowerUp = false;
                this.player.clearTint();
            } else {
                this.handlePlayerDeath();
            }
        }
    }

    handlePlayerDeath() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        GameManager.loseLife();
        
        this.cameras.main.fadeOut(500, 255, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            if (GameManager.state.lives <= 0) {
                this.scene.start('GameOverScene');
            } else {
                this.scene.restart();
            }
        });
    }

    nextLevel() {
        if (GameManager.state.level >= 3) {
            this.scene.start('VictoryScene'); 
        } else {
            GameManager.state.level++;
            StorageManager.setLastLevel(GameManager.state.level);
            this.scene.start('GameScene'); 
        }
    }
}
