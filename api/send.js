exports.run = async (req, res, client, dayjs) => {
    var t = await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(req.body.id)
    if(!t) res.status(404).json({ status: false, error: 'Invalid channel ID.' })

    await t.send(`\`\`\`ini\n${req.body.msg ? "" : "# "}[${dayjs().format("MM/DD/YY [at] hh:mm:ss A")}] ${req.body.msg || "EMPTY MESSAGE"}\n\`\`\``)

    res.status(200).json({ status: true})
}