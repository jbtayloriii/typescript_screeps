import { Contract } from "resources/contract";

export class CreepContract implements Contract {
	private id: string;
	private body: Array<BodyPartConstant>;
	private creep: Creep | null;

	constructor(id: string, body: Array<BodyPartConstant>, creep: Creep | null) {
		this.id = id;
		this.body = body;
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

	public getBody(): Array<BodyPartConstant> {
		return this.body;
	}

	public serialize(): CreepContractMemory {
		return {
			kind: ContractKind.CreepContract,
			id: this.id,
			body: this.body,
			creepId: this.creep === null ? null : this.creep.id,
		};
	}

	public getId():string {
		return this.id;
	}

	public static deserialize(memory: CreepContractMemory): CreepContract {
		const creep = memory.creepId === null ? null : Game.getObjectById(memory.creepId) as Creep;
		return new CreepContract(memory.id, memory.body, creep);
	}
}