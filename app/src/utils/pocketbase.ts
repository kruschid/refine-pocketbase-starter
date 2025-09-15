import PocketBase from "pocketbase";
import type { TypedPocketBase } from "../pocketbase.generated";

export const pb = new PocketBase(
  import.meta.env.DEV ? "http://127.0.0.1:8090" : import.meta.env.PB_URL,
) as TypedPocketBase;
