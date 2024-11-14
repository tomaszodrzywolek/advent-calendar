import image1 from "../img/1.jpg";
import image2 from "../img/2.jpg";
import image3 from "../img/3.jpg";
import image4 from "../img/4.jpg";
import image5 from "../img/5.jpg";
import image6 from "../img/6.jpg";
import image7 from "../img/7.jpg";
import image8 from "../img/8.jpg";
import image9 from "../img/9.jpg";
import image10 from "../img/10.jpg";
import image11 from "../img/11.jpg";
import image12 from "../img/12.jpg";
import image13 from "../img/13.jpg";
import image14 from "../img/14.jpg";
import image15 from "../img/15.jpg";
import image16 from "../img/16.jpg";
import image17 from "../img/17.jpg";
import image18 from "../img/18.jpg";
import image19 from "../img/19.jpg";
import image20 from "../img/20.jpg";
import image21 from "../img/21.jpg";
import image22 from "../img/22.jpg";
import image23 from "../img/23.jpg";
import image24 from "../img/24.jpg";



/**
 * Found this on Stackoverflow https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a - An array containing the items.
 */
const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  
  // export const createHatches = () => {
  //   const hatchArray = new Array(24).fill(0).map((_, i) => ({
  //     id: `hatch-${i}`,
  //     nr: i + 1,
  //     img: `../../img/${i + 1}.jpg`,
  //     text: `Just ${24 - i - 1} days left`,
  //     open: false
  //   }));
  //   return shuffle(hatchArray);
  // };
  
  // Bad one-liners from https://onelinefun.com/christmas
  export const hatchArray = [
    {
      id: "hatch-1",
      nr: 1,
      img: image1,
      text:
        "Can I have your picture so I can show Santa what I want for Christmas?",
      open: false
    },
    {
      id: "hatch-2",
      nr: 2,
      img: image2,
      text:
        "What do you call people who are afraid of Santa Claus? Claustrophobic",
      open: false
    },
    {
      id: "hatch-3",
      nr: 3,
      img: image3,
      text:
        "What is the best Christmas present ever? A broken drum - you can't beat it!",
      open: false
    },
    {
      id: "hatch-4",
      nr: 4,
      img: image4,
      text:
        "How do you know when Santa's in the room? You can sense his presents.",
      open: false
    },
    {
      id: "hatch-5",
      nr: 5,
      img: image5,
      text:
        "STRESSED is just DESSERTS spelled backward.",
      open: false
    },
    {
      id: "hatch-6",
      nr: 6,
      img: image6,
      text:
        "What is the difference between snowmen and snowwomen? Snowballs.",
      open: false
    },
    {
      id: "hatch-7",
      nr: 7,
      img: image7,
      text:
        "What nationality is Santa Claus? North Polish",
      open: false
    },
    {
      id: "hatch-8",
      nr: 8,
      img: image8,
      text:
        "What kind of motorbike does Santa ride? A Holly Davidson!",
      open: false
    },
    {
      id: "hatch-9",
      nr: 9,
      img: image9,
      text:
        "Who is never hungry at Christmas? The turkey - he's always stuffed!",
      open: false
    },
    {
      id: "hatch-10",
      nr: 10,
      img: image10,
      text:
        "When you stop believing in Santa Claus is when you start getting clothes for Christmas!",
      open: false
    },
    {
      id: "hatch-11",
      nr: 11,
      img: image11,
      text:
        "What goes 'oh oh oh'? Santa walking backwards.",
      open: false
    },
    {
      id: "hatch-12",
      nr: 12,
      img: image12,
      text:
        "According to my kids' Christmas lists, they think this parenting gig pays pretty well.",
      open: false
    },
    {
      id: "hatch-13",
      nr: 13,
      img: image13,
      text:
        "Which of Santa's reindeers needs to mind his manners the most? 'Rude'olph",
      open: false
    },
    {
      id: "hatch-14",
      nr: 14,
      img: image14,
      text:
        "What will fall on the lawn first? An autumn leaf or a Christmas catalog?",
      open: false
    },
    {
      id: "hatch-15",
      nr: 15,
      img: image15,
      text:
        "What do elves learn in school? The Elf-abet!",
      open: false
    },
    {
      id: "hatch-16",
      nr: 16,
      img: image16,
      text:
        "How do you scare a snowman? You get a hairdryer!",
      open: false
    },
    {
      id: "hatch-17",
      nr: 17,
      img: image17,
      text:
        "The main thing I want this holiday season is for someone to wake me when it's over.",
      open: false
    },
    {
      id: "hatch-18",
      nr: 18,
      img: image18,
      text:
        "Remember, children. The best way to get a puppy for Christmas is to beg for a baby brother.",
      open: false
    },
    {
      id: "hatch-19",
      nr: 19,
      img: image19,
      text:
        "I bought my son a fridge for Christmas. – I can't wait to see his face light up when he opens it.",
      open: false
    },
    {
      id: "hatch-20",
      nr: 20,
      img: image20,
      text:
        "Santa's elves are just a bunch of subordinate Clauses.",
      open: false
    },
    {
      id: "hatch-21",
      nr: 21,
      img: image21,
      text:
        "What is the best evidence that Microsoft has a monopoly? Santa Claus had to switch from Chimneys to Windows.",
      open: false
    },
    {
      id: "hatch-22",
      nr: 22,
      img: image22,
      text:
        "Why do programmers always mix up Halloween and Christmas? Because 31 OCT = 25 DEC.",
      open: false
    },
    {
      id: "hatch-23",
      nr: 23,
      img: image23,
      text:
        "What does Santa suffer from if he gets stuck in a chimney? Claustrophobia!",
      open: false
    },
    {
      id: "hatch-24",
      nr: 24,
      img: image24,
      text:
        "What's red and white, red and white, red and white? Sant rolling off your roof.",
      open: false
    },
  ];
  
  export const createCalendar = () => shuffle(hatchArray);