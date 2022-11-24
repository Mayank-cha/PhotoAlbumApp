export class Image{
    id!:number;
    tag!:string;
    title!:string;
    path!:string;
    userId!:string;
    public constructor(init?:Partial<Image>) {
        Object.assign(this, init);
    }
}