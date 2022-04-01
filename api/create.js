exports.run = async (req, res, client, dayjs) => {
    var t = await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(process.env.LIVE_QUEUE).createChannel(`live-${Date.now()}`, {
        type: 'text'
    })

    await t.send(`<@755763353753878588>\`\`\`ini\n[${dayjs().format("MM/DD/YY [at] hh:mm:ss A")}] A new live terminal session was enabled for: ${req.body.status || "N/A"}\n\`\`\``)

    res.status(200).json({ status: true, id: t.id })
}