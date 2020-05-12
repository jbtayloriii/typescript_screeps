import { Contract } from "resources/contract";

export class CreepContract implements Contract {
	private id: string;
	private creep: Creep | null;

	constructor(id: string, creep: Creep | null) {
		this.id = id;
		this.creep = creep;
	}

	public hasCreep(): boolean {
		return this.creep !== null;
	}

	public getCreep(): Creep | null {
		return this.creep;
	}

	public setCreep(creep: Creep): void {
		this.creep = creep;
	}

	public serialize(): CreepContractMemory {
		return {
			id: this.id,
			creepId: this.creep === null ? null : this.creep.id,
		};
	}

	public static deserialize(memory: CreepContractMemory): CreepContract {
		const creep = memory.creepId === null ? null : Game.getObjectById(memory.creepId) as Creep;
		return new CreepContract(memory.id, creep);
	}
}