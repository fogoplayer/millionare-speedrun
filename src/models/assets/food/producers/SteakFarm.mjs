/** @typedef {import("../../../ActionExecutor.mjs").ActionExecutor} ActionExecutor */
/** @typedef {import("../../../scenario-state/ScenarioAssetDirectory.mjs").ScenarioAssetDirectory} AssetDirectory */
import { Asset } from "../../Asset.mjs";
import * as Resources from "../../../Resources.mjs";
import { register } from "../../../game-state/GlobalAssetDirectory.mjs";

export class CaviarFarm extends Asset {
  constructor() {
    super({
      name: "Caviar Farm",
      produces: [
        { resource: Resources.FOOD, amount: 10 },
        { resource: Resources.HAPPINESS, amount: 6 },
      ],
      consumes: [{ resource: Resources.MONEY, amount: 1500 }],
    });
  }
}

register(new CaviarFarm());
