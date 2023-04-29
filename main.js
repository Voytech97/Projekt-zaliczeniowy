// definiowanie zmiennych
let depart = document.getElementById('departList');
let destination = document.getElementById('destinationList');
let chosen = document.querySelector('.chosen');
let callendar = document.getElementById('callendar');
let passengers = document.getElementById('passengers');
let departMobile = document.getElementById('departListMobile');
let destinationMobile = document.getElementById('destinationListMobile');
let callendarMobile = document.getElementById('callendarMobile');
let passengersMobile = document.getElementById('passengersMobile');
let seatSelect = document.querySelector('.planebg');
let pickSeat = document.querySelector('.pickSeat');
let buyTicket = document.querySelector('.buyTicket');
let clearArray= document.querySelector(".clearArray");
let summaryBox = document.querySelector('.summary');
let ticket = document.querySelector('.ticket')
const price = document.getElementById('price');
const kalendarz = document.getElementById('kalendarz');
const waluty = document.getElementById('waluty');
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let finalPrice = document.getElementById('finalPrice');
const loginForm = document.querySelector('#login-form');
const message = document.querySelector('#message');


today = mm + '/' + dd + '/' + yyyy;
// kupowanie biletu
let seats = [];
pickSeat.addEventListener('click',chooseSeat);
buyTicket.addEventListener('click',summary);
clearArray.addEventListener('click', arrayClear);
chosen.innerHTML = "Dziś jest "+ today;
function chooseSeat(){
    if(depart.value == '' || destination.value == '' || callendar.value == '' || passengers.value == ''){
        alert('Brak wszystkich danych')
    }
    else{
    document.querySelector('.planebg').style.display = 'block';
}
}
// wybieranie miejsc w samolocie
function chooseSeatMobile(){
    if(departMobile.value == '' || destinationMobile.value == '' || callendarMobile.value == '' || passengersMobile.value == ''){
        alert('Brak wszystkich danych')
    }
    else{
    document.querySelector('.planebg').style.display = 'block';
}
}

function arrayClear(){
    seats = [];
}

// Podsumowanie

function summary(){
    if (seats.length!= passengers.value){
        alert('Zła ilość wybranych miejsc');
    } else {
    console.log('Wybrane miejsca to ' + seats);
    document.querySelector('.planebg').style.display = 'none';
    summaryBox.style.display = 'block';
    ticket.innerHTML = "Kupiłeś bilet na lot z "+depart.value+" do "+destination.value+" dnia "+callendar.value+" dla pasażerów w ilości "+passengers.value+'\n'+'Wykupione miejsca to '+seats;
}
}
// Kurs Walut
function getDollar(){
fetch('https://api.nbp.pl/api/exchangerates/rates/c/'+waluty.value+'/'+kalendarz.value+'/?format=json')
.then( (res)=>{ 
    if(res.ok) return res.json(); 
    else price.innerHTML='Brak kursów z dnia '+kalendarz.value})
.then( res => price.innerHTML = (`Ostateczna cena za bilet wyniesie  ${res.rates[0].ask*300*seats.length} ${res.code}`))
console.log(kalendarz.value)
}

kalendarz.addEventListener('change', getDollar);
waluty.addEventListener('change', getDollar);


// Formularz logowania
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                message.textContent = 'Zalogowano!';
            } else {
                message.textContent = 'Nieprawidłowa nazwa użytkownika lub hasło.';
            }
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
            message.textContent = 'Wystąpił błąd. Spróbuj ponownie później.';
        });
});