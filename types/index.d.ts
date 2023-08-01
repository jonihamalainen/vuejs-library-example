export interface Kayttaja{
    asiakasnro: number;
    sukunimi: string;
    etunimi: string;
    katuosoite:string;
    postinro:string;
    postitmp:string;
    puh:string;
}

export interface Nide{
    lainaaika_vrk: number;
    nide_id:number;
    teos_id:number;
    tyyppi:string;
}

export interface Teos{
    kirjoittaja: string;
    luokka: string;
    nimike: string;
    teos_id: number;
}

export interface Kirjatiedot{
    nide_tiedot: Nide;
    teos_tiedot: Teos;
    erapaiva: string;
}

