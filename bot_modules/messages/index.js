'use strict';

const fetch = require('node-fetch');

const sendReplyApi = (url, message) => {
	message.channel.startTyping();
	fetch(url)
	.then(res => res.json())
	.then((json) => {
		console.log(json.message);
		message.reply(json.message);
		message.channel.stopTyping();
	})
	.catch(err => {
		console.log(err);
		message.reply("Seems to be an error");
		message.channel.stopTyping();
	});	
}

const sendMessageApi = (url, message) => {
	message.channel.startTyping();
	fetch(url)
	.then(res => res.json())
	.then((json) => {
		console.log(json.message);
		message.channel.send(json.message);
		message.channel.stopTyping();
	})
	.catch(err => {
		console.log(err);
		message.channel.send("Seems to be an error");
		message.channel.stopTyping();
	});	
}

module.exports = {
	sendReplyApi: sendReplyApi,
	sendMessageApi: sendMessageApi
}