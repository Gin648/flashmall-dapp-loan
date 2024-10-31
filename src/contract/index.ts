import { config } from "@/config";
import { createContract } from "xycontract";

const contractConfig = createContract({
  providerUrl: config.provider
});

export { contractConfig };
