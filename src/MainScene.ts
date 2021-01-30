import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.addPressableObjectsToScene();
  }

  addPressableObjectsToScene() {
    this.add.rectangle(200, 250, 50, 100);
    this.add.rectangle(250, 250, 50, 100);
    this.add.rectangle(300, 250, 50, 100);
  }
}
