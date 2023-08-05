export  type responseType = {
    data: {
        message: string,
        code: string
        data: any
    }
}
export interface taskType{
    _id:any
    title:string
    description:string
    created_at:any
}[];