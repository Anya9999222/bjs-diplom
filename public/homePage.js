const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout(response => {
        if(response.success){
            location.reload();
        }
    }) 
}

ApiConnector.current(response => {
    let profile = response.data;
    if(response.success){
        ProfileWidget.showProfile(profile);
    }
})

const newRatesBoard = new RatesBoard();
function currentRates(){
    ApiConnector.getStocks(response => {
        let rates = response.data;
    if(response.success){
        newRatesBoard.clearTable();
        newRatesBoard.fillTable(rates);
    }
})}
currentRates();
setInterval(() => currentRates(), 60000)

const newMoneyManager = new MoneyManager();
newMoneyManager.addMoneyCallback = (data) => {
    console.log(data);
    let currency = data.currency;
    let amount = data.amount;
    ApiConnector.addMoney({currency, amount}, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(true, "Зачисление прошло успешно")
        } else{
            newMoneyManager.setMessage(false, response.error)
        }
    })
}

newMoneyManager.conversionMoneyCallback = (data) => {
    let fromCurrency = data.fromCurrency;
    let targetCurrency = data.targetCurrency;
    let fromAmount = data.fromAmount
    ApiConnector.convertMoney({fromCurrency, targetCurrency, fromAmount}, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(true, "Конвертация прошла успешно")
        } else{
            newMoneyManager.setMessage(false, response.error)
        }
    })
}

newMoneyManager.sendMoneyCallback = data => {
    let to = data.to;
    let currency = data.currency;
    let amount = data.amount;
    ApiConnector.transferMoney({to, currency, amount}, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(true, "Перевод прошел успешно")
        } else{
            newMoneyManager.setMessage(false, response.error)
        }
    })
}

const newFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    console.log(response);
    if(response.success){
        newFavoritesWidget.clearTable();
        newFavoritesWidget.fillTable(response.data);
        newMoneyManager.updateUsersList(response.data);
    }
})

newFavoritesWidget.addUserCallback = data => {
    console.log(data);
    let id = data.id;
    let name = data.name;
    ApiConnector.addUserToFavorites({id, name}, response => {
        if(response.success){
            newFavoritesWidget.clearTable();
            newFavoritesWidget.fillTable(response.data);
            newMoneyManager.updateUsersList(response.data);
            newFavoritesWidget.setMessage(true, "Успешно!");
        } else {
            newFavoritesWidget.setMessage(false, response.error);
        }
    })
}

newFavoritesWidget.removeUserCallback = userToDelete => {
    ApiConnector.removeUserFromFavorites(userToDelete, response => {
        if(response.success){
            newFavoritesWidget.clearTable();
            newFavoritesWidget.fillTable(response.data);
            newMoneyManager.updateUsersList(response.data);
            newFavoritesWidget.setMessage(true, "Успешно!");
        } else {
            newFavoritesWidget.setMessage(false, response.error);
        }
    })
}