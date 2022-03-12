

import { Context, NarrowedContext } from "telegraf";

if (process.env.HEROKU == undefined){ require('dotenv').config(); }



const { Telegraf } = require('telegraf')
const PORT = process.env;
const HEROKU_URL = process.env.HEROKU_URL;

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log("1");
bot.use(async (ctx:Context, next:()=>Promise<void>) => {
    console.log(ctx);
    next();
})
console.log("2");
bot.start((ctx:Context) => ctx.reply('Welcome'))
bot.help((ctx:Context) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx:Context) => ctx.reply('👍'))
bot.hears('hi', (ctx:Context) => ctx.reply('Hey there'))
console.log("3");
if (process.env.HEROKU == undefined){
    bot.launch()
}else{
    bot.telegram.setWebhook(`${HEROKU_URL}/bot${process.env.BOT_TOKEN}`);
    bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, PORT)
}
console.log("4");



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))