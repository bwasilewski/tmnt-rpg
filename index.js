/**
 * TMNT RPG
 * A Javascript Text-Based roleplaying game set in the TMNT universe!
 * 
 * 
 * The content, rules and inspiration for this project come from the following source:
 * https://rpg.rem.uz/_Collections/Cartoon%20Games/TMNT/TMNT%20-%20Corebook.pdf
 */

/**
 * Character Attribute Key
 * 
 * 
 * Intelligence Quotient (IQ):
 *      Indicated the intelligence of the
 *      character. The exact I.Q. is equal to the I.Q. attribute multiplied times
 *      ten. Characters with an I.Q. of 16 or better will receive a one time
 *      bonus added to all the character's skill percentiles.
 * 
 * Mental Endurance (ME):
 *      Measures the amount of mental and
 *      emotional stress the character can withstand. Animal characters must
 *      have a minimum M.E. of 12 in order to become psionic. Any character
 *      with an M.E. of 16 or higher will have a bonus to save against psionics.
 * 
 * Mental Affinity (MA):
 *      Shows the character's personal charm
 *      and charisma. Natural leaders with an M.A. of 16 or higher have a
 *      bonus to invoke trust or intimidation in others.
 * 
 * Physical Strength (PS):
 *      This is the raw physical power of a
 *      character. The P.S. times 10 indicates how heavy an object (in pounds)
 *      the character can carry. A character can lift 30 times the P.S. Exceptionally
 *      strong characters having P.S. of 15-19 can carry 20 times their
 *      P.S. and lift 40 times their P.S. Someone with a P.S. of 20-23 can
 *      carry 30 times their P.S. and lift 60 times their P.S. Anyone with a
 *      P.S. of 24 or higher can carry 50 times their P.S. and lift 100 times
 *      their P.S. Any character with a P.S. of 16 or better receives a bonus
 *      to damage in hand to hand combat
 *      
 * Physical Prowess (PP):
 *      Shows the degree of dexterity and agility
 *      of the character. A P.P. of 16 or higher is rewarded with bonuses to
 *      dodge, parry and strike.
 * 
 * Physical Endurance (PE):
 *      Demonstrates the character's stamina
 *      and durability. The amount of physical punishment and resistance to
 *      fatigue and disease are determined by P.E. A character can carry the
 *      maximum weight load (see P.S.) for the P.E. times 4 minutes. Carrying
 *      the maximum weight while running or fighting can only be done for
 *      the P.E. times 2 minutes. If a character lifts the maximum weight (see
 *      P.S.), then it can only be held for as many melee rounds (15 seconds
 *      each) as the character has points P.E. A character can run at maximum
 *      speed for one minute for each point of P.E. Character's with a P.E. of
 *      16 or better receive bonuses to save vs. coma, death, and toxins.
 * 
 * Physical Beauty (PB):
 *      Is an indication of the physical attractiveness
 *      of the character. A P.B. of 16 or better will be rewarded with
 *      bonus to charm and impress.
 * 
 * Speed (Spd):
 *      Specifically, this is the character's maximum running
 *      speed. The Spd. times 20 is the number of yards the character
 *      can run in one minute. If the Spd. is 16 or higher, the character has a
 *      bonus to all dodge rolls.
 * 
 */


const dice = require('rpg-dice')
const _ = require('underscore')
const BONUS_ATTRIBUTE_CHART = [
    { value: 16, IQ: .03, ME: 1, MA: .45, PS: 1, PP: 1, PE_a: .05, PE_b: 1, PB: .40, Spd: 1 },
    { value: 17, IQ: .04, ME: 1, MA: .50, PS: 2, PP: 1, PE_a: .06, PE_b: 1, PB: .45, Spd: 1 },
    { value: 18, IQ: .05, ME: 2, MA: .50, PS: 3, PP: 2, PE_a: .07, PE_b: 2, PB: .50, Spd: 1 },
    { value: 19, IQ: .06, ME: 2, MA: .60, PS: 4, PP: 2, PE_a: .08, PE_b: 2, PB: .55, Spd: 2 },
    { value: 20, IQ: .07, ME: 3, MA: .65, PS: 5, PP: 3, PE_a: .09, PE_b: 3, PB: .60, Spd: 2 },
    { value: 21, IQ: .08, ME: 3, MA: .70, PS: 6, PP: 3, PE_a: .10, PE_b: 3, PB: .65, Spd: 2 },
    { value: 22, IQ: .09, ME: 4, MA: .75, PS: 7, PP: 4, PE_a: .11, PE_b: 4, PB: .70, Spd: 3 },
    { value: 23, IQ: .10, ME: 4, MA: .80, PS: 8, PP: 4, PE_a: .12, PE_b: 4, PB: .75, Spd: 3 },
    { value: 24, IQ: .11, ME: 4, MA: .84, PS: 9, PP: 5, PE_a: .13, PE_b: 5, PB: .78, Spd: 3 },
    { value: 25, IQ: .12, ME: 5, MA: .88, PS: 10, PP: 5, PE_a: .14, PE_b: 5, PB: .82, Spd: 4 },
    { value: 26, IQ: .13, ME: 5, MA: .90, PS: 11, PP: 6, PE_a: .15, PE_b: 6, PB: .86, Spd: 4 },
    { value: 27, IQ: .14, ME: 6, MA: .92, PS: 12, PP: 6, PE_a: .16, PE_b: 6, PB: .90, Spd: 4 },
    { value: 28, IQ: .15, ME: 6, MA: .94, PS: 13, PP: 7, PE_a: .17, PE_b: 7, PB: .92, Spd: 4 },
    { value: 29, IQ: .16, ME: 7, MA: .96, PS: 14, PP: 7, PE_a: .18, PE_b: 7, PB: .94, Spd: 4 },
    { value: 30, IQ: .17, ME: 7, MA: .98, PS: 15, PP: 8, PE_a: .19, PE_b: 8, PB: .96, Spd: 4 },
    { value: 31, IQ: .18, ME: 8, MA: .98, PS: 16, PP: 8, PE_a: .20, PE_b: 8, PB: .97, Spd: 5 },
    { value: 32, IQ: .19, ME: 8, MA: .98, PS: 17, PP: 9, PE_a: .21, PE_b: 9, PB: .98, Spd: 5 },
    { value: 33, IQ: .20, ME: 9, MA: .98, PS: 18, PP: 9, PE_a: .22, PE_b: 9, PB: .99, Spd: 5 },
    { value: 34, IQ: .21, ME: 9, MA: .98, PS: 19, PP: 10, PE_a: .23, PE_b: 10, PB: .99, Spd: 5 },
    { value: 35, IQ: .22, ME: 10, MA: .98, PS: 20, PP: 10, PE_a: .24, PE_b: 10, PB: .99, Spd: 5 },
    { value: 36, IQ: .23, ME: 10, MA: .99, PS: 21, PP: 11, PE_a: .25, PE_b: 11, PB: .99, Spd: 6 },
    { value: 37, IQ: .24, ME: 11, MA: .99, PS: 22, PP: 11, PE_a: .26, PE_b: 11, PB: .99, Spd: 6 },
    { value: 38, IQ: .25, ME: 11, MA: .99, PS: 23, PP: 12, PE_a: .27, PE_b: 12, PB: .99, Spd: 6 },
    { value: 39, IQ: .26, ME: 12, MA: .99, PS: 24, PP: 12, PE_a: .28, PE_b: 12, PB: .99, Spd: 6 },
    { value: 40, IQ: .27, ME: 12, MA: .99, PS: 25, PP: 13, PE_a: .29, PE_b: 13, PB: .99, Spd: 6 },
    { value: 41, IQ: .28, ME: 13, MA: .99, PS: 26, PP: 13, PE_a: .30, PE_b: 13, PB: .99, Spd: 6 },
    { value: 42, IQ: .29, ME: 13, MA: .99, PS: 27, PP: 14, PE_a: .31, PE_b: 14, PB: .99, Spd: 7 }
]
const ANIMAL_CHART = [
    {
        category: 'Urban Animal',
        minimum: 1,
        maximum: 35,
        types: [
            {name: 'Dog', minimum: 1, maximum: 25},
            {name: 'Cat', minimum: 26, maximum: 45},
            {name: 'Mouse', minimum: 46, maximum: 50},
            {name: 'Rat', minimum: 51, maximum: 55},
            {name: 'Pet Rodent', minimum: 56, maximum: 60},
            {name: 'Squirrel', minimum: 61, maximum: 65},
            {name: 'Sparrow', minimum: 66, maximum: 75},
            {name: 'Pigeon', minimum: 76, maximum: 83},
            {name: 'Pet Bird', minimum: 84, maximum: 85},
            {name: 'Bat', minimum: 86, maximum: 88},
            {name: 'Turtle', minimum: 89, maximum: 92},
            {name: 'Frog', minimum: 93, maximum: 96},
            {name: 'Monkey', minimum: 97, maximum: 100}
        ]
    },
    {
        category: 'Rural Animal',
        minimum: 36,
        maximum: 50,
        types: [
            {name: 'Dog', minimum: 1, maximum: 10},
            {name: 'Cat', minimum: 11, maximum: 15},
            {name: 'Cow', minimum: 16, maximum: 25},
            {name: 'Pig', minimum: 26, maximum: 35},
            {name: 'Chicken', minimum: 36, maximum: 45},
            {name: 'Duck', minimum: 46, maximum: 50},
            {name: 'Horse', minimum: 51, maximum: 60},
            {name: 'Rabbit', minimum: 61, maximum: 70},
            {name: 'Mouse', minimum: 71, maximum: 80},
            {name: 'Sheep', minimum: 81, maximum: 85},
            {name: 'Goat', minimum: 86, maximum: 90},
            {name: 'Turkey', minimum: 91, maximum: 94},
            {name: 'Bat', minimum: 95, maximum: 100}
        ]
    },
    {
        category: 'Wild Animal',
        minimum: 51,
        maximum: 75,
        types: [
            {name: 'Wolf', minimum: 1, maximum: 5},
            {name: 'Coyote', minimum: 6, maximum: 10},
            {name: 'Fox', minimum: 11, maximum: 15},
            {name: 'Badger', minimum: 16, maximum: 20},
            {name: 'Black Bear', minimum: 21, maximum: 25},
            {name: 'Grizzly Bear', minimum: 26, maximum: 27},
            {name: 'Mountain Lion', minimum: 28, maximum: 30},
            {name: 'Bobcat', minimum: 31, maximum: 33},
            {name: 'Lynx', minimum: 34, maximum: 35},
            {name: 'Wolverine', minimum: 36, maximum: 37},
            {name: 'Weasel', minimum: 38, maximum: 45},
            {name: 'Alligator', minimum: 46, maximum: 49},
            {name: 'Otter', minimum: 50, maximum: 52},
            {name: 'Beaver', minimum: 53, maximum: 55},
            {name: 'Muskrat', minimum: 56, maximum: 60},
            {name: 'Raccoon', minimum: 61, maximum: 65},
            {name: 'Opossum', minimum: 66, maximum: 70},
            {name: 'Skunk', minimum: 71, maximum: 75},
            {name: 'Porcupine', minimum: 76, maximum: 80},
            {name: 'Mole', minimum: 81, maximum: 83},
            {name: 'Marten', minimum: 84, maximum: 85},
            {name: 'Armadillo', minimum: 86, maximum: 88},
            {name: 'Deer', minimum: 89, maximum: 95},
            {name: 'Elk', minimum: 96, maximum: 97},
            {name: 'Moose', minimum: 98, maximum: 99},
            {name: 'Boar', minimum: 100, maximum: 100}
        ]
    },
    {
        category: 'Wild Bird',
        minimum: 76,
        maximum: 85,
        types: [
            {name: 'Sparrow', minimum: 1, maximum: 5},
            {name: 'Robin', minimum: 6, maximum: 10},
            {name: 'Blue Jay', minimum: 11, maximum: 15},
            {name: 'Cardinal', minimum: 16, maximum: 20},
            {name: 'Wild Turkey', minimum: 21, maximum: 30},
            {name: 'Pheasant', minimum: 31, maximum: 35},
            {name: 'Grouse', minimum: 36, maximum: 40},
            {name: 'Quail', minimum: 41, maximum: 50},
            {name: 'Crow', minimum: 51, maximum: 60},
            {name: 'Pigeon', minimum: 61, maximum: 65},
            {name: 'Duck', minimum: 66, maximum: 70},
            {name: 'Hawk', minimum: 71, maximum: 80},
            {name: 'Falcon', minimum: 81, maximum: 85},
            {name: 'Eagle', minimum: 86, maximum: 90},
            {name: 'Owl', minimum: 91, maximum: 95},
            {name: 'Escaped Pet Bird', minimum: 96, maximum: 100}
        ]
    },
    {
        category: 'Zoo Animal',
        minimum: 86,
        maximum: 100,
        types: [
            {name: 'Lion', minimum: 1, maximum: 10},
            {name: 'Tiger', minimum: 11, maximum: 15},
            {name: 'Leopard', minimum: 16, maximum: 20},
            {name: 'Cheetah', minimum: 21, maximum: 25},
            {name: 'Polar Bear', minimum: 26, maximum: 30},
            {name: 'Crocodile', minimum: 31, maximum: 35},
            {name: 'Aardvark', minimum: 36, maximum: 40},
            {name: 'Rhinoceros', minimum: 41, maximum: 45},
            {name: 'Hippopotamus', minimum: 46, maximum: 50},
            {name: 'Elephant', minimum: 51, maximum: 60},
            {name: 'Chimpanzee', minimum: 61, maximum: 65},
            {name: 'Orangutan', minimum: 66, maximum: 70},
            {name: 'Gorilla', minimum: 71, maximum: 75},
            {name: 'Monkey', minimum: 76, maximum: 85},
            {name: 'Baboon', minimum: 86, maximum: 90},
            {name: 'Camel', minimum: 91, maximum: 95},
            {name: 'Buffalo', minimum: 96, maximum: 100},
        ]
        
    }
]

class Character {
    /**
     * Create a Character
     * @param {number} IQ - Intelligence Quotient
     * @param {number} ME - Mental Endurance
     * @param {number} MA - Mental Affinity
     * @param {number} PS - Physical Strength
     * @param {number} PP - Physical Prowess
     * @param {number} PE - Physical Endurance
     * @param {number} PB - Physical Beauty
     * @param {number} Spd - Speed
     */
    constructor(IQ, ME, MA, PS, PP, PE, PB, Spd) {
        this.IQ = IQ
        this.ME = ME
        this.MA = MA
        this.PS = PS
        this.PP = PP
        this.PE = PE
        this.PB = PB
        this.HP = this.calcHP()
        this.SDC = this.calcSDC()
        this.category = this.calcAnimalCategory()
        this.type = this.calcAnimalType()
    }

    /**
     * Calculate Hit Points
     * Hit Points are determined by rolling a six-sided die and adding the result to the PE. 
     * Every time the character gains an experience level another 1D6 is added to the total 
     * Hit Points.
     * @return {number} Hit Points
     */
    calcHP () {
        return this.PE + dice.roll(1, 6).result
    }

    /**
     * Calculate Structural Damage Capacity
     * SDC points are similar to hit points but represent physical toughness or endurance
     * rather than life. Damage absorbed by one's SDC might best be thought of as superficial
     * damage, aches and pains. While damage to one's hit points are considered severe and
     * life threatening.
     * @return {number} Structural Damage Capacity
     */
    calcSDC () {
        return this.PE + dice.roll(1, 6).result
    }

    /**
     * Calculate Animal Type
     * What kind of animal was the character originally? Roll percentile dice to find the 
     * specific table, then roll percentile for specific animal type. Note: Check with the 
     * game master before rolling. Some GM's may want to restrict the kind of animals in 
     * the campaign. For example, a game master could decide that all characters will be 
     * Rural Animals.
     * @return {string} Animal Type
     */
    calcAnimalCategory () {
        let roll = dice.roll(1, 100).result
        let category;

        if (roll > 85) {
            category = 'Zoo Animals'
        } else if (roll > 75) {
            category = 'Wild Birds'
        } else if (roll > 50) {
            category = 'Wild Animals'
        } else if (roll > 35) {
            category = 'Rural Animals'
        } else {
            category = 'Urban Animals'
        }

        return category;
    }

    calcAnimalType () {
        let match = _.where(ANIMAL_CHART, {category: this.category});

        console.log('Match: ', match);
    }
}





const rollAttributes = function () {
    let roll = {
        IQ: dice.roll(3, 6).result,
        ME: dice.roll(3, 6).result,
        MA: dice.roll(3, 6).result,
        PS: dice.roll(3, 6).result,
        PP: dice.roll(3, 6).result,
        PE: dice.roll(3, 6).result,
        PB: dice.roll(3, 6).result,
        Spd: dice.roll(3, 6).result,
    }

    for (let prop in roll) {
        if (roll[prop] >= 16) {
            roll[prop] += dice.roll(1, 6).result
            console.log(prop + ' is exceptional: ', roll[prop]);
        } else {
            console.log(prop + ': ', roll[prop])
        }
    }
}

// let roll = rollAttributes();
let ben = new Character(10, 10, 10, 10, 10, 10, 10, 10);
