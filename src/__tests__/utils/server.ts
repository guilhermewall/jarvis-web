import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Setup MSW server com handlers
export const server = setupServer(...handlers);
