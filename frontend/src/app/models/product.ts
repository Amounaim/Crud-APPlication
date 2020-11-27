export class Product{

    _id: string;
    nom : String;
    prix : Number ;
    quantite : Number ;

    constructor(nom,prix,quantity){

        this.nom= nom;
        this.prix = prix;
        this.quantite=quantity;

    }

}