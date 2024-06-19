import { DateTime } from "luxon";

// this define a new interface that can be used by other parts of the code.
//An interface is a way to define a shape or structure of an object.
//in that Post is the name of interface and id, title, created are the properties of the Post interface.
export interface Post {
    id:string
    title:string
    created:string
}

//TimelinePost is another interface that extends the Post interface.
//Omit<Post,'created'> : that means TimelinePost interface inherit all the properties from Post interface, except for the created property.
//Omit : utility type is used to remove the created property from the Post interface
export interface TimelinePost extends Omit<Post,'created'>{
    created:DateTime
}

//export const : dfine a new constant that can be used by other parts of the code.
//today, thisWeek, thisMonth : names of contastant
export const today:Post = {
    id:"1",
    title:"Today",
    created:DateTime.now().toISO()
    //DateTime.now() : create a new DateTime object representing the current date and time
    //toISO() : converts the DateTime object represting the current date and time
}

export const thisWeek:Post = {
    id:"2",
    title:"This Week",
    created:DateTime.now().minus({days:5}).toISO()
    //substracts 5 days from the current date and time
}

export const thisMonth:Post = {
    id:"3",
    title:"This Month",
    created:DateTime.now().minus({weeks:3}).toISO()
    //substracts 3 weeks from the current date and time
}