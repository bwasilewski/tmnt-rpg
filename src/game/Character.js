/**
 * TMNT RPG
 * A Javascript Text-Based roleplaying game set in the TMNT universe!
 *
 * built by Ben Wasilewski <benwasilewski@gmail.com> (http://benwas.com)
 *
 * The content, rules and inspiration for this project come from the following source:
 * https://rpg.rem.uz/_Collections/Cartoon%20Games/TMNT/TMNT%20-%20Corebook.pdf
 */


const dice = require('rpg-dice')
const _ = require('underscore')

export const BONUS_ATTRIBUTE_MAP = [
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
export const ANIMAL_MAP = [
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
      {
        name: 'Alligator',
        minimum: 46,
        maximum: 49,
        description: 'Alligators are the largest reptiles in North America. They are dangerous swamp-dwelling carnivores. Their horny scalesprovide extra protection. Long jaws filled with conical teeth are designed for grasping and tearing apart prey.',
        size_level: 9,
        length: 'Up to 20 feet',
        weight: 'up to 175 lbs',
        build: 'long',
        bio_e: 40,
        attribute_bonuses: [
          { type: 'PS', bonus: '+3' },
          { type: 'PE', bonus: '+1' },
          { type: 'Spd', bonus: '+1' }
        ],
        human_features: [
          {
            type: 'Hands',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Biped',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Speech',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Looks',
            value: [
              'None,  Large  snout,  no  external  ears,  large  scales  and  anelongated  body.',
              '5  BIO-E  for  Partial,  definite  snout,  no  external  ears,  noticeablescales,  and  a  long  body.',
              '10 BIO-E for Full, lumpy features, hairless, small ears and pointed teeth.'
            ]
          },
          {
            type: 'Natural Weapons',
            value: [
              '5 BIO-E for Teeth that do 1DS damage.'
            ]
          },
          {
            type: 'Powers',
            value: [
              '15  BIO-E  for  light  Natural  Armour;  A.R.:  6  and  S.D.C.:  +20',
              '30 BIO-E for Medium Natural Body Armour; A.R.: 8 and S.D.C.:  +40',
              '45 BIO-E for Heavy Natural Body Armour; A.R.:   l0   and S.D.C.:  +60',
              '5  BIO-E  Hold  Breath',
              '10  BIO-E  for  Swim  equal  to  competitive  swim  skill;  80%',
              '20  BIO-E  for  Quick  Run,  it  can  make  a  lightning  dash/run  at  35mphfor  a  maximum  distance  of  200  feet.   +2  to  dodge  while  running.Can  only  Quick  Run  once  every  3rd  melee.'
            ]
          }
        ]
      },
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
      {
        name: 'Crocodile',
        minimum: 31,
        maximum: 35,
        description: 'Crocodiles are the largest reptiles in North America. They are dangerous swamp-dwelling carnivores. Their horny scalesprovide extra protection. Long jaws filled with conical teeth are designed for grasping and tearing apart prey.',
        size_level: 9,
        length: 'Up to 20 feet',
        weight: 'up to 175 lbs',
        build: 'long',
        bio_e: 40,
        attribute_bonuses: [
          { type: 'PS', bonus: '+3' },
          { type: 'PE', bonus: '+1' },
          { type: 'Spd', bonus: '+1' }
        ],
        human_features: [
          {
            type: 'Hands',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Biped',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Speech',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Looks',
            value: [
              'None,  Large  snout,  no  external  ears,  large  scales  and  anelongated  body.',
              '5  BIO-E  for  Partial,  definite  snout,  no  external  ears,  noticeablescales,  and  a  long  body.',
              '10 BIO-E for Full, lumpy features, hairless, small ears and pointed teeth.'
            ]
          },
          {
            type: 'Natural Weapons',
            value: [
              '5 BIO-E for Teeth that do 1DS damage.'
            ]
          },
          {
            type: 'Powers',
            value: [
              '15  BIO-E  for  light  Natural  Armour;  A.R.:  6  and  S.D.C.:  +20',
              '30 BIO-E for Medium Natural Body Armour; A.R.: 8 and S.D.C.:  +40',
              '45 BIO-E for Heavy Natural Body Armour; A.R.:   l0   and S.D.C.:  +60',
              '5  BIO-E  Hold  Breath',
              '10  BIO-E  for  Swim  equal  to  competitive  swim  skill;  80%',
              '20  BIO-E  for  Quick  Run,  it  can  make  a  lightning  dash/run  at  35mphfor  a  maximum  distance  of  200  feet.   +2  to  dodge  while  running.Can  only  Quick  Run  once  every  3rd  melee.'
            ]
          }
        ]
      },
      {
        name: 'Aardvark',
        description: 'Aardvarks are a type of anteater totally adapted to feeding on ants and termites. They are equipped with claws for digging into ant and termite lairs. Aardvarks eat insects with a long sticky tongue. They are found only in southern Africa.',
        minimum: 36,
        maximum: 40,
        size_level: 5,
        length: '4 Feet',
        weight: '40 lbs',
        build: 'Medium',
        bio_e: 60,
        attribute_bonuses: [
          { type: 'PS', bonus: '+2' },
          { type: 'PP', bonus: '+1' },
          { type: 'PE', bonus: '+2' }
        ],
        human_features: [
          {
            type: 'Hands',
            value: [
              '5 BIO-E for Partial, three claw-like fingers and a thumb.',
              '10 BIO-E for Full, three fingers and a thumb.'
            ]
          },
          {
            type: 'Biped',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Speech',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Looks',
            value: [
              'None, mule-like ears stick straight out from the head, theround snout is very long, thick skin with sparse, course hair, and along naked tail.',
              '5 BIO-E for Partial, Ears are large and stick above the head, thereis a noticeable snout, hair is patchy and course, and there is still a short naked tail.',
              '10 BIO-E for Full, Ears are simply larger than normal and stickout somewhat, jaw and lips protrude, small teeth, hairless and tail-less.'
            ]
          },
          {
            type: 'Natural Weapons',
            value: [
              '5 BIO-E for Claws that do 1D6 damage.'
            ]
          },
          {
            type: 'Powers',
            value: [
              '5 BIO-E for Digging',
              '10 BIO-E for Tunneling'
            ]
          }
        ]
      },
      {name: 'Rhinoceros', minimum: 41, maximum: 45},
      {name: 'Hippopotamus', minimum: 46, maximum: 50},
      {name: 'Elephant', minimum: 51, maximum: 60},
      {
        name: 'Chimpanzee',
        minimum: 61,
        maximum: 65
      },
      {
        name: 'Orangutan',
        minimum: 66,
        maximum: 70
      },
      {
        name: 'Gorilla',
        minimum: 71,
        maximum: 75
      },
      {
        name: 'Monkey',
        minimum: 76,
        maximum: 85
      },
      {
        name: 'Baboon',
        minimum: 86,
        maximum: 90,
        description: 'These animals are powerful ground dwelling tribal monkeys.  Mandrills  and  Geladas  should  have  the  same  characteristics.',
        size_level: 6,
        length: '3 feet',
        weight: '40-65 lbs',
        build: 'medium',
        bio_e: 35,
        attribute_bonuses: [
          { type: 'IQ', bonus: '+4' },
          { type: 'ME', bonus: '+2' },
          { type: 'MA', bonus: '+3' },
          { type: 'PS', bonus: '+3' },
          { type: 'PP', bonus: '+2' },
        ],
        human_features: [
          {
            type: 'Hands',
            value: [
              'Partial Automatic',
              '5 BIO-E for Full'
            ]
          },
          {
            type: 'Biped',
            value: [
              'Partial Automatic',
              '5 BIO-E for Full'
            ]
          },
          {
            type: 'Speech',
            value: [
              '5 BIO-E for Partial',
              '10 BIO-E for Full'
            ]
          },
          {
            type: 'Looks',
            value: [
              'None,  large  nose,  doglike  face,  shaggy  tail,  and  heavy  fur.',
              '5  BIO-E  for  Partial,  flattened  dog-like  face,  large  bony  protru-sion  over  the  eyes,  heavy  body  hair  and  small  hairy  tail.',
              '10  BIO-E  for  Full,  long  face,  heavy  head  and  body  hair  andpowerful  build.'
            ]
          },
          {
            type: 'Natural Weapons',
            value: ['5 BIO-E for Teeth that do 1D8 damage']
          },
          {
            type: 'powers',
            value: [
              '5 BIO-E for Advance Vision',
              '15 BIO-E for Prehensile Feet'
            ]
          }
        ]
      },
      {name: 'Camel', minimum: 91, maximum: 95},
      {name: 'Buffalo', minimum: 96, maximum: 100},
    ]
  }
]
export const MUTATION_MAP = [
  {
    type: 'Random Mutation',
    minimum: 1,
    maximum: 14,
    animal_education: true,
    description: 'This means that the animal just happened to come out like that. For example, in T.M.N.T.,Splinter was an unusually intelligent and skilled rat long before the accident that created the T.M.N.T. Roll on Wild Animal Education Table.'
  },
  {
    type: 'Accidental Encounter',
    minimum: 15,
    maximum: 60,
    animal_education: true,
    description: 'Some "strange stuff", radiation, energy, chemicals, biologicals, or other strangeness, causes the animals to mutate. Roll on Wild Animal Education Table.'
  },
  {
  type: 'Deliberate Experimentation',
  minimum: 61,
  maximum: 100,
  description: 'Some kind of laboratory experiment is performed on the animal that causes the changes. The animal\'s structure or genetics were purposely altered for some purpose. Roll percentile again on the following table to find out the character\'s current relationship with the creator organization. This also determines the character\'s educational level.',
  subtypes:
    [
      {
        type: 'Deliberate Experimentation',
        minimum: 1,
        maximum: 10,
        animal_education: false,
        description: 'Adopted and raised as one of a researcher\'s family. Still living in the home, mutually loves and is loved by family members. This character has been treated as a human and, while some discrimination may have been experienced, the character will feel that humans are basically good. Educated as a normal human student equal to one year of college. Select two skill programs and 10 Secondary skills. Skill bonus + 10% on scholastic skills only. Character can buy any standard weapons, armour or equipment with 3D6 time $1,000 in savings.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 11,
        maximum: 20,
        animal_education: false,
        description: 'Raised in the home of a researcher as a pet. Still living in the home and fairly loyal to family members. The character will resent humans somewhat, but will still attempt to find acceptance among mankind. Trained instead of educated. (No skill bonuses) Automatically knows Mathematics: Basic, can read and write and speak native language (the same as the researcher\'s family). Also, select 14 Secondary skills. Can Spend 1D6 times $1,000 on equipment.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 21,
        maximum: 30,
        animal_education: true,
        description: 'Raised in the home of a researcher as a pet. Escaped and hostile, but not hunted with deadly force. The character will be resentful of humans. Roll education as wild animal character.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 31,
        maximum: 40,
        animal_education: false,
        description: 'Brought up as an experiment. Trained and educated with cruel punishments. The character will distrust humans. Education consists of 6 Physical skills and 12 Secondary skills. Escaped, now hunted by the organization. Has 2D6 time $500 to spend on equipment purchased before the escape.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 41,
        maximum: 50,
        animal_education: true,
        description: 'Raised as a caged, experimental animal. Character escaped and wants to destroy the organization and has a strong distrust (and possibly hatred) of all humans. Roll education as wild animal character.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 51,
        maximum: 60,
        animal_education: false,
        description: 'Educated and trained as if the character were a normal human. Character has good relationships and balanced outlook on humans. Education is equal to one year of college. Select two skill programs and 8 Secondary skills. Skill bonus + 10% on scholastic skills only. Separate from the organization, but with a good relationship. Can buy weapons, armour and equipment with 2D6 times $2,000 in savings'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 61,
        maximum: 70,
        animal_education: false,
        description: 'Rescued from the organization and adopted by a friendly researcher at a young age. Raised while continuously being hunted by the organization. Character distrusts humans but knows that there are some good people who deserve help and friendship. Education: has learned 4 scholastic skills which can be selected from communications, computer, physical, pilot basic, science or technical. Also knows 3 military/espionage skills and 10 Secondary skills. Skill bonus is + 8% on scholastic skills only. Savings are 2D6 times $200.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 71,
        maximum: 80,
        animal_education: false,
        description: 'Highly trained and educated as a specialist using the character\'s natural abilities. The character feels equal or is equal to Bachelor\'s Degree in college. Select 3 skill programs and 10 Secondary skills. Skill bonus is + 25% on all scholastic skills only. Character is a valuable employee of the organization and is paid at least triple the going rate (minimum $75,000 per year). Character has saved 1D6 times $10,000.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 81,
        maximum: 90,
        animal_education: false,
        description: 'Highly trained as a specialist using the character\'s natural abilities. Education is equal to three years of college. Select 3 skill programs and 8 Secondary skills. Skill bonus is + 15% on all scholastic skill only. The character was treated as a slave and eventually escaped. Character has stolen $30,000 to $180,000 (3D6 times $10,000) worth of cash and equipment before leaving. Character distrusts most humans. Hunted by law enforcement agencies and organization.'
      },
      {
        type: 'Deliberate Experimentation',
        minimum: 91,
        maximum: 100,
        animal_education: false,
        description: 'These characters have been deliberately raised as assassins or warriors. Knows 8 Secondary skills and choice of Expert, Martial Arts, or Assassin Hand to Hand combat. +15% bonus in all Military skills. Character knows and respects some humans but distrusts all large organizations. The character escaped the organization and is now considered very dangerous and is hunted by law enforcement agencies and the organization. Before escaping, the character took $20,000 to $120,000 (1D6 times $20,000) worth of equipment and weapons.'
      }
    ],
  }
]
export const ORGANIZATION_MAP = [
  {
    name: 'Biological Research Facility',
    minimum: 1,
    maximum: 25
  },
  {
    name: 'Private Industry',
    minimum: 26,
    maximum: 45
  },
  {
    name: 'Secret Medical Experiment Organization',
    minimum: 46,
    maximum: 50
  },
  {
    name: 'Secret Criminal Organization',
    minimum: 51,
    maximum: 55
  },
  {
    name: 'Secret Crime Fighting Organization',
    minimum: 56,
    maximum: 60
  },
  {
    name: 'Secret Military Organization',
    minimum: 61,
    maximum: 65
  },
  {
    name: 'Secret Espionage Organization',
    minimum: 66,
    maximum: 70
  },
  {
    name: 'Secret Medical Research Organization',
    minimum: 71,
    maximum: 75
  },
  {
    name: 'Military Organization',
    minimum: 76,
    maximum: 100
  },
]
export const EDUCATION_MAP = [
  {
    name: 'Level 1',
    minimum: 1,
    maximum: 20,
    description: 'Everything is self-taught as the animal lives in the wild with no help or assistance. Character mistrusts humans and other animals. Basic reading, writing and arithmetic are at a low level. Wilderness skills include Prowl (+ 24%), Survival Skills (+ 24%), Escape Artist (+10%), Climbing (+ 15%) and Swimming (+10%). There is an S.D.C. bonus of + 10%, a P.E. bonus of +6, a P.S. bonus of +3, an a P.P. bonus of + 2 and two additional attacks per melee. Characters can pick only one (1) Secondary skill. Character has scavenged 3D6 times $100 in various equipment, most in poor condition.'
  },
  {
    name: 'Level 2',
    minimum: 21,
    maximum: 40,
    description: 'By skulking around the fringes of society the character picks up rudimentary education. The character probably has a small number of human friends but distrusts people in general. Knows 14 Secondary skills. Character also has Prowl (+ 12%), a P.P. bonus of +1, and Hand to Hand Basic. Character has scavenged 3D6 times $200 in equipment.'
  },
  {
    name: 'Level 3',
    minimum: 41,
    maximum: 90,
    description: 'Adopted by a "mentor" who teaches and guides the character in some form of special training. This is often Ninjitsu, but all areas of special training can be selected. These characters will learn to be philosophic about all creatures. Their attitude could be summed up as, some people are good, some bad, everyone deserves a chance to earn your trust. Ninja characters learn 3 military/espionage skills, 10 secondary skills (with a skill bonus of + 5%) and Hand to Hand Ninjitsu. In addition, the character has a choice of 3 ancient or ninja weapon proficiencies. Character has scavenged and build 3D6 times $100 worth of equipment.'
  },
  {
    name: 'Level 4',
    minimum: 91,
    maximum: 100,
    description: 'Character goes public and is educated at a major university. The character likes and trusts humanity in general. Education is four years of college. Select 3 skill programs and 10 Secondary skills. The skill bonus is +20% on all scholastic skills only. Although struggling for financing, at least 2D6 times $500 worth of equipment has been collected.'
  }
]
export const ALIGNMENT_MAP = [
  {
    name: 'Principled  (Good)',
    type: 'Good',
    description: 'Principled  characters  are,  generally,  the  strong,  moral  character.Superman is of principled alignment, with the highest regard for other\'slives  and  well-  being,  truth  and  honor.  They  will  always  attempt  towork  with  and  within  the  law.'
  },
  {
    name: 'Scrupulous (Good)',
    type: 'Good',
    description: 'Scrupulous  characters  value  life  and  freedom  above  all  else,  anddespise  those  who  would  deprive  others  of them.  This  type  of hero  istypically portrayed in many Clint Eastwood and Charles Bronson films;the  person  who  is  forced  to  work  beyond  the law,  yet for the law,  andthe greater good of the people.  They are not vicious  or vindictive men,but are men driven to right injustice. I must point out that these characterswill always attempt to work with or within the law whenever possible.'
  },
  {
    name: 'Unprincipled (Selfish)',
    type: 'Selfish',
    description: 'This,  basically,  good  person  tends  to  be  selfish,  greedy,  and  holdshis/her  personal  freedom  and  welfare  above  almost  everything  else.He/she  dislikes  confining  laws,  self-discipline,  and  distrusts  authority.He  views  the  law  as  well  intentioned,  but  clumsy  and  ineffective.Keeping his best interests in mind he  will  always  look out for himself.This tends to be an arrogant,  impetuous,  schemer seeking the praise ofmillions  and  making  a  buck  to  boot.  He  is  a  freebooter  who  will  do what he must to achieve his goals,  stopping short of anarchy and a totaldisregard  of the  law.  This  guy  is  likely  to  be  a  vigilante  type  whoseintentions  are  good,  tries  to  be  fair  and  honest,  but  finds  the  law  tooconfining  to  be  effective.  Thus,  he  goes  his  own  more  efficient  route(at least that\'s how he  sees it),  working outside the law. This  character  is  also  likely  to  take  "dirty"  money  and  items,  withthe  concept  that  it will  help  him  in  his crusade  against evil.  An  ironictwist  of justice  as  he  sees  it.  After  all,  the  loss  of  money/items  willhurt  the  villains  too.  With  this  in  mind,  he  may  also  destroy  propertyof known criminals.  He will not deal in illegal activities, drugs, or takemoney  from  innocent  or  good  people  (only  known  criminals).  Theunprincipled character may associate with both good and evil characters,and often  has  paid  informants,  spies,  and  stoolies.  He  is often temptedto  lie  and  cheat,  and  hates  himself for  being  loyal  to  his  ideals  andhelping others.  He is basically a  good guy.' 
  },
  {
    name: 'Anarchist (Selfish)',
    type: 'Selfish',
    description: 'This  type  of character  likes  to  indulge  himself in  everything.  He  isthe  insurgent,  con-man,  gambler  and  high  roller.  The  uncommittedfreebooter  who  is  more  likely  to  be  a  crimefighter  because  he  enjoysthe  thrill  of danger  and  excitement  than  any  cause.  This  character willat  least  consider  doing  anything  if the  price  is  right,  or  the  challengegreat.  Like  moths  drawn  to  a  flame,  the  anarchist  is  attracted  to  thelure  of the impossible, dangerous,  and the underdog.  These people areintrigued  by  power,  glory  and  wealth.  Life  has  meaning,  but  his  hasthe  greatest  meaning.  Innocent  lives  are  protected,  but  occasionallysome  must  be  sacrificed  for  the  greater  cause.Laws  and  rules  infringe  on  personal  freedom  and  were  meant  to  bebroken.  He  will  not  hesitate  at  using  strong-arm  techniques,  breakingand entering,  theft,  harassment,  destruction  of private property,  and  soon.  This includes acting as judge, jury,  and executioner. After all, thereis the wrong way and his way.  These characters are usually the daringvigilante or anti-hero who feels the end justifies the means. The anarchistaligned person is always looking for the best deal and self-gratification,and will work with good, selfish or evil to attain his goals. The anarchistis  continually  teetering  between  good and evil; rebelling,  and bendingthe law to fit his needs.'
  }
]

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
    this.mutation = this.calcMutation()
    this.education = this.calcEducation()
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
    let category

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

    return category
  }

  calcAnimalType () {
    let that = this
    let match = _.findWhere(ANIMAL_MAP, function (category) {
      return category.category === that.category
    })
    let matchroll = dice.roll(1, 100).result
    let type

    match.types.forEach(function (t) {
      if (matchroll >= t.minimum && matchroll <= t.maximum) {
        type = t.name
      }
    })

    return type
  }

  calcMutation () {
    let roll = dice.roll(1, 100).result
    let match = _.find(MUTATION_MAP, function (mutation) {
      return (roll >= mutation.minimum && roll <= mutation.maximum)
    });
    let animaleducation = match.animal_education
    let description = match.description

    if (match.type === 'Deliberate Experimentation') {
      let roll = dice.roll(1, 100).result
      let newmatch = _.find(match.subtypes, function (subtype) {
          return (roll >= subtype.minimum && roll >= subtype.maximum)
      });
      animaleducation = newmatch.animal_education
      description = newmatch.description
      match = newmatch
    }

    return {
      type: match.type,
      animal_education: animaleducation,
      description: description,
    }
  }

  calcEducation () {
    const roll = dice.roll(1, 100).result

    if ( this.mutation.animal_education === true ) {
      const newmatch = _.find(EDUCATION_MAP, (level) => roll >= level.minimum && roll >= level.maximum)
      return newmatch
    } else return false
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
    }
  }

  return roll
}


export const rollCharacter = () => {
  let roll = rollAttributes()

  return new Character(roll.IQ, roll.ME, roll.MA, roll.PS, roll.PP, roll.PE, roll.PB, roll.Spd)
}


rollCharacter()



