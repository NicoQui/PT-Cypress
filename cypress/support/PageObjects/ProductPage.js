class ProductPage{
    getInstallmentsLink(){
        return cy.get('#open-installments-modal');
    }

    getAddToCartBtn(){
        return cy.get('#swatch_attribute_card');
    }

    // Los siguientes podrian estar en una clase separada
    // Que haga referencia al elemento 'modal'
    getInstallmentsTable(){
        return cy.get('#bodyTable');
    }

    getBankInput(){
        return cy.get('#inputbank');
    }

    getCardInput(){
        return cy.get('#inputCard');
    }

    getBankItems(){
        return cy.get('#ui-id-2');
    }

    getCardItems(){
        return cy.get('#selectCardByBank');
    }

    getCalulateBtn(){
        return cy.get('#calculate_btn > .btn-primary');
    }


    // Alternativas por si se quiere hacer una llamada genérica
    getInput(type){ 
        if(type == 'bank')
            return this.getBankInput();
        else if(type == 'card')
            return this.getCardInput();
        else
            return undefined;
    }

    getItems(type){
        if(type == 'bank')
            return this.getBankItems();
        else if(type == 'card')
            return this.getCardItems();
        else
            return undefined;
    }
}

export default ProductPage;