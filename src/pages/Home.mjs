import { LitElement, html, css } from "../libs/lit-all@2.7.6.js";
import globalCss from "../global-styles/global.css.mjs";
import { Game } from "../models/Game.mjs";
import { BronzeTradingPost } from "../models/assets/money/producers/BronzeTradingPost.mjs";
import { CheckingAccount } from "../models/assets/money/storage/CheckingAccount.mjs";
import { RamenFarmAsset } from "../models/assets/food/producers/RamenFarmAsset.mjs";
import { Pantry } from "../models/assets/food/storage/Pantry.mjs";

export default class Home extends LitElement {
  static get properties() {
    return { gameState: { type: Object, state: true } };
  }

  constructor() {
    super();
    this.startGame();
    this.game.placeAsset(new BronzeTradingPost(this.game.actionExecutor, this.game.assetDirectory));
    this.game.placeAsset(new CheckingAccount(this.game.actionExecutor, this.game.assetDirectory));
    this.game.placeAsset(new RamenFarmAsset(this.game.actionExecutor, this.game.assetDirectory));
    this.game.placeAsset(new Pantry(this.game.actionExecutor, this.game.assetDirectory));
  }

  game = new Game();

  render() {
    return html`<header><h1>Millionaire Speedrun</h1></header>
      <main>
        ${this.game
          .getGameState()
          .toString()
          .split("\n")
          .reduce((acc, curr) => {
            acc.push(curr, html`<br />`);
            return acc;
          }, /** @type {any[]} */ ([]))}
      </main>
      <form action="#" @submit=${(e) => e.preventDefault()}>
        <button @click=${() => this.game.play()}>Play</button>
        <button @click=${() => this.game.pause()}>Pause</button>
        <button @click=${() => this.startGame()}>Restart</button>
      </form>`;
  }

  startGame() {
    this.game = new Game();
    this.game.onTickListeners.add(() => {
      this.requestUpdate();
    });
    this.requestUpdate();
  }

  static styles = [
    globalCss,
    css`
      button {
        padding: 1em;
        border: 1px solid black;
      }
    `,
  ];
}

customElements.define("home-", Home);
