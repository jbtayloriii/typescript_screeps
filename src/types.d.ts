
interface Memory {
	// Handled by memory/memory_initializer
  	current_memory_version: string;

  	// Handled by utils/id_util
	globalId: number;

	// Handled by headquarters
	bases: { [baseId: string]: BaseMemory };

	// Handled by resources/contract_manager
	contracts: Array<ContractMemory>;
}

//
// Base Memory
//

const enum BaseKind {
	Unknown,
	StarterBase,
}

interface BaseMemory {
	kind: BaseKind;
}

interface StarterBaseMemory extends BaseMemory {
	resource_requester: ResourceRequesterMemory;
	tasks: TaskMemory[];
}

//////////////
// Task Memory
//////////////

const enum TaskKind {
	Unknown,
	BasicHarvestTask,
	BasicUpgradeTask,
}

interface TaskMemory {
	kind: TaskKind;
}

interface BasicHarvestTaskMemory extends TaskMemory {
	kind: TaskKind.BasicHarvestTask;
	contractId: string;
	currentState: number;
	sourceId: string;
	spawnId: string;
}

interface BasicUpgradeTaskMemory extends TaskMemory {
	kind: TaskKind.BasicUpgradeTask;
	contractId: string;
	currentState: number;
	sourceId: string;
	controllerId: string;
}

//
// Contract memory
//

const enum ContractKind {
	Unknown,
	CreepContract,
}

interface ContractMemory {
	kind: ContractKind;
	id: string;	
}


interface CreepContractMemory extends ContractMemory {
	kind: ContractKind.CreepContract;
	body: Array<BodyPartConstant>;
	creepId: string | null;
}

/////////////////////////////
// Other uncategorized memory
/////////////////////////////

interface ResourceRequesterMemory {
	contractIds: string[];
	spawnIds: string[];
}
