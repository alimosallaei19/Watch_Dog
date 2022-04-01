const { Client, Intents } = require('discord.js');

const express = require('express');
require('dotenv').config();
const fs = require('fs');

// DayJS setup
const dayjs = require('dayjs');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(cors());

app.post('/api', async (req, res) => {
	try {
		await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(process.env.EU_CHANNEL_ID).send(`\`\`\`ini\n[${dayjs().format("MM/DD/YY [at] hh:mm:ss A")}] The endpoint "${req.body.api}" was called.\n\`\`\``);
		let command = await require(`./api/${req.body.api}.js`).run(req, res, client, dayjs)
		if(!res.headersSent) {
			res.status(401).json({ status: false, error: 'The endpoint executed, but nothing was returned.' })
		}
	} catch (err) {
		if (err.code === 'MODULE_NOT_FOUND') {
			await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get("956698926092779550").send(`\`\`\`ini\n[${dayjs().format("MM/DD/YY [at] hh:mm:ss A")}] [ERR] An invalid API endpoint was tried.\n\`\`\``);

			res.status(404).json({ status: false, message: 'Invalid API endpoint.' });
		}
	}
});

// listen on port 3000
app.listen(3000, () => console.log('Watch_Dog started on port ' ));


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async () => {
	console.log('Watch_Dog is connected to Discord.');

	client.user.setPresence({
		status: "idle",
		activities: [
			{
				name: "with the vTerminal."
			}
		]
	})

	await client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get("956698926092779550").send(`\`\`\`ini\n[${dayjs().format("MM/DD/YY [at] hh:mm:ss A")}] Bot is online!\n\`\`\``);
});

client.login(process.env.BOT_TOKEN);