"use strict";

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;
const dbPassword = process.env.PSQL_PASS;
const knex = require('knex');	

const db = knex({
	client: 'pg',
	connection: {
	    host : '127.0.0.1',
	    user : 'postgres',
	    password : dbPassword,
	    database : 'gamble'
	}
});

//imported bot modules
const replys = require('./bot_modules/messages/index');
const slotMachine = require('./bot_modules/gamble/index');

const money = {
	chris: 100
}

client.on('ready', () => {
	console.log('Ready!');
})

client.on('message', message => {
	const author = message.author.id;

	switch (message.content) {
		case '!dog':
			replys.sendReplyApi('https://dog.ceo/api/breeds/image/random', message);
			break;
		case '!trump':
			replys.sendReplyApi('https://api.whatdoestrumpthink.com/api/v1/quotes/random', message);
			break;
		case '!trumpme':
			replys.sendMessageApi(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${message.author}`, message);
			break;
		case '!commands':
			message.reply('Here are the commands:\n\n!dog\n!trump\n!trumpme', {code:true});
			break;
		case 'yum':
			message.channel.send(':yum:');
			break;
		case '!god': 
			message.channel.send('http://i0.kym-cdn.com/entries/icons/original/000/021/557/conceit.JPG');
			break;
		case '!money':
			db.select('money').from('users').where({ member: author })
			.then(money => {
				message.reply(`You have $${money[0].money}.`);
			});
			break;
	}
	if (message.content.startsWith('!gamble')) {
		const messageArray = message.content.split(" ");		
		if (messageArray.length > 2 || messageArray.length < 2) {
			message.reply('Incorrect format! Try this: "!gamble 10"')			
		} else {
			const gambleAmount = parseInt(messageArray[1]);
			db.select('money').from('users').where({ member: author })
			.then(money => {
				const account = parseInt(money[0].money);				
				if (gambleAmount > account) {
					message.reply('Insufficient funds!');
				} else {
					slotMachine.gamble(account, gambleAmount, message, slotMachine.multiplyers, author, db);
				}
			})
			.catch(err => console.log(err));
		}
	}	
})



client.on('error', err => {
	console.log(err);
});

client.login(token);