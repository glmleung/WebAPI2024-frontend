import { client } from "./client";

export const getDogs = async (): Promise<any[]> => {
  const { data } = await client.get("/dogs");
  return data;
};
