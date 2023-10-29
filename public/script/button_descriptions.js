var dungeon_rewards = ["dungeon0", "dungeon1", "dungeon2", "dungeon3"]

var reward = {
    type: "cycle",
    size: "med_rewardtext",
    loop: true,
    opts: dungeon_rewards,
    disable_zero: false
}

var items = {
    bow: {
        type: "cycle",
        size: "majoritem",
        opts: ["bow0", "bow1", "bow2"],
        loop: false,
        disable_zero: true
    },
    boomerang: {
        type: "cycle",
        size: "majoritem",
        opts: ["boomerangs0", "boomerangsblue", "boomerangsred", "boomerangs"],
        loop: false,
        disable_zero: true
    },
    hookshot: {
        type: "toggle",
        size: "majoritem"
    },
    bombs: {
        type: "toggle",
        size: "majoritem"
    },
    powder: {
        type: "toggle",
        size: "majoritem"
    },
    mushroom: {
        type: "toggle",
        size: "majoritem"
    },
    firerod: {
        type: "toggle",
        size: "majoritem"
    },
    icerod: {
        type: "toggle",
        size: "majoritem"
    },
    bombos: {
        type: "toggle",
        size: "majoritem"
    },
    ether: {
        type: "toggle",
        size: "majoritem"
    },
    quake: {
        type: "toggle",
        size: "majoritem"
    },
    shovel: {
        type: "toggle",
        size: "majoritem"
    },
    lamp: {
       type: "toggle",
        size: "majoritem"
    },
    hammer: {
        type: "toggle",
        size: "majoritem"
    },
    flute: {
        type: "toggle",
        size: "majoritem"
    },
    net: {
        type: "toggle",
        size: "majoritem"
    },
    book: {
        type: "toggle",
        size: "majoritem"
    },
    pearl: {
        type: "toggle",
        size: "majoritem"
    },
    bottle: {
        type: "counter",
        size: "majoritem",
        minimum: 0,
        maximum: 4
    },
    somaria: {
        type: "toggle",
        size: "majoritem"
    },
    byrna: {
        type: "toggle",
        size: "majoritem"
    },
    cape: {
        type: "toggle",
        size: "majoritem"
    },
    mirror: {
        type: "toggle",
        size: "majoritem"
    },
    go: {
        type: "toggle",
        size: "majoritem"
    },
    aga: {
        type: "toggle",
        size: "majoritem"
    },
    glove: {
        type: "cycle",
        size: "majoritem",
        opts: ["glove0", "glove1", "glove2"],
        loop: false,
        disable_zero: true
    },
    boots: {
        type: "toggle",
        size: "majoritem"
    },
    flippers: {
        type: "toggle",
        size: "majoritem"
    },
    halfmagic: {
        type: "toggle",
        size: "majoritem",
    },
    sword: {
        type: "cycle",
        size: "majoritem",
        opts: ["sword0", "sword1", "sword2", "sword3", "sword4"],
        loop: false,
        disable_zero: true
    },
    shield: {
        type: "cycle",
        size: "majoritem",
        opts: ["shield0", "shield1", "shield2", "shield3"],
        loop: false,
        disable_zero: true
    },
    tunic: {
        type: "cycle",
        size: "majoritem",
        opts: ["tunic1", "tunic2", "tunic3"],
        loop: false,
        disable_zero: false
    },
    ep: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "ep_reward",
        toggle_obj: "ep_boss"
    },
    ep_boss: {
        type: "toggle",
        size: "majoritem"
    },
    ep_reward: reward,
    dp: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "dp_reward",
        toggle_obj: "dp_boss"
    },
    dp_boss: {
        type: "toggle",
        size: "majoritem"
    },
    dp_reward: reward,
    th: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "th_reward",
        toggle_obj: "th_boss"
    },
    th_boss: {
        type: "toggle",
        size: "majoritem"
    },
    th_reward: reward,
    pod: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "pod_reward",
        toggle_obj: "pod_boss"
    },
    pod_boss: {
        type: "toggle",
        size: "majoritem"
    },
    pod_reward: reward,
    sp: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "sp_reward",
        toggle_obj: "sp_boss"
    },
    sp_boss: {
        type: "toggle",
        size: "majoritem"
    },
    sp_reward: reward,
    sw: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "sw_reward",
        toggle_obj: "sw_boss"
    },
    sw_boss: {
        type: "toggle",
        size: "majoritem"
    },
    sw_reward: reward,
    tt: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "tt_reward",
        toggle_obj: "tt_boss"
    },
    tt_boss: {
        type: "toggle",
        size: "majoritem"
    },
    tt_reward: reward,
    ip: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "ip_reward",
        toggle_obj: "ip_boss"
    },
    ip_boss: {
        type: "toggle",
        size: "majoritem"
    },
    ip_reward: reward,
    mm: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "mm_reward",
        toggle_obj: "mm_boss"
    },
    mm_boss: {
        type: "toggle",
        size: "majoritem"
    },
    mm_reward: reward,
    tr: {
        type: "cycletoggle",
        size: "block-element",
        cycle_obj: "tr_reward",
        toggle_obj: "tr_boss"
    },
    tr_boss: {
        type: "toggle",
        size: "majoritem"
    },
    tr_reward: reward
}