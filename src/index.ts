if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
import { Context, Telegraf } from "telegraf";
import { router } from "./router";

const maxMessageSize = 4096;
const splitMessage = (message: string): string[] => {
  let lines = message.split("\n");
  let reply: string[] = [];
  let currPart = "";

  lines.forEach((line) => {
    if (currPart.length + line.length + 1 >= maxMessageSize) {
      reply.push(currPart);
      currPart = "";
    }
    currPart += line + "\n";
  });

  reply.push(currPart);

  return reply;
};
const helpMessage = `All times are in israel time



matches {teams seperated by ','} - will return you all future matches of those teams sorted by amount of favorite teams in match and then by time, for example "matches 1937,254"

If there are no future matches for those teams or one of the teams is not real there will not be a response

all matches {teams seperated by ','} - same us above but all matches instead of only future once, for example "allmatches 1937,254"

if one or more of the teams are not real there will not be a response


good matches {teams seperated by ','} - same as above but filters out games that have less then 2 favorite teams


all good matches {teams seperated by ','} - same as above but filters out games that have less then 2 favorite teams


event score {year} - will rank all events in the year based on the average rp score for team in the event (strengh of event)

winrate {year} - will return the top 100 teams sorted by winrate in official events

stats {year} - will return the top 10 teams sorted by winrate/wins/losses/ties in official events

4rp {team} {year} - Will return the percent and total of qual games the team got 4 rp in official play

source code: https://github.com/eyal-hl/telegram-bot`;

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.use(async (ctx: Context, next: () => Promise<void>) => {
    next();
});

bot.start((ctx: Context) => ctx.reply('Welcome, type "/help" for commands'));
bot.help((ctx: Context) => ctx.reply(helpMessage));
bot.on("sticker", (ctx: Context) => ctx.reply("👍"));
bot.hears("hi", (ctx: Context) => ctx.reply("Hey there"));
bot.on("text", async (ctx) => {
    console.log(`${ctx.message.chat.id}: ${ctx.message.text}`);
    try {
        const messages = splitMessage(await router(ctx.message.text));
        for (let index = 0; index < messages.length; index++) {
            await ctx.reply(messages[index]);
        }
    } catch (e) {
        console.log(e);
        
        ctx.reply("error");
    }
});


// Old heroku stuff
// const HEROKU_URL = process.env.HEROKU_URL;
// const PORT = process.env.PORT || "3000";
// if (process.env.NODE_ENV === 'production') {
//     bot.launch({
//         webhook: {
//             domain: HEROKU_URL,
//             port: parseInt(PORT)
//         }
//     })
// } else {
bot.launch();
// }

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
