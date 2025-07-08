export async function postForm(ctx: Context, next: () => Promise<any>) {
  const { clients: { guper, session }, vtex: { sessionToken } } = ctx


  const sessionInfo = sessionToken ? await session.getSession(sessionToken, ["*"]) : null

  const email = sessionInfo?.sessionData?.namespaces?.profile?.email?.value

  if(!email) {
    ctx.body = {}
    ctx.status = 401;

    await next()
  } else {
    const response = await guper.postForm(ctx.state.body.submissionKey, ctx.state.body.data)
    ctx.body = response.data
    ctx.status = 200;

    await next()
  }
}
