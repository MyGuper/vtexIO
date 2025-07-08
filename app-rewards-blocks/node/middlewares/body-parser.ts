import { json } from "co-body";

export async function bodyParser(
  ctx: Context,
  next: () => Promise<unknown>
): Promise<unknown> {
  ctx.state.body = await json(ctx.req);

  return await next();
}