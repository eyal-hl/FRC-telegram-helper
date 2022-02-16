if (process.env.NODE_ENV == 'development'){ require('dotenv').config(); }

const { Telegraf } = require('telegraf')
const PORT = process.env.PORT;
const URL = process.env.URL;

  

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(async (ctx, next) => {
    console.log(ctx);
    next();
})

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

if (process.env.NODE_ENV == 'development'){
    bot.launch()
}else{
    bot.telegram.setWebhook(`${URL}/bot${process.env.BOT_TOKEN}`);
    bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, PORT)
}



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))