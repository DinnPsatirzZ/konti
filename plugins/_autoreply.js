let fs = require('fs')
let moment = require('moment-timezone')

let handler = m => m

handler.all = async function (m) {
    if (m.chat.endsWith('status@broadcast')) {
        console.log('sw cok')
    }
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]
    let { group } = db.data.settings[this.user.jid]
    let setting = db.data.settings[this.user.jid]
    let user = global.db.data.users[m.sender]
    
    // salam
    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
    }

    let tomxic = /(ajg|anji?|kntl|kont?|mmk|meme?|tolol|babi|monye?|bangsat|bego|bodoh|tai|bangke|tomlol|bjir|njir|asu|asw|gblk|goblo?|aho|baka|kuso|chikuso|anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole)/i
    let isharam = tomxic.exec(m.text)
    if (isharam && !m.fromMe) {
        m.reply (`إِنَّ شَرَّ النَّاسِ مَنْزِلَةً عِنْدَ اللَّهِ يَوْمَ الْقِيَامَةِ مَنْ وَدَعَهُ أَوْ تَرَكَهُ النَّاسُ اتِّقَاءَ فُحْشِهِ“Sesungguhnya orang yang paling buruk kedudukannya pada hari kiamat di sisi Allah adalah orang yang ditinggalkan oleh manusia akibat takut akan keburukannya.” `)
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(m.chat, `PC Owner gratis masukin bot asal mem 200+ :v
`.trim(), wm, 'Pemilik Bot', '.owner', m)
    }

    if (m.isGroup) {
    if (m.fromMe) return
    if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
    	await this.send2Button(m.chat, m.msg.contextInfo.expiration == 604800 ? '\n\nHah ?' : 'iyah banh :v', wm, `${isBanned ? 'UNBAN' : 'MENU'}`, `${isBanned ? '.unban' : '.?'}`, `${!m.isGroup ? 'DONASI' : isBanned ? 'MENU' : 'OWNER'}`, `${!m.isGroup ? '.donasi' : isBanned ? '.MENU' : '.owner'}`, m)
    }
}
    
    if (/^bot$/i.test(m.text)) {
        await this.sendButton(m.chat, !(m.isGroup || m.isPrems) && group ? 'hanya grup' : isBanned ? 'chat banned' : banned ? 'user banned' : 'aktif', wm, !(m.isGroup || m.isPrems) && group ? 'donasi' : isBanned ? 'unban' : banned ? 'minta owner kalo mau di unban' : 'donasi', !(m.isGroup || m.isPrems) && group ? '.donasi' : isBanned ? '.unban' : banned ? '.owner' : '.donasi', m)
    }


    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            let data = fs.readFileSync('./database.json')
            await this.sendMessage(owner[0] + '@s.whatsapp.net', { document: data, mimetype: 'application/json', fileName: 'database.json' }, { quoted: null })
            setting.backupDB = new Date() * 1
        }
    }

    return !0
}

module.exports = handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat dinihari"
    if (time >= 4) {
        res = "おはようございます 🌄"
    }
    if (time > 10) {
        res = "こんにちは ☀️"
    }
    if (time >= 15) {
        res = "こんにちは 🌅"
    }
    if (time >= 18) {
        res = "こんばんは 🌙"
    }
    return res
}

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
