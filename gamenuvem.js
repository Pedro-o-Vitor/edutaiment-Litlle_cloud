const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#cceeff",
  scene: { preload, create }
};

const game = new Phaser.Game(config);

let nuvem, robo, dropZone, targetImage, scoreText;
let items = [];
let score = 0;

function preload() {
  this.load.image("nuvem", "nuvem.png");
  this.load.image("robo", "robo.png");
  this.load.image("musica", "musica.png");
  this.load.image("camera", "camera.png");
  this.load.image("videogame", "videogame.png");
}

function create() {
  this.add.text(400, 30, "Leve o item certo para a nuvem ☁️", 
    { fontSize: "24px", color: "#004466" }).setOrigin(0.5);

  // Nuvem
  nuvem = this.add.image(400, 200, "nuvem").setScale(0.4);
  dropZone = this.add.zone(400, 200, nuvem.width * 0.4, nuvem.height * 0.4)
    .setRectangleDropZone(nuvem.width * 0.4, nuvem.height * 0.4);

  // Mascote robô
  robo = this.add.image(400, 500, "robo").setScale(0.4);

  // Ícone alvo dentro da nuvem
  targetImage = this.add.image(400, 200, "musica").setScale(0.2).setVisible(false);

  // Placar
  scoreText = this.add.text(20, 20, "Estrelas: 0", { fontSize: 20, color: "#004466" });

  // Itens arrastáveis
  const options = ["musica", "camera", "videogame"];
  const positions = [200, 400, 600];
  options.forEach((key, i) => {
    const item = this.add.image(positions[i], 400, key).setScale(0.25).setInteractive({ draggable: true });
    item.setData("type", key);
    item.setData("home", { x: positions[i], y: 400 });
    this.input.setDraggable(item);
    items.push(item);
  });

  // Eventos de drag
  this.input.on("drag", (pointer, gameObject, x, y) => {
    gameObject.x = x;
    gameObject.y = y;
  });

  this.input.on("dragend", (pointer, gameObject, dropped) => {
    if (!dropped) resetItem.call(this, gameObject);
  });

  this.input.on("drop", (pointer, gameObject, dropZone) => {
    if (gameObject.getData("type") === dropZone.getData("type")) {
      correct.call(this, gameObject);
    } else {
      wrong.call(this, gameObject);
    }
  });

  // Primeira rodada
  nextRound.call(this);
}

function resetItem(obj) {
  const home = obj.getData("home");
  this.tweens.add({ targets: obj, x: home.x, y: home.y, duration: 300, ease: "Cubic.Out" });
}

function correct(item) {
  score += 1;
  scoreText.setText("Estrelas: " + score);

  // Robô dança
  this.tweens.add({ targets: robo, angle: { from: -15, to: 15 }, duration: 150, yoyo: true, repeat: 6 });

  // Fixa item na nuvem
  item.disableInteractive();
  this.tweens.add({ targets: item, x: dropZone.x, y: dropZone.y, scale: 0.2, duration: 200 });

  this.time.delayedCall(1000, () => nextRound.call(this));
}

function wrong(item) {
  // Animação de erro
  this.tweens.add({ targets: item, x: item.x + 10, duration: 50, yoyo: true, repeat: 2, onComplete: () => resetItem.call(this, item) });
}

function nextRound() {
  const choices = ["musica", "camera", "videogame"];
  const pick = Phaser.Utils.Array.GetRandom(choices);

  dropZone.setData("type", pick);
  targetImage.setTexture(pick).setVisible(true);
}
