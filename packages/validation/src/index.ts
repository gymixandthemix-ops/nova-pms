import type { z } from "zod";

export type SchemaInput<Schema extends z.ZodType> = z.input<Schema>;
export type SchemaOutput<Schema extends z.ZodType> = z.output<Schema>;
