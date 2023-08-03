export interface IJobs {
    id:number
    title: string
    location: string
    date: string
    time: string
    flag: string
    about?:string
    stack?:string
    requirements?:any
}