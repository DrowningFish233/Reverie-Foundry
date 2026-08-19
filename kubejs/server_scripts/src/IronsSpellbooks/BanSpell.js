ISSEvents.spellPreCast(event => {
    if (!event.entity.isPlayer()) return
    let blacklist = [
        "irons_spellbooks:echoing_strikes",
        "hazennstuff:call_forth_terraprisma",
        "hazennstuff:reign_of_tyros",
        "gametechbcs_spellbooks:aerial_collapse"
    ];

    if (blacklist.includes(event.spellId)) {
        event.entity.setStatusMessage(Text.translate('message.spellprecast.ban').red())
        event.cancel();
    }
});
