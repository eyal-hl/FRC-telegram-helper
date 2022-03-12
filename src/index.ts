import { Context, NarrowedContext } from "telegraf";

if (process.env.NODE_ENV != 'production'){ require('dotenv').config(); }
console.log("1");
const { Telegraf } = require('telegraf')
const PORT = process.env.PORT;
const HEROKU_URL = process.env.HEROKU_URL;

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(async (ctx:Context, next:()=>Promise<void>) => {
    console.log(ctx);
    next();
})
bot.start((ctx:Context) => ctx.reply('Welcome'))
bot.help((ctx:Context) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx:Context) => ctx.reply('👍'))
bot.hears('hi', (ctx:Context) => ctx.reply('Hey there'))
if (process.env.NODE_ENV === 'production') {
    bot.launch({
        webhook: {
            domain: HEROKU_URL,
            port: parseInt(process.env.PORT || '3000')
        }
    })
} else {
    bot.launch()
}


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))