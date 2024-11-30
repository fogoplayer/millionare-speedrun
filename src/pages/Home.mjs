/** @typedef {import("../models/assets/Asset.mjs").Asset} Asset */
/** @typedef {import("../models/Resources.mjs").Resource} Resource */
import { LitElement, html, css } from "../libs/lit-all@2.7.6.js";
import globalCss from "../global-styles/global.css.mjs";
import { BronzeTradingPost } from "../models/assets/money/producers/BronzeTradingPost.mjs";
import "../models/assets/money/producers/SilverTradingPost.mjs";
import { CheckingAccount } from "../models/assets/money/storage/CheckingAccount.mjs";
import { RamenFarm } from "../models/assets/food/producers/RamenFarm.mjs";
import { Pantry } from "../models/assets/food/storage/Pantry.mjs";
import { currentScenario, setCurrentScenario } from "../models/game-state/Game.mjs";
import * as GlobalAssetDirectory from "../models/game-state/GlobalAssetDirectory.mjs";
import { Stat } from "../models/Stat.mjs";
import { Resources } from "../models/Resources.mjs";

export default class Home extends LitElement {
  static get properties() {
    return { gameState: { type: Object, state: true } };
  }

  constructor() {
    super();
    this.startGame();
    this.scenario.placeAsset(this.scenario.spawnAsset(BronzeTradingPost));
    this.scenario.placeAsset(this.scenario.spawnAsset(CheckingAccount));
    this.scenario.placeAsset(this.scenario.spawnAsset(RamenFarm));
    this.scenario.placeAsset(this.scenario.spawnAsset(Pantry));
  }

  scenario = currentScenario;

  render() {
    return html`<header><h1>Millionaire Speedrun</h1></header>
      <main>
        <aside>
          <table>
            <tr>
              <th>Resource</th>
              <th>+/tick</th>
              <th>-/tick</th>
              <th>Total stored</th>
            </tr>
            ${Object.values(Resources).map(
              (resourceKey) =>
                html`<tr>
                  <th>${resourceKey}</th>
                  <td>
                    ${[...(this.scenario.assetDirectory.producers.get(resourceKey) ?? [])].reduce(
                      (acc, producer) => acc + (producer.produces.get(resourceKey) ?? 0),
                      0
                    )}
                  </td>
                  <td>
                    ${[...(this.scenario.assetDirectory.consumers.get(resourceKey) ?? [])].reduce(
                      (acc, consumer) => acc + (consumer.consumes.get(resourceKey) ?? 0),
                      0
                    )}
                  </td>
                  <td>
                    ${[...(this.scenario.assetDirectory.stores.get(resourceKey) ?? [])].reduce(
                      (acc, store) => acc + (store.storageUnits.balance(resourceKey) ?? 0),
                      0
                    )}
                  </td>
                </tr>`
            )}
          </table>
        </aside>
      </main>
      <main>
        ${this.scenario
          .getGameState()
          .toString()
          .split("\n")
          .reduce((acc, curr) => {
            acc.push(curr, html`<br />`);
            return acc;
          }, /** @type {any[]} */ ([]))}
      </main>
      <form action="#" @submit=${(/** @type {MouseEvent} */ e) => e.preventDefault()}>
        <button @click=${() => this.scenario.play()}>Play</button>
        <button @click=${() => this.scenario.pause()}>Pause</button>
        <button @click=${() => this.startGame()}>Restart</button>

        ${[...GlobalAssetDirectory.assetsByResource.entries()].map(
          ([resource, assets]) =>
            html` <h2>${resource}</h2>
              <table>
                <tr>
                  <th>Asset</th>
                  <th>Produces</th>
                  <th>Consumes</th>
                  <th>Stores</th>
                  <th>Action</th>
                </tr>
                ${[...assets].map(
                  (asset) => html`
            
                    <tr>
                      <td>${
                        // @ts-ignore
                        asset.prettyName
                      }</td>
                      <td>${
                        // @ts-ignore
                        asset.produces.map(
                          /** @param {{resource: Resource, amount: number}} args */
                          ({ resource, amount }) => html`<p>${resource}: ${amount}</p>`
                        )
                      }</td>
                      <td>${
                        // @ts-ignore
                        asset.consumes.map(
                          /** @param {{resource: Resource, amount: number}} args */
                          ({ resource, amount }) => html`<p>${resource}: ${amount}</p>`
                        )
                      }</td>
                      <td>${
                        // @ts-ignore
                        asset.stores.map(
                          /** @param {Stat<Resource> | Resource} statOrResource */ (statOrResource) =>
                            html`<p>${statOrResource instanceof Stat ? statOrResource.resource : statOrResource}</p>`
                        )
                      }</td>
                      <td><button @click=${() => {
                        const Class = /** @type {new()=>Asset} */ (asset);
                        const newAsset = this.scenario.spawnAsset(Class);
                        this.scenario.placeAsset(newAsset);
                        this.requestUpdate();
                      }}>Add</button></button></td>
                    </tr>
                  </table>`
                )}
              </table>`
        )}
      </form>`;
  }

  startGame() {
    setCurrentScenario();
    this.scenario = currentScenario;
    this.scenario.onTickListeners.add(() => {
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

      table {
        border-collapse: collapse;
      }

      td {
        border: 1px solid black;
      }
    `,
  ];
}

customElements.define("home-", Home);
