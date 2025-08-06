PlayerEvents.loggedIn(event => {
    event.server.scheduleInTicks(5, () => {
        loggedInplayersanity(event.player);
    });
});

