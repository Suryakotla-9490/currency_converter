const apiKey = 'e22f1d0085d315c53a072d5e'; // Replace with your Fixer API key
const apiUrl = `https://open.er-api.com/v6/latest`;

document.addEventListener('DOMContentLoaded', () => {
    initializeCurrencies();
});

async function initializeCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option.cloneNode(true));
            toCurrencySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    try {
        const response = await fetch(`${apiUrl}?symbols=${toCurrency}&base=${fromCurrency}`);
        const data = await response.json();

        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}
