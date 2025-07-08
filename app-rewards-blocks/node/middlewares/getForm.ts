export async function getForm(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { guper },
  } = ctx

  const response = await guper.getForm('4', 'vtex')

  ctx.body = response.data
  ctx.status = 200

  await next()
}
