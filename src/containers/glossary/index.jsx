import React from 'react'
import { Container, Title } from 'bloomer'
import Term from './term'

const Glossary = props => {
  return (
    <Container>
      <Title isSize={2}>Glossary</Title>
      <Term title="Campaign">
        <p>A word used to describe an ongoing game. If you playthe same characters with the same game master on a regular basis then you are in Campaign.</p>
      </Term>

      <Term title="Attributes">
        <p>These are numbers used to evaluate the strengths and weaknesses of your character. For example, P.P. means Physical Prowess, how smooth, agile and quick a character is in combat. A P.P. of 4 would indicate that the character is pretty clumsy. A P.P. of 10 would be an average, fairly coordinated human being. While a P.P. of 16 or more would belong only to characters with exceptional speed and reflexes. Attributes are also called Statistics or Stats.</p>
      </Term>

      <Term title="Character">
        <p>Every player (except the G.M.) has a character that serves as an imaginary playing piece, also called Playing Character.</p>
      </Term>

      <Term title="Death">
        <p>Just as in real life, characters can die. The death of heroes incomic books, or in games, is a fairly rare event. The amount of death in a campaign usually depends on the individual game master. Players should take a characters' death calmly. Remember this is ONLY a game and superheroics is a dangerous line of work. G.M. 'should allow players to roll up "NEW" character and include it in the game as soon as is appropriate for the on-going game. However, characters should not be a dime a dozen.</p>
      </Term>

      <Term title="Dice">
        <p>There are a variety of different dice used in role-playing games. First of all, there are the standard six-sided dice, the kind you use for most board games. We call them "D6". Often we let you know how many dice to roll with an expression like "roll 3D6." This means "roll three six-sided dice and add all results together." Dice are also available with four-sides (D4), eight-sides (D8), ten-sides (D10), and even twenty-sides (D20). They are available at most hobby stores.</p>
      </Term>

      <Term title="Game Master (G.M.)">
        <p>This is the person who controls the game "world".  All  the  nonplayer characters,  innocent bystanders,  policeand politicians,  even the  weather  is  controlled by  the G.M.</p>
      </Term>

      <Term title="Player">
        <p>A  player is  a person who plays  a character in  a role-playinggame.</p>
      </Term>

      <Term title="Role-Playing Game">
        <p>Sometimes  called  a  role-playing  game  (RPG),or  fantasy  role-playing  (FRP),  these  are  games  with  game  mastersand  imaginary  characters.</p>
      </Term>

      <Term title="Roll a Twenty-Sided">
        <p>Simply  roll  a  twenty  sided  die  for  a  number.</p>
      </Term>

      <Term title="Roll Percentile">
        <p>Take  two  ten-sided  dice  of  different  colors.  Let'ssay  we  have  on  green  and one red.  First  you  declare which  die willbe  high  ("I  call  red  high").  Next  you  roll  the  dice,  first  you  readthe  High  die  and  then  the  Low  die,  just  put  the  numbers  togetherand  you  have a percentile.  For example,  "Red  is 4  and  green  is  8,so  I  have  a  48%."</p>
      </Term>

      <Term title="Run">
        <p>This  is  just  a  term  gamers  use  to  describe  playing  a  game.Example,  "He runs  an excellent campaign,"  "I ran  in Kevin's gamelast  week."</p>
      </Term>

      <Term title="Saving Throw">
        <p> This is a roll (usually on a twenty sided die) to avoidsome  unpleasant event.  For example,  a character might have to rolla  saving  throw  to  avoid  being  overcome  by  tear gas.</p>
      </Term>

      <Term title="Scenario">
        <p>This  is  a  specific  adventure  that  confronts  the  charactersin a role-playing game. A scenario is usually a story with a beginning(hearing about the criminal), a middle (tracking down the criminal'shideout),  and  an  end  (defeating  the  criminal).  Most  campaigns  aredeveloped  around  a  number  of  scenarios.</p>
      </Term>
    </Container>
  )
}

export default Glossary