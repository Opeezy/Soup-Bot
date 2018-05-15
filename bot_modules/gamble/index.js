'use strict';

const multiplyers = {
	multiplyers65: [0, .2, .4, .6, .8],
	multiplyers25: [1, 1.2, 1.4, 1.6, 1.8]	
}

//for use inside of the gamble() function
const getMultiplyer = (table, roll) => {
	if (roll < 20) {
		return table[0];
	} else if (roll < 40) {
		return table[1];
	} else if (roll < 60) {
		return table[2];
	} else if (roll < 80) {
		return table[3];
	} else {
		return table[4];;
	}
}

const gamble = (account, gambleAmount, message, multiplyers, author, db) => {
	message.channel.startTyping();
	//for choosing which multiplyer table to use
	const chanceMultiplyers = Math.random() * 100;
	//for choosing which multiplyer in a table to use
	const multiplyerRoll = Math.random() * 100;
	//for choosing whether to add or subtract funds
	const chanceRoll = Math.random() * 100;	

	if (chanceMultiplyers < 10) {	//10% chance		
		if (chanceRoll < 50) {
			const result = gambleAmount + (gambleAmount * 4);			
			const total = account + result;

			db('users').where('member', '=', author).update('money', total).catch(err => console.log(err));
			message.reply(`Jackpot! You gambled $${gambleAmount} and came away with $${result}! You now have $${total}`);
			message.channel.stopTyping();	
		} else {
			const result = gambleAmount + (gambleAmount * 4);			
			const total = account - result;

			if (total < 0) {
				db('users').where('member', '=', author).update('money', 0).catch(err => console.log(err));
				message.reply(`Well shit. You gambled $${gambleAmount} and lost $${result}! You now have nothing :(.`);
				message.channel.stopTyping();					
			} else {
				db('users').where('member', '=', author).update('money', total).catch(err => console.log(err));
				message.reply(`Well shit. You gambled $${gambleAmount} and lost $${result}! You now have $${total}.`);
				message.channel.stopTyping();					
			}			
		}
	} else if (chanceMultiplyers < 35) {	//25% chance		
		const multiplyer = getMultiplyer(multiplyers.multiplyers25, multiplyerRoll);		
		if (chanceRoll < 50) {
			const result = gambleAmount + (gambleAmount * multiplyer);			
			const total = account + result;

			db('users').where('member', '=', author).update('money', total).catch(err => console.log(err));
			message.reply(`You gambled $${gambleAmount} and come away with $${result}! You now have $${total}.`);
			message.channel.stopTyping();				
		} else {
			const result = gambleAmount + (gambleAmount * multiplyer);
			const total = account - result;

			if (total < 0) {
				db('users').where('member', '=', author).update('money', 0).catch(err => console.log(err));
				message.reply(`You gambled $${gambleAmount} and lost $${result}! You now have nothing :(.`);
				message.channel.stopTyping();					
			} else {
				db('users').where('member', '=', author).update('money', total).catch(err => console.log(err));
				message.reply(`You gambled $${gambleAmount} and lost $${result}! You now have $${total}.`);	
				message.channel.stopTyping();				
			}					
		}	
	} else if (chanceMultiplyers < 100) { 	//65% chance		
		const multiplyer = getMultiplyer(multiplyers.multiplyers65, multiplyerRoll);

		if (chanceRoll < 50) {
			const result = gambleAmount + (gambleAmount * multiplyer);
			const total = account + result;

			db('users').where('member', '=', author).update('money', total).catch(err => console.log(err));
			message.reply(`You gambled $${gambleAmount} and come away with $${result}! You now have $${total}.`);
			message.channel.stopTyping();						
		} else {
			const result = gambleAmount + (gambleAmount * multiplyer);
			const total = account - result;

			if (total < 0) {
				db('users').where('member', '=', author).update('money', 0).catch(err => console.log(err));
				message.reply(`You gambled $${gambleAmount} and lost $${result}! You now have nothing :(.`);
				message.channel.stopTyping();					
			} else {
				db('users').where('member', '=', author).update('money', total).catch(err => console.log(err));
				message.reply(`You gambled $${gambleAmount} and lost $${result}! You now have $${total}.`);
				message.channel.stopTyping();					
			}					
		}	
	}
}

module.exports = {
	gamble: gamble,
	multiplyers: multiplyers
}