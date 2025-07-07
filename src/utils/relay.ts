import { type JWKInterface } from "arweave/node/lib/wallet.js";
import { read, send } from "./process.js";
import type { Tag } from "../types/Tag.js";

import {
  Eval,
  FetchEvents,
  Info
} from "./messageFactory.js";

export const evalProcess = async (
  signer: JWKInterface,
  data: string,
  processId: string,
) => {
  try {
    const tags = Eval();
    await send(signer, processId, tags, data);
  } catch {
    // Silent error handling for evaluation process
  }
};

export const event = async (
  signer: JWKInterface,
  hub: string,
  tags: Array<Tag>,
  data?: string,
) => {
  const actionTag: Tag = {
    name: "Action",
    value: "Event",
  };
  const idTag: Tag = {
    name: "Original-Id",
    value: "",
  };
  tags.push(actionTag);
  tags.push(idTag);
  try {
    await send(signer, hub, tags, data || null);
  } catch {
    // Silent error handling for events
  }
};

export const info = async (
  processId: string,
): Promise<Record<string, unknown>> => {
  const message = Info();
  const result = await read(processId, message);
  if (result) {
    const json = JSON.parse(result.Data);
    return json;
  } else {
    throw new Error("Not Found");
  }
};

export const fetchEvents = async (
  processId: string,
  filters: string,
): Promise<Record<string, unknown>[]> => {
  let events: Record<string, unknown>[] = [];
  try {
    const message = FetchEvents(filters);
    const result = await read(processId, message);

    if (result) {
      const json = JSON.parse(result.Data);
      events = json;
    }
  } catch {
    // Silent error handling for fetch events
  }
  return events;
};
