'use strict';

import {ErrorMapper} from "./utils/error_mapper";
import {ContractManager} from "./resources/contract_manager";
import { Headquarters } from "headquarters";
import { MemoryInitializer } from "./memory/memory_initializer";
import { IdUtil } from "./utils/id_util";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  // Map top level memory and initialize script
  if (MemoryInitializer.shouldReboot()) {
    console.log('Rebooting memory');

    MemoryInitializer.Initialize();
  }

  // Initialize global objects
  if (!global.idUtil) {
    global.idUtil = new IdUtil(Memory.globalId);
  }

  if (!global.contractManager) {
    global.contractManager = new ContractManager();
  }

  if (!global.hq) {
    console.log('-----Initializing HQ-----');
    delete global.hq;
    global.hq = Headquarters.deserialize();
  }

  ////////////////////
  // Check world state
  ////////////////////
  global.hq.checkWorld();

  /////////////////////////
  // Process resource requests
  /////////////////////////
  global.hq.processResourceRequests();

  //////////////////
  // Perform actions
  //////////////////
  global.hq.execute();

  ///////////////////
  // Serialize at end
  ///////////////////
  Memory.globalId = global.idUtil.getCurrentId();
  global.hq.serialize();
  global.contractManager.serialize();

  /////////////////
  // Visualizations
  /////////////////

  // if (Memory.debug.showOverlay) {
  //   // TODO: add visuals here
  // }
});
