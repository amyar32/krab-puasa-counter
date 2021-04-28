require("dotenv").config();

const { Client, MessageAttachment } = require("discord.js");
const hijriSafe = require("hijri-date/lib/safe");
const HijriDate = hijriSafe.default;
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  let sisa = HijriDate.today()._date - 1;
  let custom = msg.content.split("-");

  if (custom[0] === "!unicode") {
    msg.reply(`${custom[1]}`);
  }

  if (msg.content === "!puasa") {
    const attachment = new MessageAttachment(
      `https://krab-puasa-hari.herokuapp.com/- ${sisa}`,
      `puasa-ke-${sisa}.jpg`
    );
    msg.reply(attachment);
  } else if (msg.content === "!puasa-help") {
    // msg.reply(
    //   "```- !puasa = Count puasa sekarang\n- !puasa{custom} = Custom message\n- !puasa-help = Help command```"
    // );
    msg.channel.send({
      embed: {
        color: 0xff0000,
        title: "Krab Puasa Counter",
        fields: [
          {
            name: "Command List :",
            value:
              "- `!puasa` = Count puasa's day now\n- `!puasa-{message}` = Make your own custom message\n- `!puasa-help` = Send some help command",
            inline: true,
          },
        ],
      },
    });
  } else if (custom[0] === "!puasa") {
    const attachment = new MessageAttachment(
      `https://krab-puasa-hari.herokuapp.com/- ${custom[1]}`,
      `puasa-ke-${custom[1]}.jpg`
    );
    msg.reply(attachment);
  }
});

client.login(process.env.TOKEN);
