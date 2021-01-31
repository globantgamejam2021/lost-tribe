import _ from 'lodash';
import Phaser from 'phaser';
import MainScene, { characterKeys } from './MainScene';

export type CharacterCardProps = {
  correctPressAction: () => void;
  wrongPressAction: () => void;
}

export default class CharacterChard extends Phaser.GameObjects.Sprite {
  private characterKey: string;
  private props: CharacterCardProps;

  constructor(scene: MainScene, x: number, y: number, props: CharacterCardProps) {
    super(scene, x, y, null);
    this.props = props;
    this.characterKey = _.sample(characterKeys).key;
    this.setInteractive().on('pointerdown', this.handleClick);
  }

  handleClick() {
    const { correctPressAction, wrongPressAction } = this.props;
    const isCorrect = this.characterKey === this.scene.registry.get('correctCharacterKey');

    if (isCorrect) correctPressAction();
    else wrongPressAction();
    this.refreshCharacterCard();
  }

  refreshCharacterCard() {

  }
}
