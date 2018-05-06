require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;
const fetch = require('node-fetch');

const sendReply = (url, message) => {
	fetch(url)
	.then(res => res.json())
	.then((json) => {
		console.log(json.message);
		message.reply(json.message);
	})
	.catch(err => {
		console.log(err);
		message.reply("Seems to be an error");
	});
}

const sendMessage = (url, message) => {
	fetch(url)
	.then(res => res.json())
	.then((json) => {
		console.log(json.message);
		message.channel.send(json.message);
	})
	.catch(err => {
		console.log(err);
		message.channel.send("Seems to be an error");
	});
}

client.on('ready', () => {
	console.log('Ready!');
})

client.on('message', message => {	
	if (message.content === '!dog') {		
		sendReply('https://dog.ceo/api/breeds/image/random', message);
	}
	else if (message.content === '!trump') {
		sendReply('https://api.whatdoestrumpthink.com/api/v1/quotes/random', message);
	}
	else if (message.content === '!trumpme') {
		sendMessage(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${message.author}`, message);
	}	
})

client.on('error', err => {
	console.log(err);
});

client.login(token);