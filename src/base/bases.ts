import { Base } from "base/base";
import { StarterBase } from "base/starter_base";

export class Bases {

	public static deserializeBase(memory: BaseMemory): Base {
		if (memory.kind === BaseKind.StarterBase) {
			return StarterBase.deserialize(memory as StarterBaseMemory);
		}

		throw "Unable to deserialize base memory: " + memory;
	}
}