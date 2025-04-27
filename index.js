const TelegramBot = require('node-telegram-bot-api');
const dotenv  = require('dotenv');
const axios = require('axios');



dotenv.config();

console.log(process.env.Bot_TOKEN);




const token = process.env.Bot_TOKEN;


// Create a bot that uses 'polling' to fetch new updates
const bot  = new TelegramBot(token, { polling: true });

bot.on('message',(msg)=>{const text = msg.text;
    console.log('message recieverd :',text);

    bot.sendMessage(msg.chat.id,`Hello ${msg.from.first_name}, you sent me: ${text}`);
})


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the bot! How can I assist you today?');
});


bot.onText(/\/jokes/,async(msg) => {
    const chatId = msg.chat.id;
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = `${response.data.setup} - ${response.data.punchline}`;
        bot.sendMessage(chatId, joke);
    } catch (error) {
        console.error('Error fetching joke:', error);
        bot.sendMessage(chatId, 'Sorry, I could not fetch a joke at the moment.');
    }
})