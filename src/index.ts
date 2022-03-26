if (process.env.NODE_ENV != 'production'){ require('dotenv').config(); }
import { json } from "stream/consumers";
import { Context, Telegraf } from "telegraf";
import { router } from "./router";

const maxMessageSize = 4096;
const splitMessage = (message:string):string[] => {
    let lines = message.split('\n');
    let reply:string[] = [];
    let currPart = "";

    lines.forEach(line => {
        if (currPart.length + line.length + 1 >= maxMessageSize){
            reply.push(currPart);
            currPart = "";
        }
        currPart += line + '\n';
    })

    reply.push(currPart)

    return reply
}


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
bot.on('text', async (ctx)=>{
    splitMessage(await router(ctx.message.text)).forEach(async line => await ctx.reply(line))
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