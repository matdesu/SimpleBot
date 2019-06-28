const Discord = require('discord.js');
const specs = require('./specs.json');
const config = require('./config.json');


var specs_username = specs.username;
var specs_creator = specs.creator;
var specs_lang = specs.lang;
var specs_footer = specs.footer; // AO USAR O SPECS_FOOTER FAÇA O SEGUINTE: `Em Embeds` .setFooter(`${specs_footer}`). `Em Replies ou em Mensagens` message.reply(`${specs_footer}`) || message.channel.send(`${specs_footer}`)

var token = config.token; // TROQUE O TOKEN POR O DE SEU BOT
var prefix = config.prefix; // TROQUE O PREFIX PELO OQUE VOCÊ GOSTE
var owner = config.owner; // NÃO TROQUE ESTE var.
var bot = config.original_id;
var client = new Discord.Client()

fs.readdir  ("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let cmd = file.split(".")[0];
      console.log(`O Comando ${prefix}${cmd} Foi Carregado Com Sucesso!`);
      bot.commands.set(cmd, props);
    }); 
  });

client.on("ready", () => {
	console.log(`${client.user.username} Está Logado!\n\n// Carregando specs.json... //`)

	let status = [ { name: `${prefix}ajuda é a solução!`, type: 'PLAYING'}, 
	{ name: `Este é um Template do meu Criador ${specs_creator}...`, type: 'WATCHING' },
	{ name: `Uau! Estou com ${client.users.size} Usuários Ativos! Olha só quanta gente!`, type: 'STREAMING', url: 'https://www.twitch.tv/player_dbr'}
	]
	
	/* 
	   1 - Jogando
	   2 - Assistindo
	   3 - Ouvindo
	   4 - Streaming
	*/

    function setStatus() {
      let randomStatus = status[Math.floor(Math.random() * status.length)];
      bot.user.setPresence({ game: randomStatus });
    }
    setStatus();
    setInterval(() => setStatus(), 15000);

    /*

	  Como Funciona o Intervalo?

	  1 Segundo equivale a um intervalo de 1000,
	  se este valor for por exemplo 20000ms,
	  ele será um valor de 20seg, e por aí vai.                    

	  [ INTERVALO DEFAULT: 15000 ]

    */
})

client.login(token)
