/** @typedef {import("../../../ActionExecutor.mjs").ActionExecutor} ActionExecutor */
/** @typedef {import("../../../scenario-state/ScenarioAssetDirectory.mjs").ScenarioAssetDirectory} AssetDirectory */
import { Asset } from "../../Asset.mjs";
import * as Resources from "../../../Resources.mjs";
import { register } from "../../../game-state/GlobalAssetDirectory.mjs";

export class CheckingAccount extends Asset {
  constructor() {
    super({
      name: "Checking Account",
      stores: [Resources.MONEY],
    });
  }
}

register(new CheckingAccount());
