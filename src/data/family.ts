import { groom } from './groom';
import { bride } from './bride';
import { assets } from './assets';
export const families = [
 
  {
    id: 'bride',
    members: [
      {
        id: 'father',
        name: bride.parents[0],
        image: assets.familyManB,
        colors: ['#efc416', '#35a257'],
      },
      {
        id: 'mother',
        name: bride.parents[1],
        image: assets.familyWomanB,
        colors: ['#2972d7', '#efbd1e'],
      },
      {
        id: 'sister',
        name: bride.parents[2],
        image: assets.familysister1B,
        colors: ['#2972d7', '#efbd1e'],
      },
      {
        id: 'sister',
        name: bride.parents[3],
        image: assets.familysister2B,
        colors: ['#2972d7', '#efbd1e'],
      },


    ],
  },
   {
    id: 'groom',
    members: [
      {
        id: 'father',
        name: groom.parents[0],
        image: assets.familyManG,
        colors: ['#ed2786', '#32aa52'],
      },
      {
        id: 'mother',
        name: groom.parents[1],
        image: assets.familyWomanG,
        colors: ['#ff8b19', '#e92187'],
      },
      {
        id: 'sister',
        name: groom.parents[2],
        image: assets.familysisterG,
        colors: ['#ff8b19', '#e92187'],
      },
    ],
  },
] as const;
