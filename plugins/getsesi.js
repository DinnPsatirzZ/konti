let fs = require('fs')
let handler = async (m, { conn, text }) => {
    m.reply('Tunggu Sebentar...')
    let sesi = await fs.readFileSync('./session.data.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'セシ.ダタ.ジャソン' }, { quoted: m })
}
handler.help = ['session']
handler.tags = ['host']
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i

handler.rowner = true

module.exports = handler
