import Phaser from 'phaser';
import CharacterChard from './CharacterCard';

const correctResponseProbability = 0.3;
const [objectWidth, objectsHeight] = [75, 175];
const objectCoordinates: [number, number][] = [[100, 300], [250, 300], [400, 300]];

export default class MainScene extends Phaser.Scene {
  clock: Phaser.Time.Clock;
  rectangles: Phaser.GameObjects.Rectangle[] = [];

  preload() {
    this.load.spritesheet('character1Frames', 'assets/character-1.png', { frameWidth: 94, frameHeight: 104 });
    this.load.spritesheet('character2Frames', 'assets/character-2.png', { frameWidth: 99, frameHeight: 108 });
  }

  create() {
    this.anims.create({
      key: 'character1',
      frames: this.anims.generateFrameNumbers('character1', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.addPressableObjectsToScene();
    this.add.existing(new CharacterChard(this, 100, 100, 'character1'));
  }

  addPressableObjectsToScene() {
    this.rectangles = objectCoordinates.map(([x, y]) => this.createNewRectangle(x, y));
  }

  private createNewRectangle(x: number, y: number) {
    const [isCorrect, color] = this.getRandomObjectProperties();
    const rectangle = this.add.rectangle(x, y, objectWidth, objectsHeight, color)
      .setInteractive().setData('isCorrect', isCorrect);
    return rectangle.on('pointerdown', this.handleObjectClick.bind(this, rectangle));
  }

  private handleObjectClick = (gameObject) => {
    alert(Object.keys(gameObject));
  }

  private getRandomObjectProperties: () => [boolean, number] = () => {
    if (Math.random() < correctResponseProbability) return [false, 0x00f000];
    return [true, 0xff0000];
  }
}
