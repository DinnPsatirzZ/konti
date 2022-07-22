let handler = async (m, { conn }) => {
    let { anon, anticall, backup, jadibot, groupOnly, epe, tag, self } = global.db.data.settings[conn.user.jid]

    const chats = Object.keys(await conn.chats)
    const groups = Object.keys(await conn.groupFetchAllParticipating())
    const block = await conn.fetchBlocklist()
    
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)


    m.reply(`
┌─〔 状態 〕
├ アクティブタイム ${uptime}
├ *${groups.length}* グループチャット
├ *${chats.length - groups.length}* プライベートチャット
├ *${Object.keys(global.db.data.users).length}* ユーザー
├ ${block == undefined ? '*0* Diblokir' : '*' + block.length + '* ブロックされた'}
├ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* 禁止されたチャット
├ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* 禁止されたユーザー
└────

┌─〔 セッティング 〕
├ ${anon ? '✅' : '❌'} *匿名チャット*
├ ${anticall ? '✅' : '❌'} *アンチコール*
├ ${backup ? '✅' : '❌'} *自動バックアップデータベース*
├ ${groupOnly ? '✅' : '❌'} *グループモード*
├ ${jadibot ? '✅' : '❌'} *N/A*
├ ${tag ? '✅' : '❌'} *所有者のアンチタグ*
├ ${self ? '✅' : '❌'} *セルフモード*
└────
    `.trim())
}
handler.help = ['stats']
handler.tags = ['about']
handler.command = /^(stat?s?|bot(stat?s?))$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
