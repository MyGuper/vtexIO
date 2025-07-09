export async function postForm(ctx: Context, next: () => Promise<any>) {
  const { clients: { guper } } = ctx

  const response = await guper.postForm(ctx.state.body.submissionKey, ctx.state.body.data)
  ctx.body = response.data
  ctx.status = 200;

  await next()

}
