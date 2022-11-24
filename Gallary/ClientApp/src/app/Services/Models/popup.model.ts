import { Image } from "./image.model";

export class PopUpModel{
    image!:Image;
    file!:File | null;
    fileName!:string | undefined;
    public constructor(init?:Partial<PopUpModel>) {
        Object.assign(this, init);
    }
}
export class UpPopUpModel{
    image!:Image;
    file!:File | null;
    fileName!:string | undefined;
    updateFile!:boolean;
    public constructor(init?:Partial<UpPopUpModel>) {
        Object.assign(this, init);
    }
}
