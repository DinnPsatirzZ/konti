let handler = async (m, { conn }) => {
	let emot = conn.pickRandom(["❌", "⛔", "🚫", "⚠️", "☢️"])
	let emoji = {
    	react: {
    		text: emot,
    		key: m.key
    	}
    }
    conn.sendMessage(m.chat, emoji)
}
handler.customPrefix = /(ajg|anji?|kntl|kont?|mmk|meme?|tolol|babi|monye?|bangsat|bego|bodoh|tai|bangke|tomlol|bjir|njir|asu|asw|gblk|goblo?|aho|baka|kuso|chikuso|anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole)/i //maap klo tomxic :v
handler.command = new RegExp

module.exports = handler