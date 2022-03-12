import { json } from "stream/consumers";
import { Context, Telegraf } from "telegraf";
import { router } from "./router";

if (process.env.NODE_ENV != 'production'){ require('dotenv').config(); }
const PORT = process.env.PORT || "3000";
const HEROKU_URL = process.env.HEROKU_URL;
const bot = new Telegraf(process.env.BOT_TOKEN||"")

bot.use(async (ctx:Context, next:()=>Promise<void>) => {
    next();
})

bot.start((ctx:Context) => ctx.reply('Welcome'))
bot.help((ctx:Context) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx:Context) => ctx.reply('👍'))
bot.hears('hi', (ctx:Context) => ctx.reply('Hey there'))
bot.on('text', (ctx)=>{
    ctx.reply(router(ctx.message.text));
})



if (process.env.NODE_ENV === 'production') {
    bot.launch({
        webhook: {
            domain: HEROKU_URL,
            port: parseInt(PORT)
        }
    })
} else {
    bot.launch()
}


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))