let handler = async (m, { conn }) => {
	let emot = conn.pickRandom(["😁", "😇", "🙏🏻", "🫂", "👳🏻‍♂️", "👋🏻", "🕌", "🕋", "📿"])
	let emoji = {
    	react: {
    		text: emot,
    		key: m.key
    	}
    }
    conn.sendMessage(m.chat, emoji)
}
handler.customPrefix = /(assalam?|asalam?)/i
handler.command = new RegExp

module.exports = handler