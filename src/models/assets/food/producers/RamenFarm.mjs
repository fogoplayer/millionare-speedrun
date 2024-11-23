/** @typedef {import("../../../ActionExecutor.mjs").ActionExecutor} ActionExecutor */
/** @typedef {import("../../../scenario-state/ScenarioAssetDirectory.mjs").ScenarioAssetDirectory} AssetDirectory */
import { Asset } from "../../Asset.mjs";
import { Resources } from "../../../Resources.mjs";
import { register } from "../../../game-state/GlobalAssetDirectory.mjs";

export class RamenFarm extends Asset {
  constructor() {
    super({
      prettyName: "Ramen Farm",
      produces: [{ resource: Resources.FOOD, amount: 10 }],
      consumes: [
        { resource: Resources.MONEY, amount: 3 },
        { resource: Resources.HAPPINESS, amount: 1 },
      ],
    });
  }
}

register(new RamenFarm());
