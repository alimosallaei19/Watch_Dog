exports.run = async (req, res, client, dayjs) => {
    var t = await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(req.body.id)
    if(!t) res.status(404).json({ status: false, error: 'Invalid channel ID.' })

    await t.send(`\`\`\`ini\n[${dayjs().format("MM/DD/YY [at] hh:mm:ss A")}] Terminal completed ✨ \n\`\`\``);

    await t.edit({ 
        position: 500,
        name: `end-${Date.now()}`,
    })

    await t.setParent(process.env.END_CATEGORY)

    res.status(200).json({ status: true })
}