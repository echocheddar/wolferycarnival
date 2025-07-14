let difficulty = 0.5
let currentToss = 1
let currentThrow = 1

/**
 * onActivate is called each time a script is activated or updated. It is
 * primarily used to call `Room.listen` or `Script.listen`, to have the script
 * listening for events or messages.
 *
 * When a script is updated, previous listeners (e.g. `Room.listen` or
 * `Script.listen`) or scheduled posts (`Script.post` with delay), will be
 * removed, and `onActivate()` will be called again on the new script version.
 *
 * Not required. Can be remove if not used.
 */
export function onActivate(): void {
    Room.addCommand("highstriker", new Command("play highstriker"))
    Room.addCommand("milkbottle", new Command("play milkbottle"))
    Room.addCommand("ringtoss", new Command("play ringtoss"))
    Room.addCommand("pandar", new Command("play pandar"))
    Room.listenCharEvent()
}

/**
 * onRoomEvent is called when an event occurs in the room, such as a 'say',
 * 'arrive', or 'sleep'. It requires that `Room.listen()` has been called
 * earlier, usually in the `onActivate()` function.
 *
 * Not required. Can be remove if not used.
 *
 * @example
 * Check the event type and decode the event:
 * ```
 * export function onRoomEvent(addr: string, ev: string): void {
 *     const eventType = Event.getType(ev);
 *     if (eventType == 'say') {
 *         const say = JSON.parse<Event.Say>(ev);
 *         // Handle the say event
 *     }
 * }
 * ```
 *
 * @param addr - Address of this script instance receiving the event.
 * @param ev - Event encoded as a json string.
 */
export function onRoomEvent(
    addr: string,
    ev: string,
): void {
    // Handle the json encoded event
}

/**
 * onMessage is called when another script sends a message to this script, using
 * `Script.post()`. It requires that `Script.listen()` has been called earlier,
 * usually in the `onActivate()` function.
 *
 * Not required. Can be remove if not used.
 *
 * @param addr - Address of this script instance receiving the message.
 * @param topic - Topic of the message. Determined by the sender.
 * @param data - JSON encoded data of the message or null. Determined by the sender.
 * @param sender - Address of the sending script instance.
 */
export function onMessage(
    addr: string,
    topic: string,
    data: string | null,
    sender: string,
): void {
    // Handle the message and the JSON encoded data
}

/**
 * onCharEvent is called when a character enters a room, leaves a room, or
 * changes any of its properties while inside the room. It requires that
 * `Room.listenCharEvent()` has been called earlier, usually in the
 * `onActivate()` function.
 *
 * Not required. Can be remove if not used.
 *
 * @example
 * Output to log when a character arrives or leaves:
 * ```
 * export function onCharEvent(addr: string, charId: string, after: string|null, before: string|null): void {
 *     if (after == null && before != null) {
 *         // If after is null, the character left
 *         const char = JSON.parse<Room.Char>(before);
 *         console.log(`${char.name} left.`)
 *     }
 *     if (before == null && after != null) {
 *         // If before is null, the character arrived
 *         const char = JSON.parse<Room.Char>(after);
 *         console.log(`${char.name} arrived.`)
 *     }
 * }
 * ```
 *
 * @param addr - Address of this script instance receiving the event.
 * @param charId - ID of character.
 * @param after - Character state after the event encoded as a json string, or
 * null if the character left the room.
 * @param before - Character state before the event encoded as a json string, or
 * null if the character entered the room.
 */
export function onCharEvent(
    addr: string,
    charId: string,
    after: string | null,
    before: string | null,
): void {
    if ( after == null && before != null) {
        if (Room.charIterator().isValid())
        {
            currentThrow = 1
            currentToss = 1
            Room.removeCommand("throw")
            Room.removeCommand("milkbottle")
            Room.addCommand("milkbottle", new Command("play milkbottle"))
            Room.removeCommand("toss")
            Room.removeCommand("pickeasy")
            Room.removeCommand("pickmedium")
            Room.removeCommand("pickhard")
            Room.removeCommand("ringtoss")
            Room.addCommand("ringtoss", new Command("play ringtoss"))
            Room.removeCommand("swing")
            Room.removeCommand("highstriker")
            Room.addCommand("highstriker", new Command("play highstriker"))
        }
    }
}

/**
 * onExitUse is called when a character tries to use an exit. It requires that
 * `Room.listenExit()` has been called earlier, usually in the `onActivate()`
 * function. The script should call either `exitAction.cancel` or
 * `exitAction.useExit` to determine what should happen. If neither method is
 * called, the action will timeout after 1 second, automatically canceling the
 * exit use with a default message.
 *
 * Not required. Can be remove if not used.
 *
 * @example
 * Prevent anyone from using an exit:
 * ```
 * export function onExitUse(addr: string, exitAction: ExitAction): void {
 *     exitAction.cancel("The door seems to be locked.");
 * }
 * ```
 *
 * @param addr - Address of this script instance receiving the event.
 * @param exitAction - Exit action object.
 */
export function onExitUse(
    addr: string,
    exitAction: ExitAction,
): void {
    // Handle the intercepted exit action
}

function randomFrom<T>(arr: T[]): T {
    return arr[<i32>(Math.floor(Math.random() * arr.length))]
}

const smallPrizes: string[] = [
    "plastic whistle",
    "tiny rubber duck",
    "miniature alien figurine",
    "temporary tattoo sheet",
    "glow-in-the-dark bracelet",
    "puffy sticker set",
    "bouncy ball",
    "keychain flashlight",
    "bubble vial with wand",
    "toy spider ring"
]

const mediumPrizes: string[] = [
    "stuffed banana with sunglasses",
    "light-up yo-yo",
    "foam sword",
    "plush emoji pillow",
    "inflatable hammer",
    "mystery grab bag",
    "fidget spinner",
    "color-changing cup",
    "plastic pirate hook",
    "toy dinosaur"
]

const largePrizes: string[] = [
    "giant teddy bear",
    "oversized plush dragon",
    "3-foot inflatable unicorn",
    "giant foam finger",
    "talking robot toy",
    "carnival champion trophy",
    "large stuffed banana",
    "deluxe mystery box"
]
const malletVerbs: string[] = [
    "slams",
    "whacks",
    "swings",
    "hammers",
    "smashes",
    "drives"
]
const malletAdjectives: string[] = [
    "furiously",
    "mightily",
    "clumsily",
    "wildly",
    "timidly",
    "confidently"
]
const puckVerbs: string[] = [
    "rocket",
    "jolt",
    "clatter",
    "zip",
    "rattle",
    "soar"
]
const hsDeclarative: string[] = [
    "Test your strength on the towering Highstriker!",
    "Give the bell a ring and let the town sing!",
    "See if your swing can make the puck kiss the sky!",
    "Try your luck with the iron‑clad hammer!",
    "Show the crowd what real muscle looks like!",
    "Put your backbone into it and shake the rafters!"
]
const hsGoading: string[] = [
    "Think you’ve got what it takes, strong‑arm?",
    "Don’t let that kid in front outdo ya!",
    "Only the brave can make the bell holler.",
    "Prove you ain’t all bark and no bite!",
    "Come on, make that mallet cower!",
    "Is that bicep or just hot air?"
]
const hsAllure: string[] = [
    "Ring the bell and walk away with a prize bigger than your ego!",
    "Win a plush dragon for the one who’s cheerin’ ya on!",
    "Score glory, bragging rights, and a roar from the crowd!",
    "Hit the top and hear the town erupt!",
    "Show ’em all and take home the golden ticket of pride!",
    "Make it sing and get your name echoing down the town!"
]
const mbDeclarative: string[] = [
    "Knock down the bottles and claim your glory!",
    "Try your arm at the classic Milk Bottle Smash!",
    "Three balls, three chances, one big win!",
    "Topple the stack and make 'em crash!",
    "Bring the tower down like a storm!",
    "Hit it just right and send those bottles flyin’!"
]
const mbGoading: string[] = [
    "They look easy, but they ain't made of dreams!",
    "C’mon slugger, even the kid before you got two!",
    "Think you're tough? These bottles say otherwise!",
    "Don’t go soft now — they ain’t gonna fall for a breeze!",
    "Got an arm or just stories to tell?",
    "You're not scared of a little milk bottle, are ya?"
]
const mbAllure: string[] = [
    "Make 'em fall and win a prize that’ll turn heads!",
    "Topple 'em all and walk away with a jumbo plush!",
    "Big win gets big cheers and even bigger braggin’ rights!",
    "Bring the stack down and take home a midway legend!",
    "Land the knockdown and earn your place in the prize hall!",
    "Clear the bottles, claim the glory — and the loot!"
]
const rtDeclarative: string[] = [
    "Try your aim at the classic Ring Toss!",
    "Test your touch and thread the loop!",
    "One toss, one win — it’s that simple!",
    "Land a ring and claim your glory!",
    "Nothing but bottle necks waiting for your toss!",
    "Drop a ring and make the magic happen!"
]
const rtGoading: string[] = [
    "Steady hands or just shaky nerves, we’ll find out!",
    "Don’t let grandma show you up!",
    "Even a baby’s got better aim — prove me wrong!",
    "Come on, sharpshooter, show us what you’ve got!",
    "Think you’re lucky? Then prove it!",
    "Those bottles ain't gonna ring themselves!"
]
const rtAllure: string[] = [
    "Win a prize that'll make your sweetheart smile!",
    "Land the ring and take home a stuffed legend!",
    "Hit it just right and walk away with carnival gold!",
    "One toss could crown you king of the town!",
    "The perfect shot brings plushy riches beyond belief!",
    "A smooth toss, a lucky clang, and the prize is yours!"
]
const pandarFortunes: string[] = [
    "You will soon embark on a journey, though your feet may not move.",
    "Beware the smile of a stranger — it hides more than kindness.",
    "A great opportunity approaches, but only if you are bold enough to seize it.",
    "The winds of change are at your back. Don’t fight them — sail with them.",
    "Gold lies in your future, but it will not be found with your hands.",
    "One from your past will knock. Will you open the door?",
    "Trust your instincts — they know the truth even before your eyes do.",
    "A secret long kept will come to light. Prepare your heart.",
    "You will find what you seek, but not where you expect.",
    "A wise fool will show you the way. Listen with care.",
    "Your fortune is tied to another — look not inward, but outward.",
    "Tonight, the stars align in your favor. Make your move.",
    "An ending is near, but fear not — every ending hides a beginning.",
    "The number three will reveal itself in ways you do not yet understand.",
    "Laughter will break the silence that holds you back. Embrace it.",
    "Your hands will hold power soon. Use it with grace, not pride.",
    "You will soon have a choice between comfort and greatness.",
    "Your future is a locked door. The key lies in a question unasked.",
    "The moon sees your dreams. Speak them aloud and they will begin to move.",
    "Do not ignore the small signs — they whisper louder than shouts."
]

/**
 * onCommand is called when a character uses a custom command. It requires that
 * `Room.addCommand` has been called earlier to register the command, usually in
 * the `onActivate()` function. The script may send a response to the caller
 * using either `cmdAction.info` or `cmdAction.error`, but it is not
 * required. The response must be sent within 1 second from the call.
 *
 * Not required. Can be remove if not used.
 *
 * @example
 * Adds a "send ping" command that responds with an info message:
 * ```
 * export function onActivate(): void {
 *     Room.addCommand("ping", new Command("send ping", "Sends a ping to the script.");
 * }
 *
 * export function onCommand(addr: string, cmdAction: CmdAction): void {
 *     cmdAction.info("Pong!");
 * }
 * ```
 *
 * @param addr - Address of this script instance receiving the action.
 * @param cmdAction - Command action object.
 */
export function onCommand(
    addr: string,
    cmdAction: CmdAction,
): void {
    if (cmdAction.keyword == "highstriker") {
        Room.removeCommand("highstriker")
        Room.addCommand("swing", new Command("swing"))
        Room.describe(`Step right up!  Step right up! ${randomFrom(hsDeclarative)} ${randomFrom(hsGoading)} ${randomFrom(hsAllure)}`)
        Room.describe("Use `swing` to play.")
    }
    if (cmdAction.keyword == "swing") {
        Room.removeCommand("swing")
        Room.addCommand("highstriker", new Command("play highstriker"))
        let score = <i32>Math.floor(Math.random() * 10)
        let message = `${cmdAction.char.name} ${randomFrom(malletVerbs)} the mallet ${randomFrom(malletAdjectives)}, causing the puck to ${randomFrom(puckVerbs)} up to the`

        switch (score) {
            default:
                Room.describe(`${message} ten point marker.`)
                break;
            case 1:
                Room.describe(`${message} twenty point marker.`)
                break;
            case 2:
                Room.describe(`${message} thirty point marker.`)
                break;
            case 3:
                Room.describe(`${message} forty point marker.`)
                break;
            case 4:
                Room.describe(`${message} fifty point marker.`)
                break;
            case 5:
                Room.describe(`${message} sixty point marker.`)
                break;
            case 6:
                Room.describe(`${message} seventy point marker.`)
                break;
            case 7:
                Room.describe(`${message} eighty point marker.`)
                break;
            case 8:
                Room.describe(`${message} ninety point marker.`)
                break;
            case 9:
                Room.describe(`${message} hundred point marker and ringing the bell!`)
                Room.describe(`${cmdAction.char.name} wins a ${randomFrom(largePrizes)}!`)
                break;
        }
    }
    if (cmdAction.keyword == "milkbottle") {
        Room.removeCommand("milkbottle")
        Room.addCommand("throw", new Command("throw"))
        Room.describe(`Step right up!  Step right up! ${randomFrom(mbDeclarative)} ${randomFrom(mbGoading)} ${randomFrom(mbAllure)}`)
        Room.describe("Use `throw` to play.")
    }
    if (cmdAction.keyword == "throw") {
        if (Math.random() < 0.3) {
            Room.describe(`${cmdAction.char.name} lands their ball square in the milk bottles and knocks them all over.`)
            Room.describe(`${cmdAction.char.name} wins a ${randomFrom(smallPrizes)}!`)
            Room.removeCommand("throw")
            Room.addCommand("milkbottle", new Command("play milkbottle"))
        } else {
            Room.describe(`${cmdAction.char.name} misses the milk bottles.`)
            switch (currentThrow) {
                case 1:
                    Room.describe(`${randomFrom(mbGoading)} You got two more tries!`)
                    currentThrow++
                    break;
                case 2:
                    Room.describe(`${randomFrom(mbGoading)} You got one more try!`)
                    currentThrow++
                    break;
                case 3:
                    Room.describe("Awwr, better luck next time!")
                    Room.removeCommand("throw")
                    Room.addCommand("milkbottle", new Command("play milkbottle"))
                    currentThrow = 1
                    break;
            }
        }
    }

    if (cmdAction.keyword == "ringtoss") {
        Room.removeCommand("ringtoss")
        Room.describe(`Step right up!  Step right up! ${randomFrom(rtDeclarative)} ${randomFrom(rtGoading)} ${randomFrom(rtAllure)}`)
        Room.describe("You can choose to pick an easy, medium, or hard target.  `pick easy`, `pick medium`, or `pick hard`")
        Room.addCommand("pickeasy", new Command("pick easy"))
        Room.addCommand("pickmedium", new Command("pick medium"))
        Room.addCommand("pickhard", new Command("pick hard"))
    }

    if (cmdAction.keyword == "pickeasy") {
        Room.removeCommand("pickeasy")
        Room.removeCommand("pickmedium")
        Room.removeCommand("pickhard")
        difficulty = 0.5
        Room.addCommand("toss", new Command("toss"))
        Room.describe("Use `toss` to play.")
    }
    if (cmdAction.keyword == "pickmedium") {
        Room.removeCommand("pickeasy")
        Room.removeCommand("pickmedium")
        Room.removeCommand("pickhard")
        difficulty = 0.75
        Room.addCommand("toss", new Command("toss"))
        Room.describe("Use `toss` to play.")
    }
    if (cmdAction.keyword == "pickhard") {
        Room.removeCommand("pickeasy")
        Room.removeCommand("pickmedium")
        Room.removeCommand("pickhard")
        difficulty = 0.9
        Room.addCommand("toss", new Command("toss"))
        Room.describe("Use `toss` to play.")
    }
    if (cmdAction.keyword == "toss") {
        if (Math.random() > difficulty) {
            Room.describe(`${cmdAction.char.name} tosses their ring and it lands squarely on the bottle.`)
            let prize = ""
            switch (difficulty) {
                case .5:
                    prize = randomFrom(smallPrizes)
                    break;
                case .75:
                    prize = randomFrom(mediumPrizes)
                    break;
                case .9:
                    prize = randomFrom(largePrizes)
                    break;
            }
            Room.describe(`${cmdAction.char.name} wins a ${prize}!`)
            Room.removeCommand("toss")
            Room.addCommand("ringtoss", new Command("play ringtoss"))
        } else {
            Room.describe(`${cmdAction.char.name} tosses their ring and it misses the bottle.`)
            switch (currentToss) {
                case 1:
                	Room.describe(`${randomFrom(rtGoading)} You got two more tries!`)
                    currentToss++
                    break;
                case 2:
                    Room.describe(`${randomFrom(rtGoading)} You got one more try!`)
                    currentToss++
                    break;
                case 3:
                    Room.describe("Awwr, better luck next time!")
                    Room.removeCommand("toss")
                    Room.addCommand("ringtoss", new Command("play ringtoss"))
                    currentToss = 1
                    break;
            }
        }
    }
    if (cmdAction.keyword == "pandar") {
        Room.describe("The mysterious Pandar animates to life to consult its crystal ball.  It soon prints out a fortune in the receptacle.")
        Room.describe(`_${randomFrom(pandarFortunes)}_`)
    }
}
