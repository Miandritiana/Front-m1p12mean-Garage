
export interface Menu {
    menu: {
        idMenu: number,
        nomMenu: string,
        lien: string,
        idMenuParent: number,
        rang: number,
        ordre: number,
        icon: string,
        titre:boolean,
        idAction:number,
        params:string;
    }
    enfant: Menu[]
}