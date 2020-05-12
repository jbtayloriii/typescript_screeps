import { CreepContract } from "resources/contracts/creep_contract";

interface ContractMap {
	creepContracts: Map<string, CreepContract>;
}

export class ContractManager {
	private creepContractMap: Map<string, CreepContract>;

	constructor() {
		const contractMapObj = this.createContractsFromMemory();
		this.creepContractMap = contractMapObj.creepContracts;
	}

	private createContractsFromMemory(): ContractMap {
		let creepContractMap: Map<string, CreepContract> = new Map();

		for (let memory of Memory.contracts) {
			if (memory.kind === ContractKind.CreepContract) {
				const creepContract = CreepContract.deserialize(memory as CreepContractMemory);
				creepContractMap.set(memory.id, creepContract);
			} else {
				throw "Cannot deserialize this contract";
			}
		}

		return {
			creepContracts: creepContractMap
		}
	}

	public getCreepContract(contractId: string): CreepContract {
		const contract = this.creepContractMap.get(contractId);
		if (!contract) {
			throw "Attempting to get nonexistent creep contract with ID " + contractId;
		}
		return contract;
		// if (this.creepContractMap.has(contractId)) {
		// 	return this.creepContractMap.get(contractId);
		// }
	}

	public serialize(): void {
		let memoryArray: Array<CreepContractMemory> = [];
		this.creepContractMap.forEach((mem, key) => memoryArray.push(mem.serialize()));

		Memory.contracts = memoryArray;
	}
}