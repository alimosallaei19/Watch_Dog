exports.run = async (req, res, client, dayjs) => {
    var t = await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(req.body.id)
    if(!t) res.status(404).json({ status: false, error: 'Invalid channel ID.' })

    await t.delete()

    res.status(200).json({ status: true })
}