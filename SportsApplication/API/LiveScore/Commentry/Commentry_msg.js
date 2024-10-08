const goalResponses = [
    "[PLAYER] scores for [TEAM] What a brilliant shot",
    "Goal for [TEAM] The net is shaking [PLAYER] with the strike",
    "[TEAM] finds the back of the net [PLAYER] is the scorer",
    "That's a goal for [TEAM] Superb finish by [PLAYER]",
    "[PLAYER] has done it for [TEAM] The crowd goes wild",
    "Incredible goal by [PLAYER] [TEAM] is on fire",
    "[PLAYER] strikes [TEAM] takes the lead",
    "What a finish [PLAYER] makes it count for [TEAM]",
    "Another goal for [TEAM] [PLAYER] is unstoppable",
    "[PLAYER] takes [TEAM] to the next level with that goal",
    "[PLAYER] scores again [TEAM] dominating",
    "Beautiful play by [PLAYER] [TEAM] scores",
    "[PLAYER] with a fantastic goal [TEAM] celebrates",
    "The crowd erupts [PLAYER] scores for [TEAM]",
    "[PLAYER] finds the net [TEAM] on top",
    "What a strike by [PLAYER] [TEAM] takes the lead",
    "A stunning goal by [PLAYER] [TEAM] in control",
    "[PLAYER] delivers for [TEAM] Another goal",
    "Goal [PLAYER] makes it look easy for [TEAM]",
    "[PLAYER] and [TEAM] celebrate another goal"
];

const foulResponses = [
        "[TEAM] commits a clear foul Referee has no doubts.",
        "Whistle blows for a foul by [TEAM]",
        "That’s a blatant foul by [TEAM]",
        "Free kick awarded against [TEAM] for the foul.",
        "Foul by [TEAM] That looked painful.",
        "[TEAM] gets called for an infringement.",
        "Foul by [TEAM] The referee didn't hesitate.",
        "A clear foul by [TEAM], free kick given.",
        "Play stops as [TEAM] commits a foul.",
        "[TEAM] concedes a foul, and the player goes down.",
        "Foul by [TEAM] The ref steps in quickly.",
        "Free kick awarded to the opposition after a [TEAM] foul.",
        "Foul called against [TEAM] by the official.",
        "[TEAM] fouls The player’s been brought down.",
        "Blatant foul by [TEAM], and the referee signals.",
        "The whistle blows against [TEAM] for a foul."
];

const cornerResponses = [
    "Corner kick for [TEAM] Time to capitalize.",
    "Corner [TEAM] is putting on the pressure.",
    "The ball goes out for a [TEAM] corner.",
    "Another chance for [TEAM] from the corner.",
    "Corner kick [TEAM] looking dangerous.",
    "The defense concedes a corner to [TEAM].",
    "Corner awarded to [TEAM] Can they make it count?",
    "[TEAM] prepares to swing in the corner.",
    "Corner for [TEAM] The tension is rising.",
    "[TEAM] with a set-piece opportunity from the corner.",
    "Another corner for [TEAM] The pressure mounts.",
    "Corner kick for [TEAM] What will they do?",
    "The referee awards a corner to [TEAM].",
    "Corner kick coming up for [TEAM]",
    "[TEAM] lines up for the corner kick.",
    "[TEAM] earns a corner A chance to attack.",
    "Corner kick taken by [TEAM].",
    "[TEAM] readies for the corner. Can they score?",
    "The ball goes out for a [TEAM] corner kick.",
    "Another set-piece for [TEAM] with this corner."
];

const offsideResponses = [
    "Offside The flag is up.",
    "Offside called Play stops.",
    "[TEAM] caught offside The flag is up.",
    "Offside against [TEAM]. The play is stopped.",
    "The linesman flags [TEAM] for offside.",
    "[TEAM] strays offside Good call by the official.",
    "Offside [TEAM] needs to time their runs better.",
    "[TEAM] is caught offside Close call.",
    "The attack is halted by an offside flag on [TEAM].",
    "[TEAM] mistimes their run and is flagged offside.",
    "Offside call against [TEAM] The defense holds firm.",
    "[TEAM] is flagged for offside Play resumes with a free kick.",
    "Offside decision against [TEAM] Play is stopped.",
    "The linesman spots an offside against [TEAM].",
    "Offside [TEAM] thought they were through.",
    "The referee's assistant raises the flag for offside against [TEAM].",
    "Offside call [TEAM] caught by the defense.",
    "Close, but [TEAM] is flagged for offside.",
    "[TEAM] must watch their positioning Offside.",
    "Offside against [TEAM] The attack is stopped.",
    "The flag goes up for offside against [TEAM].",
];

const yellowCardResponses = [
  "Yellow card for [TEAM] player The ref has had enough.",
    "[TEAM] player is booked A yellow card is shown.",
    "The referee shows a yellow card to [TEAM].",
    "Caution [TEAM] player receives a yellow card.",
    "[TEAM] player in the book with a yellow card.",
    "A yellow card for [TEAM] player They need to be careful now.",
    "The ref pulls out the yellow card for [TEAM] player.",
    "[TEAM] receives a yellow card Tempers flaring.",
    "Yellow card issued to [TEAM] player. Discipline is key now.",
    "That's a yellow card for [TEAM] player They need to calm down.",
    "The referee shows a yellow card to a [TEAM] player.",
    "[TEAM] player is shown a yellow card for that challenge.",
    "A yellow card for a [TEAM] player. Play resumes.",
    "[TEAM] player booked. Yellow card shown.",
    "Yellow card [TEAM] player in the referee's book.",
    "The ref hands a yellow card to [TEAM].",
    "[TEAM] player sees yellow A booking from the referee.",
    "[TEAM] player must watch out after that yellow card.",
    "The referee doesn't hesitate. Yellow card for [TEAM] player.",
    "A yellow card shown to [TEAM] player They must be cautious."
];

const redCardResponses = [
    "Red card for [TEAM] Player They're down to ten men.",
    "Straight red [TEAM] Player is in serious trouble now.",
    "[TEAM] is sent off A red card shown by the referee.",
    "Disaster for [TEAM] Player A red card is shown.",
    "[TEAM] sees red They're out of the game.",
    "The referee shows a red card to [TEAM] Drastic turn of events.",
    "A red card for [TEAM] Player The referee has no choice.",
    "[TEAM] Player is sent off with a red card Drama on the pitch.",
    "Red card [TEAM] Player is reduced to ten men.",
    "The referee sends off [TEAM] Player with a red card Chaos ensues.",
    "Red card issued to [TEAM] Player They are down a player.",
    "A moment of madness Red card for [TEAM].",
    "[TEAM] player is shown the red card They're off.",
    "The referee shows a red card to [TEAM] player. They're out.",
    "[TEAM] Player faces a major setback with that red card.",
    "Red card [TEAM] player sent off. They must regroup.",
    "A critical decision Red card for [TEAM] Player.",
    "[TEAM] Player in turmoil after receiving a red card.",
    "The game changes as [TEAM] Player is shown a red card.",
    "Red card [TEAM] Player must play with ten men."
];

const halfTimeResponses = [
    "Half-time Time for a break.",
    "The whistle blows for half-time.",
    "That’s the end of the first half.",
    "Half-time The players head to the dressing rooms.",
    "It’s half-time Time to regroup.",
    "Half-time whistle We’ll be back shortly.",
    "Half-time The first half comes to a close.",
    "The first half ends Half-time.",
    "Half-time The score stands at...",
    "That’s half-time A breather for both teams.",
    "Half-time What a first half it’s been.",
    "The referee signals half-time.",
    "Half-time Time to analyze the first half.",
    "That’s it for the first half Half-time.",
    "Half-time whistle The teams head off the pitch.",
    "End of the first half Half-time break."
];

const fullTimeResponses = [
    "Full-time The match is over.",
    "The referee blows for full-time.",
    "That’s it Full-time.",
    "Full-time whistle The game ends.",
    "It’s full-time The match concludes.",
    "Full-time What a game it’s been.",
    "Full-time The final whistle blows.",
    "The match is over Full-time.",
    "Full-time The scoreline stands at...",
    "That’s full-time An entertaining match.",
    "Full-time whistle The teams shake hands.",
    "The referee signals full-time.",
    "Full-time The final score is...",
    "It’s over Full-time.",
    "Full-time The crowd applauds.",
    "The final whistle Full-time."
];

const penaltyResponses = [
    "Penalty for [TEAM] High drama here.",
    "[TEAM] awarded a penalty The crowd holds its breath.",
    "The referee points to the spot Penalty for [TEAM].",
    "A chance from the penalty spot for [TEAM]",
    "[TEAM] steps up for a penalty Crucial moment.",
    "Penalty kick for [TEAM] Can they convert?",
    "The referee signals for a penalty [TEAM] to take it.",
    "Penalty [TEAM] has a golden opportunity.",
    "[TEAM] prepares to take the penalty kick.",
    "The pressure is on Penalty for [TEAM].",
    "[TEAM] wins a penalty The crowd is on their feet.",
    "The referee awards a penalty to [TEAM]",
    "It's a penalty for [TEAM] Can they score?",
    "[TEAM] with a chance from the penalty spot.",
    "A penalty kick for [TEAM] High stakes here.",
    "[TEAM] gets a penalty The tension rises.",
    "Penalty given to [TEAM] A critical moment.",
    "[TEAM] steps up to take the penalty",
    "Penalty given to [TEAM] A critical moment.",
    "[TEAM] steps up to take the penalty. Can they convert?",
    "The referee awards [TEAM] a penalty kick Can they score?",
    "It's a penalty for [TEAM] The crowd holds its breath."
];

const saveResponses = [
    "What a save The keeper denies him.",
    "Incredible save by the goalkeeper",
    "Saved The keeper keeps it out.",
    "Fantastic save The shot is stopped.",
    "What a stop Brilliant goalkeeping.",
    "Saved by the keeper Great reflexes.",
    "Amazing save He keeps the ball out.",
    "That’s a top save by the goalie.",
    "Saved The keeper comes to the rescue.",
    "Brilliant save Keeps the score level.",
    "What a save Incredible reactions.",
    "Goalkeeper saves it Tremendous effort.",
    "Saved What a moment for the keeper.",
    "Great save Keeps his team in the game.",
    "What a save That was going in.",
    "Superb save The keeper does it again."
];

const missResponses = [
    "That was close Just wide.",
    "Missed He should have scored.",
    "Off target A big chance missed.",
    "He misses Just past the post.",
    "Wide of the mark So close.",
    "Missed opportunity Just inches wide.",
    "That’s a miss He’ll be disappointed.",
    "Just wide That was nearly a goal.",
    "He misses the target Unlucky.",
    "Missed What a chance that was.",
    "So close But it’s a miss.",
    "He puts it wide What a miss.",
    "Miss That should have been a goal.",
    "Off target He can’t believe it.",
    "Just wide A near miss.",
    "Missed The goal was at his mercy."
];

const freeKickResponses = [
    "He stands over the ball, sizing up the wall.",
    "A tense moment as he prepares for the free kick.",
    "He takes a deep breath, ready to strike.",
    "The wall is set, and he’s eyeing his target.",
    "He’s lining up, focused on the task ahead.",
    "All eyes on him as he steps up for the free kick.",
    "He’s got a chance here, and the pressure is on.",
    "He takes a moment to steady himself before the shot.",
    "He surveys his options, ready to make his move.",
    "A quiet hush as he prepares to take the kick.",
    "He’s ready to go, positioning himself carefully.",
    "The crowd waits in anticipation as he lines it up.",
    "He steps up, calculating his next move.",
    "The tension builds as he eyes the goal.",
    "He’s got a real opportunity here, and he knows it."
];



const responses={
    'goal':goalResponses,
    'foul' : foulResponses,
    'corner': cornerResponses,
    'offside': offsideResponses,
    'yellowcard' :yellowCardResponses,
    'redcard':redCardResponses,
    'halftime': halfTimeResponses,
    'fulltime':fullTimeResponses,
    'penality': penaltyResponses,
    'save':saveResponses,
    'miss': missResponses,
    'freekick':freeKickResponses
};

module.exports={responses}