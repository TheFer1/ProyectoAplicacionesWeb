# Guardian of the Andes

Juego de plataformas 2D desarrollado con Phaser 3 y Vite.

## Descripción

En este juego controlas a un personaje que avanza por tres niveles, recoge monedas, activa checkpoints, evita enemigos y enfrenta a un jefe final en el nivel 3.

El progreso del jugador se guarda en el navegador usando `localStorage`, incluyendo el último nivel alcanzado, el audio y el high score.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

Instala las dependencias del proyecto desde la carpeta raíz:

```bash
npm install
```

## Ejecución

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

Luego abre la dirección que muestra Vite en el navegador.

Para generar una versión lista para producción:

```bash
npm run build
```

Para previsualizar la versión generada:

```bash
npm run preview
```

## Controles

### Teclado

- `A` o flecha izquierda: mover a la izquierda
- `D` o flecha derecha: mover a la derecha
- `W` o flecha arriba: saltar
- `Pausa` desde el botón superior: detener el juego

### Pantalla táctil

En dispositivos móviles aparecen controles en pantalla:

- Botón izquierdo: mover a la izquierda
- Botón derecho: mover a la derecha
- Botón superior derecho: saltar

## Mecánicas

- Recoge monedas para sumar puntos.
- Activa checkpoints para guardar el progreso.
- Evita enemigos; si los derrotas saltando encima, ganas puntos.
- En el nivel 3 aparece el jefe final.
- El jefe puede moverse, saltar y romper algunas plataformas del escenario.
- El high score se guarda automáticamente en el navegador.

## Estructura del proyecto

```text
src/
├── main.js
├── managers/
│   ├── AudioManager.js
│   ├── GameManager.js
│   └── StorageManager.js
├── objects/
│   ├── Checkpoint.js
│   ├── Coin.js
│   ├── Enemy.js
│   ├── Player.js
│   └── PowerUp.js
├── scenes/
│   ├── GameOverScene.js
│   ├── GameScene.js
│   ├── MenuScene.js
│   ├── PauseScene.js
│   ├── PreloadScene.js
│   └── VictoryScene.js
└── ui/
	├── HUD.js
	└── MobileControls.js
```

### Flujo de escenas

1. `PreloadScene`: carga imágenes, audio y recursos.
2. `MenuScene`: muestra el menú principal.
3. `GameScene`: contiene la jugabilidad principal.
4. `PauseScene`: pausa la partida.
5. `GameOverScene`: pantalla de derrota.
6. `VictoryScene`: pantalla final de victoria.

## Recursos y créditos

- Motor del juego: Phaser 3
- Bundler de desarrollo: Vite
- Desarrollo y estructura del proyecto: proyecto académico de aplicaciones web
- Recursos gráficos y de audio: almacenados en `public/assets/imagenes` y `public/assets/audio`

## Notas

- El juego está configurado para ejecutarse en navegador.
- Si cambias o agregas assets, asegúrate de cargarlos en `PreloadScene` antes de usarlos.
