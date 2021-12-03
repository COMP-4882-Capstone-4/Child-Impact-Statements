export const TractBreakdownSchema: {
  column: string;
  type: 'string' | 'number';
}[] = [
  {
    column: 'Tract',
    type: 'string',
  },
  {
    column: 'District',
    type: 'string',
  },
  {
    column: 'Total Population',
    type: 'number',
  },
  {
    column: 'Total Population - Under 18',
    type: 'number',
  },
  {
    column: 'Total Population - Under 18 - Male',
    type: 'number',
  },
  {
    column: 'Total Population - Under 18 - Female',
    type: 'number',
  },
  {
    column: 'Total Population in Poverty - Ages Under 6',
    type: 'number',
  },
  {
    column: 'Total Population in Poverty - Ages 6 to 11',
    type: 'number',
  },
  {
    column: 'Total Population in Poverty - Ages 12 to 17',
    type: 'number',
  },
  {
    column: 'Public Parks in Tract',
    type: 'number',
  },
  {
    column: 'Public Libraries in Tract',
    type: 'number',
  },
  {
    column: 'Community Centers in Tract',
    type: 'number',
  },
];
