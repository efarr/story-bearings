import type { Division } from "./index";

function chapters(orientations: string[]): Division["chapters"] {
  return orientations.map((orientation, index) => ({
    chapter: index + 1,
    orientation,
  }));
}

export const divisions: Division[] = [
  {
    kind: "part",
    chapters: chapters([
      `A former student named Raskolnikov slips out of a Petersburg garret to avoid the landlady he owes. In rags, hungry, and talking to himself, he walks a route he has counted to the house of an old pawnbroker, Alyona Ivanovna. He tells himself the visit is only a rehearsal.

He pawns a silver watch, watches where she keeps her keys, and asks whether her sister Lizaveta is at home. The cramped, clean flat, the tinny bell, and the old woman's suspicion all settle in his mind. On the stairs afterward he is sickened by the plan he has been turning over for a month. He goes into a basement tavern for beer and bread, and tells himself the whole thing was only nerves.`,

      `In the tavern a drunken clerk named Marmeladov attaches himself to Raskolnikov and talks without stopping. He is a titular counsellor who has drunk himself out of a post. He describes his second wife, Katerina Ivanovna, consumptive and proud, and her three children, and his own daughter Sonia, who has a yellow ticket and supports them.

He has just spent Sonia's last money on drink. Raskolnikov walks him home to a passage room where Katerina Ivanovna is wrangling and the children are on the floor. Marmeladov is received with blows and reproach. Raskolnikov leaves a few coppers on the window and goes back to his garret.`,

      `Nastasya, the servant from downstairs, wakes him with soup and a letter from his mother, Pulcheria Alexandrovna, in the provinces. The letter is full of Dounia. She had been a governess in the house of the Svidrigailovs; the husband, Arkady Ivanovitch, pursued her, and Marfa Petrovna, the wife, turned her out. Marfa Petrovna later cleared Dounia's name in the town.

Dounia has now accepted Pyotr Petrovitch Luzhin, a relation of Marfa Petrovna's, a man of means who is coming to Petersburg on business and wants a wife who will be grateful. Mother and daughter are following him to the city. The letter treats the match as the family's rescue and as help for Raskolnikov's future. He looks at the dirty room and the leftover soup.`,

      `Raskolnikov walks the streets turning the letter over. He will not have Dounia sold to Luzhin so that he can be set up in a university again. He thinks of Razumihin, a former student friend who would share what he had, and of how little that would solve.

On a boulevard he finds a drunken young girl being followed and pays a policeman to see her home, then curses himself for the charity. He cannot go to his garret. He heads out of town toward the islands, exhausted, and looks for somewhere to lie down.`,

      `He sleeps in the bushes and dreams of his childhood: a skinny nag being beaten to death by a peasant in a crowd while a little boy tries to save her. He wakes in a sweat, shaken by the dream, and tells himself he cannot go through with what he has been planning.

On the way home, in the Haymarket, he overhears Lizaveta talking with cheap dealers. She will be out tomorrow evening, at seven, visiting friends. Alyona Ivanovna will be alone. The chance he has been waiting for has been said in the street. By the time he reaches his room the earlier refusal is gone.`,

      `He stays in the garret and prepares. He sews a loop inside his coat for an axe, wraps a dummy pledge of wood and iron, and thinks back to a tavern talk he once overheard: a student telling an officer that Alyona Ivanovna is a louse, and that killing her and using her money would be a service. He had not joined in.

When Nastasya goes out, he takes an axe from the porter's room. He walks to the pawnbroker's house among people coming home from work, counting the time so that he will arrive at seven.`,

      `He rings the tinny bell. Alyona Ivanovna lets him in to look at the dummy pledge. He kills her with the axe. He is at her keys and the chest when Lizaveta comes back into the flat. He kills her too.

Two men knock and ring, then leave for the porter. Raskolnikov slips out while they are gone, hides in an empty flat being decorated, and gets back to his own house. He returns the axe, cleans what he can see, and falls on the sofa in his clothes.`,
    ]),
  },
  {
    kind: "part",
    chapters: chapters([
      `He wakes in a panic, stuffs the purse and pledges into a hole behind the wallpaper, and sits waiting for a knock. Nastasya brings a summons: the police office, about money owed to the landlady. He goes, light-headed, and finds a crowd of petty business.

While he is there, clerks talk of an old woman and her sister murdered the night before. The room tilts. He faints. They give him water and let him sign a note for the debt. He leaves with the talk of the murder still in the office.`,

      `In the yard of a courtyard house he lifts a stone and hides the purse and the pledges under it. He walks without a destination. At Razumihin's lodging he almost takes translation work, then walks out in the middle of the offer.

On a bridge he looks at the water and cannot jump. A woman near him tries to. He goes home, falls into fever, and loses the next stretch of hours in delirium.`,

      `He comes to himself in the garret. Razumihin has been coming and going, and Nastasya has been feeding him. There is money: his mother sent thirty-five roubles, and Razumihin has already spent some of it on clothes and food.

Razumihin talks, teases, and takes charge. A doctor, Zossimov, has been sent for. Raskolnikov answers little. The room is full of someone else's energy, and he cannot get the last days into one line.`,

      `Zossimov comes and talks medicine while Razumihin talks about the murder. The story in the city is that the old pawnbroker and her sister were found by two clients at the door; two painters were working in the empty flat on that landing. One of the painters, a young fellow named Nikolay, has been behaving strangely.

Luzhin is expected at the garret. Raskolnikov lies on the sofa in the new clothes Razumihin bought and listens to other people arrange his day.`,

      `Luzhin arrives, stiff and pleased with himself. He talks of his views on marriage and of Dounia's reputation as if both were his to manage. Raskolnikov, still ill, tells him the letter's terms were insulting and that Dounia will not marry him.

Razumihin tries to keep the peace and fails. Luzhin leaves offended. Zossimov takes note of the outburst. Raskolnikov wants the room empty.`,

      `He dresses and goes out against Razumihin's wishes. In a restaurant he sits with Zametov, a clerk from the police office, and talks about the murder until the talk is almost a confession, then turns it into a joke and walks away.

He drifts to the pawnbroker's building, goes up, and rings the bell of the empty flat. Workmen are there. He looks at the place and leaves. In the street a carriage has run over a man. He sees that it is Marmeladov.`,

      `Marmeladov is crushed and still alive. Raskolnikov has him carried up to the passage room. Katerina Ivanovna shrieks and tries to nurse him; the children stare. Sonia comes in from the street in the dress her work requires and kneels by her father. He dies asking her forgiveness.

Raskolnikov leaves money for the funeral. A little girl, Polenka, runs after him to thank him and to ask his name. He walks home lighter than he has been, then finds Pulcheria Alexandrovna and Dounia in his garret. Razumihin is with them. He looks at his mother and sister and faints.`,
    ]),
  },
  {
    kind: "part",
    chapters: chapters([
      `He comes out of the faint into a family scene he cannot bear. He tells his mother and sister to leave him, and he tells Dounia to break with Luzhin. Dounia answers that she will decide for herself. Razumihin takes the two women to a lodging he has found and spends the rest of the evening too talkative with drink.

He is already watching Dounia. Raskolnikov is left in the garret with Nastasya. The city is still talking about the old woman and her sister.`,

      `In the morning Razumihin is ashamed of himself and goes to Pulcheria Alexandrovna and Dounia with coffee and news. Luzhin has sent a note: he will call, and he does not want Raskolnikov in the room. The women are angry at the condition.

Razumihin talks about the murder case and about his relation Porfiry Petrovitch, who is in charge of the investigation. He also talks, too freely, of Raskolnikov. They agree to go to the garret together.`,

      `Zossimov is at Raskolnikov's when the family arrives. Raskolnikov is calmer on the surface. He still insists that Dounia refuse Luzhin, and she shows him Luzhin's note. They speak of the pledges Raskolnikov left with the old woman; Razumihin will take him to Porfiry to claim them.

Raskolnikov says he has used some of the money he left for Marmeladov's funeral and that he will go to the widow. The visit to the examining magistrate is now part of the day's plan.`,

      `Sonia comes to the garret to invite Raskolnikov to the funeral service and the meal afterward. Pulcheria Alexandrovna and Dounia see her and do not know where to look. Sonia, embarrassed, gives the time and the address.

When she has gone, Razumihin and Raskolnikov set off for Porfiry's. On the way Razumihin is still trying to be useful. Raskolnikov is thinking of the pledges and of the man he is about to meet.`,

      `Porfiry Petrovitch receives them in his rooms. Zametov is there as well. The talk moves from the pledges to the murder, and then to an article Raskolnikov published on crime: that certain extraordinary people have the right to overstep. Porfiry is affable, curious, and hard to shake off.

He asks questions as if they were jokes: had Raskolnikov seen the painters, could he have been in the empty flat, what did he think of the workmen's stories. Raskolnikov answers, flares up, and holds his ground. They leave with the pledges still to be settled and the conversation unfinished.`,

      `On the stairs a tradesman who has been following Raskolnikov looks at him and calls him a murderer. Raskolnikov cannot get the face out of his mind. Razumihin comes later, half drunk, to say that Porfiry does not seriously suspect him, and then talks as if he does.

Alone, Raskolnikov thinks of the stone in the yard and of whether anyone saw him. He dreams he is back in the old woman's flat, striking her, and she will not die. He wakes. A stranger is sitting in the room, watching him.`,
    ]),
  },
  {
    kind: "part",
    chapters: chapters([
      `The stranger is Arkady Ivanovitch Svidrigailov. Marfa Petrovna is dead; he has come to Petersburg and found Raskolnikov by asking at the old address. He talks of seeing his late wife's ghost, of his interest in Dounia, and of money he wants to give her. He says he has no designs of the old kind, and that they two have a point in common.

Raskolnikov listens with dislike and cannot tell what is lie, ramble, or threat. Svidrigailov leaves as easily as he came. The morning still has Luzhin's visit in it.`,

      `At Pulcheria Alexandrovna's lodging, Luzhin sits with the family and Razumihin. He is cold and offended. He brings up Sonia as a proof of Raskolnikov's character, and he tries to manage Dounia by putting her brother in the wrong.

Dounia makes him speak plainly and then tells him she will not marry him. Luzhin, stunned that the match is gone, tries to recover his position and cannot. He goes. The room is suddenly lighter, and Razumihin cannot hide what he feels.`,

      `They sit with the broken engagement and the remaining money questions. Raskolnikov tells Razumihin to stay with his mother and sister and to look after them. He says he himself must be alone, perhaps for a long time, and that Razumihin will understand later.

Razumihin, frightened by the tone, still takes the charge. Raskolnikov leaves them and walks toward Sonia's lodging.`,

      `Sonia lives in a room rented from the Kapernaumovs, with thin walls and a family on the other side of the door. Raskolnikov tells her they are both cursed and both alone. He has her read aloud the raising of Lazarus from her New Testament.

He does not tell her who killed Lizaveta. He says he will come tomorrow and say it. He asks her to go with him then if he asks. She is frightened and will not turn him away.`,

      `He keeps the appointment with Porfiry. This time there is no Razumihin. Porfiry talks in circles about psychology, about the painters, about a surprise he has prepared, and about how a guilty man behaves. Raskolnikov demands to be charged or left alone.

Porfiry will not quite do either. He seems about to produce his surprise from another room. Raskolnikov is at the end of his patience when the sitting is broken from outside.`,

      `Nikolay, the painter from the empty flat, bursts in and confesses to the murders. Porfiry's surprise is ruined. He is angry, then busy with the new statement. Raskolnikov is allowed to go.

At the garret the tradesman from the street is waiting to bow and apologize: he had taken Raskolnikov for the murderer and now believes he was wrong. Raskolnikov has the day back, and nothing in it is settled.`,
    ]),
  },
  {
    kind: "part",
    chapters: chapters([
      `Luzhin is lodging with Andrey Semyonovitch Lebeziatnikov, the young official of advanced opinions who once lived in the same building as the Marmeladovs. Luzhin, still smarting from Dounia, counts his money and considers Sonia. He asks her in, gives her a ten-rouble note for the widow, and, while they talk, gets a folded hundred-rouble note into her pocket.

Lebeziatnikov sees more of this than Luzhin wants. Luzhin is preparing to go to Katerina Ivanovna's funeral meal as a man of injured virtue.`,

      `The funeral meal is in the Marmeladovs' room, paid for with Raskolnikov's money and Katerina Ivanovna's pride. Amalia Ivanovna, the landlady, sits in state. The guests are poor and hungry. Katerina Ivanovna quarrels with the landlady, boasts of her father the colonel, and tries to make the children show off.

Raskolnikov is there. Sonia helps and shrinks from notice. The meal is already breaking into noise when Luzhin appears.`,

      `Luzhin announces that a hundred-rouble note is missing and that Sonia was alone in his room. The note is found in her pocket. The room turns on her. Lebeziatnikov stands up and says he saw Luzhin put it there.

Raskolnikov explains the use of the trick: to blacken Sonia and, through her, Dounia. Luzhin leaves, threatening the law. Katerina Ivanovna is beyond managing herself. Sonia runs home. Raskolnikov follows her.`,

      `In Sonia's room he tells her that he is the man who killed Alyona Ivanovna and Lizaveta. She stares at him, then weeps for him and for Lizaveta, whom she knew. He tries to give reasons — want, a theory about power, a wish to dare — and none of them holds in the telling.

She says he must stand at the crossroads, bow down, and confess. He is not ready. He asks whether she will come with him if he goes to the mines. She says she will.`,

      `Lebeziatnikov finds them: Katerina Ivanovna has taken the children into the street to sing and beg, mad with fever and shame. They follow. She collapses. She is carried in and dies, still giving orders.

Svidrigailov is in the crowd. He offers to pay for the children to be placed and for the funeral. Alone with Raskolnikov he lets him know that he lodges at the Kapernaumovs' and that the wall is thin. He heard the confession to Sonia.`,
    ]),
  },
  {
    kind: "part",
    chapters: chapters([
      `A few days have gone by. Katerina Ivanovna has been buried. Raskolnikov is still free and still unconfessed. Razumihin comes in a state: Dounia has been asking questions, and Razumihin feels shut out of whatever Raskolnikov is carrying.

Svidrigailov has been useful with money for the orphans and is still in town. Porfiry has not come. Raskolnikov cannot rest in the garret and cannot decide where to walk.`,

      `Porfiry comes to the garret without a summons. He says plainly that he thinks Raskolnikov is the murderer, that Nikolay's confession is a false burden, and that he has no order in his pocket today. He talks of a lighter sentence if a man confesses in time, and of the relief of taking the suffering on oneself.

He leaves the choice on the table. Raskolnikov is not arrested. The door closes on an investigation that no longer pretends to be a chat.`,

      `Raskolnikov goes looking for Svidrigailov and finds him in a tavern, at ease. They talk of Dounia, of Marfa Petrovna, and of whether Svidrigailov will stay in Petersburg. Svidrigailov claims he is fond of Dounia in a new way and also talks as if he could still use what he heard at Sonia's.

Raskolnikov warns him off his sister. Svidrigailov, amused, says they will walk. The evening is wet and not finished.`,

      `Svidrigailov talks on: his marriage to Marfa Petrovna, the hold she had on him, a servant girl in the country, his boredom, his plans to marry a very young bride with money. He describes Dounia's old stay in their house from his side.

Raskolnikov listens for the threat inside the stories. They move through the rain toward Svidrigailov's rooms.`,

      `Svidrigailov has written to Dounia. She comes to his rooms to hear what he means to do with the confession he overheard. He locks the door and tells her he can save her brother if she stays. She has brought a revolver. She fires and grazes his head; the next cap fails.

He looks at her, puts the key where she can take it, and stands aside. She goes.`,

      `He goes to Sonia and leaves her money for the Marmeladov children and for herself. He wanders the wet streets, takes a room in a hotel, and cannot sleep. He dreams of a neglected girl and of a flood.

In the morning he walks out to a courtyard with a watchman in a helmet. He puts the revolver to his right temple and shoots himself.`,

      `Raskolnikov goes to his mother. Pulcheria Alexandrovna is full of hope and of a future in which he will be famous. He cannot tell her what he has done. He leaves her with tenderness and deceit.

Dounia comes to him afterward. He tells her he is going to the police. They argue over whether the killing could ever have been right. She weeps and does not abandon him.`,

      `At Sonia's he takes a wooden cross she offers. He goes toward the police office, turns aside to the Haymarket, and bows to the earth, but the crowd's laughter breaks the gesture. At the office Ilya Petrovitch is talkative. News comes that Svidrigailov has shot himself.

Raskolnikov walks out without speaking. Sonia is waiting in the yard. He turns back, goes in, and says that he killed the old pawnbroker and her sister Lizaveta with an axe.`,
    ]),
  },
  {
    kind: "epilogue",
    chapters: chapters([
      `The trial is over. Raskolnikov confessed, did not try to make a theory of the murders, and was sentenced to eight years in Siberia. Pulcheria Alexandrovna fell ill, clung to a story in which her son would still be great, and died. Dounia married Razumihin.

Sonia followed the convoy and lives in the town near the prison. She writes to Dounia. Raskolnikov is a convict among convicts and has not yet looked at his term as a life to be lived.`,

      `In the prison he is still proud and still alone. The other convicts dislike him; they like Sonia, who comes to the yard. He falls ill and is taken to the hospital. In a fever he dreams of a pestilence of ideas that makes people kill for their own truth.

Sonia has been ill too. When he is better he looks at her differently. Something in him turns toward her, and toward the years still left to serve. The Book ends on that beginning, not on the term completed.`,
    ]),
  },
];
