import { Contract } from "resources/contract";

export class CreepContract implements Contract {
	private id: string;
	private body: Array<BodyPartConstant>;
	private creep: Creep | null;
	private creepId: string;

	constructor(id: string, body: Array<BodyPartConstant>, creep: Creep | null, creepId: string) {
		this.id = id;
		this.body = body;
		this.creep = creep;
		this.creepId = creepId;
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

	public getCreepId(): string {
		return this.creepId;
	}

	public serialize(): CreepContractMemory {
		return {
			kind: ContractKind.CreepContract,
			id: this.id,
			body: this.body,
			creepId: this.creepId,
		};
	}

	public getId():string {
		return this.id;
	}

	public static deserialize(memory: CreepContractMemory): CreepContract {
		const creep = memory.creepId in Game.creeps ? Game.creeps[memory.creepId] : null;
		return new CreepContract(memory.id, memory.body, creep, memory.creepId);
	}
}