import { Tag } from "../types/Tag";

export const Eval = () => {
  const _tags = [{ name: "Action", value: "Eval" }];
  return _tags;
};

export const Transfer = (
  Recipient: string,
  Quantity: string,
  payload: string,
) => {
  const _tags = [
    { name: "Action", value: "Transfer" },
    { name: "Recipient", value: Recipient },
    { name: "Quantity", value: Quantity },
    { name: "X-Payload", value: payload },
  ];
  return _tags;
};

export const Info = () => {
  const _tags = [{ name: "Action", value: "Info" }];
  return _tags;
};

export const FetchEvents = (filters: string) => {
  return [
    { name: "Action", value: "FetchEvents" },
    { name: "Filters", value: filters },
  ];
};