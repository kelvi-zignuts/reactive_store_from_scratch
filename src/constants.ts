
/* This line of code is exporting a constant array named `periods` containing the strings "Today",
"This Week", and "This Month". and  as const makes the array "read-only" and tells TypeScript to 
remember the exact values inside the array.*/
/*as const :  It's like putting a lock on the array, so it can't be changed or modified. 
 This helps with code safety and makes it easier to understand what the array contains.*/

export const periods = ["Today", "This Week", "This Month"] as const;


//Period is a type that represents a single string value from the periods array.
//typeof periods[number] : gets the type of a single element inside the periods array.
export type Period = typeof periods[number];

//used: if not used number..it can not respresent particular period but represent whole array
// and if used number..it respresents individule period