import _ from 'lodash';
import Phaser from 'phaser';
import CharacterChard from './CharacterCard';
import { animatedCharacterKeys, Level, levels } from './game';

export default class MainScene extends Phaser.Scene {
  private currentLevel: Level;
  private remainingTime: number;
  private characterCards: Phaser.GameObjects.Group;

  preload() {
    this.load.image('background', 'assets/background.png');
    for (let level = 0; level < levels.length; level += 1) {
      for (let character = 0; character < 9; character += 1) {
        this.loadFramesForLevelCharacter(level, character);
      }
    }
  }

  private loadFramesForLevelCharacter(level: number, character: number) {
    const key = `character${character}Level${level}`;
    const path = `assets/level${level}/character-${character}.png`;
    const frameData = animatedCharacterKeys[key];
    if (!frameData) this.load.image(key, path);
    else {
      const { frameWidth, frameHeight } = frameData;
      this.load.spritesheet(`${key}Frames`, path, { frameWidth, frameHeight });
    }
  }

  create() {
    this.registry.set('currentLevel', 0);
    this.add.image(0, 0, 'background');
    this.createAnimations();
    this.characterCards = this.add.group();
    this.addPressableObjectsToScene();
    this.setUpCurrentLevel();
  }

  createAnimations() {
    Object.entries(animatedCharacterKeys).forEach(
      ([key, { start, end }]) => this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(`${key}Frames`, { start, end }),
        frameRate: 4,
        repeat: -1,
      }),
    );
  }

  addPressableObjectsToScene() {
    this.currentLevel.objectCoordinates.forEach(([x, y], index) => {
      const characterKey = `character${index}Level${this.registry.values.currentLevel}`;
      const characterCard = new CharacterChard(this, x, y, {
        characterKey,
        isCorrect: index === this.currentLevel.correctCharacter,
        pressAction: this.handlePress,
      });
      this.characterCards.add(characterCard);
    });
  }

  handlePress(isCorrect: boolean) {
    if (isCorrect) this.win();
    else {
      this.updateTime(this.currentLevel.timeLossOnError);
    }
  }

  setUpCurrentLevel() {
    this.currentLevel = levels[this.registry.values.currentLevel];
    this.remainingTime = this.currentLevel.time;
    this.time.addEvent({ delay: 1000, callback: this.updateTime.bind(this, -1) });
  }

  updateTime(timeDelta: number) {
    this.remainingTime = Math.max(0, this.remainingTime + timeDelta);
    if (this.remainingTime === 0) this.lose();
  }

  win() {

  }

  lose() {

  }
}
