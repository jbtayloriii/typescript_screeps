import { StarterBase } from "base/starter_base";
import { Base } from "base/base";
import { Bases } from "base/bases";

export class Headquarters {
	private bases: Base[];


	constructor(bases: Base[]) {
		this.bases = bases;
	}

	public checkWorld() {
		// TODO: Wrap this in a timed check for ~10000 ticks
		if (this.bases.length == 0) {
			this.bases.push(StarterBase.CreateStarterBase());
		}
	}

	public static deserialize(): Headquarters {
		if (!Memory.headquarters || !Memory.headquarters.bases) {
			throw "Cannot initialize HQ without memory structure."; 
		}
		const bases: Array<Base> = [];
		for (let baseId in Memory.headquarters.bases) {
			bases.push(Bases.deserializeBase(Memory.headquarters.bases[baseId]));
		}
		return new Headquarters(bases);
	}

	execute(): void {
		for (const base of this.bases) {
			base.run();
		}
	}
}