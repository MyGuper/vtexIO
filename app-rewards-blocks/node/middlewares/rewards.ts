export async function rewards(ctx: Context, next: () => Promise<any>) {
  const { clients: { guper, session }, vtex: { sessionToken } } = ctx

  console.log( ctx.state.body);

  const sessionInfo = sessionToken ? await session.getSession(sessionToken, ["*"]) : null
  console.log("sessionInfo",sessionInfo)
  const email = sessionInfo?.sessionData?.namespaces?.profile?.email?.value
      const response = await guper.rewardByOrder(email, ctx.state.body)
  console.log("response",response)

  if(!email) {
    ctx.body = {}
    ctx.status = 401;

    await next()
  } else {
    const response = await guper.rewardByOrder(email, ctx.state.body)

    ctx.body = response.data
    ctx.status = 200;

    await next()
  }
}
