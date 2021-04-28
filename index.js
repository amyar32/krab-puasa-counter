require("dotenv").config();

const { Client, MessageAttachment } = require("discord.js");
const hijriSafe = require("hijri-date/lib/safe");
const HijriDate = hijriSafe.default;
const SetInterval = require("set-interval");
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  let sisa = HijriDate.today()._date - 1;
  let custom = msg.content.split("-");

  if (custom[0] === "!reminder" && !isNaN(custom[1])) {
    let interval = parseInt(custom[1]) * 60000;
    const send = function () {
      const attachment = new MessageAttachment(
        `https://krab-puasa-hari.herokuapp.com/- ${sisa}`,
        `puasa-ke-${sisa}.jpg`
      );
      msg.reply(attachment);
    };
    msg.channel.send({
      embed: {
        color: 0xff0000,
        title: `Auto-Reminder aktif setiap : ${interval / 60000} Menit! `,
        fields: [
          {
            name: `More command : `,
            value: "- `!reminder-stop` = Stop reminder \n",
            inline: true,
          },
        ],
      },
    });
    SetInterval.start(send, interval, "test");
  } else if (custom[0] === "!reminder" && custom[1] === "stop") {
    msg.reply("Stopped, Thx!");
    SetInterval.clear("test");
  }
  if (msg.content === "!puasa") {
    const attachment = new MessageAttachment(
      `https://krab-puasa-hari.herokuapp.com/- ${sisa}`,
      `puasa-ke-${sisa}.jpg`
    );
    msg.reply(attachment);
  } else if (msg.content === "!krab-help") {
    msg.channel.send({
      embed: {
        color: 0xff0000,
        title: "Krab Puasa Counter",
        fields: [
          {
            name: "Command List :",
            value:
              "- `!reminder-{number}` = Activate reminder for n/minute \n - `!reminder-stop` = Stop reminder \n- `!puasa` = Count puasa's day now\n- `!puasa-{message}` = Make your own custom message\n- `!krab-help` = Send some help command",
            inline: true,
          },
        ],
      },
    });
  } else if (custom[0] === "!puasa" && custom[1]) {
    const attachment = new MessageAttachment(
      `https://krab-puasa-hari.herokuapp.com/- ${custom[1]}`,
      `puasa-ke-${custom[1]}.jpg`
    );
    msg.reply(attachment);
  }
});

client.login(process.env.TOKEN);
