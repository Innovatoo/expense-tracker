'use strict';

// selectors
const navList = document.querySelector('.nav__list');
const navDashboard = document.querySelector('.nav__link--dashboard');
const navIncome = document.querySelector('.nav__link--income');
const navExpense = document.querySelector('.nav__link--expense');
// Pages
const dashboardSection = document.querySelectorAll('.dashboard');
const incomeSection = document.querySelectorAll('.income');
const expenseSection = document.querySelectorAll('.expense');
// page settings
const datePage = document.querySelector('.date__date');
const percentage = document.querySelector('.percentage__value');
const pageName = document.querySelector('.logo__title');

const totalBudgetValue = document.querySelector('.display__budget--value');
const totalIncomeValue = document.querySelector('.display__income-total--value');
const totalExpenseValue = document.querySelector('.display__expense-total--value');


const incomeList = document.querySelector('.income__list');
const expenseList = document.querySelector('.expense__list');
const globalList = document.querySelector('.global__list');

const transSubmit = document.querySelector('.popup__form--submit');

const addIncomeButton = document.querySelector('.add__income');
const addExpenseButton = document.querySelector('.add__expense');

const incomePopup = document.querySelector('.popup__income');
const expensePopup = document.querySelector('.popup__expense');
const popup = document.querySelector('.popup');

const popupClose = document.querySelector('.popup__close');
const popupTitle = document.querySelector('.popup__title');
const popupDescription = document.querySelector('.popup__form--description');
const popupValue = document.querySelector('.popup__form--value');
const popupValuta = document.querySelector('.popup__form--valuta');
const popupSubmit = document.querySelector('.popup__form--submit');

let activePopup;

////////////////////////////////////////////////////////////////////////////////////////
class Transaction{
    description;
    value;
    currency;
    date;


    constructor(description,value, currency, date) {
        this.description = description;
        this.value = value;
        this.currency = currency;
        this.date = date;
    }
}


class App{
    #globalList = [];
    #incomeList = [];
    #expenseList =[];
    #totalExpense;
    #totalIncome;
    #totalBudget;
    #pencentage;
    #nextTransID;
    #date;



    constructor() {
        this._getDate();
        this._getTransID();
        this._openDashboard();
        this._loadGlobalList();
        this._calcTotalIncome();
        this._calcTotalExpense();
        this._calcTotalBudget();
        this._calcPercentage(this.#totalIncome, this.#totalExpense);
        // _showCurrentTime();
        this._showCurrentDate();


        // Event listeners
        navDashboard.addEventListener('click', this._openDashboard);

        navIncome.addEventListener('click', this._openIncome);

        navExpense.addEventListener('click', this._openExpense);

        popup.addEventListener('click' , this._closePopup.bind());


        addIncomeButton.addEventListener('click', function (){
            activePopup = 'income';
        })
        addIncomeButton.addEventListener('click', this._openPopup);

        addExpenseButton.addEventListener('click', function (){
            activePopup = 'expense';
        });
        addExpenseButton.addEventListener('click', this._openPopup);

        transSubmit.addEventListener('click', this._addToList.bind(this));

    }

    _getDate(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();

        this.#date = `${day}/${month}/${year}`;
    }

    _getTransID(){
        let lengtList = this.#globalList.length;
        this.#nextTransID = lengtList++;
    }

    _addToList(){
        console.log('test')


        // create new transaction
        this._newTransaction();

        // update the global balance


        // update the the side that was used to upload
        if (activePopup === 'income'){
            this._calcTotalIncome();
        }
        if (activePopup === 'expense'){
            this._calcTotalExpense();
        }

    }

    _openDashboard(){
        dashboardSection.forEach(item => {
            item.classList.remove('hide');
        });
        incomeSection.forEach(item =>{
            item.classList.add('hide');
        });
        expenseSection.forEach(item =>{
            item.classList.add('hide');
        });
    }

    _openIncome(){
        dashboardSection.forEach(item => {
            item.classList.add('hide');
        });
        incomeSection.forEach(item =>{
            item.classList.remove('hide');
        });
        expenseSection.forEach(item =>{
            item.classList.add('hide');
        });
    }

    _openExpense(){
        dashboardSection.forEach(item => {
            item.classList.add('hide');
        });
        incomeSection.forEach(item =>{
            item.classList.add('hide');
        });
        expenseSection.forEach(item =>{
            item.classList.remove('hide');
        });
    }

    _openPopup(e){
        e.preventDefault();
        popup.classList.remove('hide');
        if (activePopup === 'income'){
            popupClose.classList.add('popup__close--income');
            popupTitle.classList.add('popup__title--income');
            popupDescription.classList.add('popup__form--description__income');
            popupValue.classList.add('popup__form--value__income');
            popupValuta.classList.add('popup__form--valuta__income');
            popupSubmit.classList.add('popup__form--submit__income');
        }
        if (activePopup === 'expense'){
            popupClose.classList.add('popup__close--expense');
            popupTitle.classList.add('popup__title--expense');
            popupDescription.classList.add('popup__form--description__expense');
            popupValue.classList.add('popup__form--value__expense');
            popupValuta.classList.add('popup__form--valuta__expense');
            popupSubmit.classList.add('popup__form--submit__expense');
        }
    }
    _emptyPopupFields(){

    }
    _closePopup(e){
        e.preventDefault();
        // console.log(e.target);
        // hide popup when clicked on the close button
        if (e.target.classList.contains('popup__close')){
            popup.classList.add('hide');
            activePopup = undefined;
        }
        // hide popup when clicked out of the box
        if (e.target.classList.contains('popup')){
            popup.classList.add('hide');
            activePopup = undefined;
        }

    }

    _loadGlobalList(){

    }

    _loadIncomeList(){

    }
    _loadExpenseList(){

    }
    _calcTotalIncome(){
        let totalIncome = 0;
        this.#incomeList.forEach(income => {
            totalIncome += income.value;
        });
        console.log(`total income = ${totalIncome}`);
        totalIncomeValue.value = this.#totalIncome;
    }
    _calcTotalExpense(){



    }
    _calcPercentage(totalIncome, totalExpense){

    }
    _showCurrentDate(){

    }



    _newTransaction(){
        let transaction;


        // checken of de description een string is zonder tekens
        const validDescription = (desc) =>{
            const check = /^[0-9a-zA-Z]+$/;
            if (!check.value.match(check)){
                return false;
            }
            return true;
        }
        // checken of de value een nummer is en of het groter is of 0
        const validValue = (val) => {
            if (val > 0){
                return true;
            }
        }

        // check if there is something in fields
        if (popupDescription.value === ''){
            alert('Description cannot be empty');
            return;
        }
        if (popupValue.value === ''){
            alert('Value cannot be empty');
            return;
        }


        // get value from fields
        if (activePopup === 'income'){
            const incomeDescription = document.querySelector('.popup__form--description__income');
            const incomeValue = document.querySelector('.popup__form--value__income');
            const incomeCurrency = document.querySelector('.popup__form--valuta__income');

            // Get information out of the input fields -> popup
            const description = incomeDescription.value;
            const value = parseInt(incomeValue.value);
            const currency = incomeCurrency.value;


            console.log(`${description} ${value} ${currency}`);

            // aanmaken van object
            transaction = new Transaction(description, value, currency, this.#date);

            // console.log(this.#incomeList);

            // object toevoegen in income lijst
            this.#incomeList.push(transaction);
            this.#globalList.push(transaction);

            console.log(this.#incomeList);

            // generate HTML
            this._loadIncomeList();



            // console.log('test');


        }

        if(activePopup === 'expense'){
            const expenseDescription = document.querySelector('.popup__form--description__expense');
            const expenseValue = document.querySelector('.popup__form--value__expense');
            const expenseCurrency = document.querySelector('.popup__form--valuta__expense');

            // Get information out of the input fields -> popup
            const description = expenseDescription.value;
            const value = expenseValue.value;
            const currency = expenseCurrency.value;


            console.log(`${description} ${value} ${currency}`);

            // aanmaken van object
            transaction = new Transaction(description, value, currency, this.#date);
            // object toevoegen in expense lijst
            this.#expenseList.push(transaction);
            this.#globalList.push(transaction);
        }

        this._renderTransaction(transaction);
        // this._hidePopup(activePopup);

        // reset form fields
        popupDescription.value = '';
        popupValue.value = '';



    }

    _renderTransaction(transaction){

        const income = 'green';
        const expense = 'red';







        let html = `
        <li class="list__item list__item--${ activePopup === 'income' ? income : expense}">
                                <div class="list__item--top">
                                    <div class="list__item--top__price">
                                    <span class="list__item--top__price--number">
                                        ${transaction.value}
                                    </span>
                                        <span class="list__item--top__price--valuta">
                                        ${transaction.currency}
                                    </span>
                                    </div>
                                    <div class="list__item--top__date">
                                        ${transaction.date}
                                    </div>
                                </div>
                                <div class="list__item--bottom">
                                    <div class="list__item--bottom__description">
                                        ${transaction.description}
                                    </div>
                                </div>
                            </li>
        `;

        if (activePopup === 'income'){
            incomeList.insertAdjacentHTML('afterbegin', html);
            globalList.insertAdjacentHTML('afterbegin', html);
        }
        if (activePopup === 'expense'){
            expenseList.insertAdjacentHTML('afterbegin', html);
            globalList.insertAdjacentHTML('afterbegin', html);
        }


    }




    _hidePopup(popup){
        if (popup === 'income'){
            incomePopup.classList.toggle('hide');
        }
        if (popup === 'expense'){
            expensePopup.classList.toggle('hide');
        }
    }
    _calcTotalBudget(){

    }



}



const app = new App();















