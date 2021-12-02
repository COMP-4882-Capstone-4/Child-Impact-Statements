export const SchoolBreakdownSchema = (studentGradeBreakdown: {
  [key: string]: number;
}) => {
  const stringColumns = [
    'School Name',
    'School Type',
    'School Principal',
    'ZIP Code',
  ];

  const numberColumns = [
    'Total Students',
    'Total Students - Male',
    'Total Students - Female',
    'Grades Taught',
  ];

  const baseSchema: { column: string; type: 'string' | 'number' }[] = [];

  stringColumns.forEach((columnName) => {
    baseSchema.push({
      column: columnName,
      type: 'string',
    });
  });

  numberColumns.forEach((columnName) => {
    baseSchema.push({
      column: columnName,
      type: 'number',
    });
  });

  Object.keys(studentGradeBreakdown).forEach((gradeTaught) => {
    baseSchema.push({
      column: `Total ${gradeTaught} Students`,
      type: 'number',
    });
  });

  return baseSchema;
};
