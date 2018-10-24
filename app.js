document.getElementById('loan-form').addEventListener('submit', function(e){

	//hide result

	document.getElementById('result').style.display = 'none';


	//show loader
	document.getElementById('loader').style.display = 'block';

	setTimeout(getResult, 1000)

	e.preventDefault();
});


function getResult(){

	const loanAmount = document.getElementById('amount').value;
	const loanInterest = document.getElementById('interest').value;
	const loanYear = document.getElementById('year-to-pay').value;
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payement');
	const totalInterest = document.getElementById('total-interest');


	const principal = parseFloat(loanAmount);
	const calculateInterest = parseFloat(loanInterest) / 100 / 12;
	const calculatePayment = parseFloat(loanYear) * 12;


	const x = Math.pow(1 + calculateInterest, calculatePayment);

	const monthly  = (principal * x * calculateInterest) / (x - 1)

	if(isFinite(monthly)){

		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatePayment).toFixed(2);
		totalInterest.value = ((monthly * calculatePayment) - principal).toFixed(2);


		//show result and loader
		document.getElementById('result').style.display = 'block';
		document.getElementById('loader').style.display = 'none';
	}else{

		error('please check your numbers');
	}

	

}

function error(error){
	document.getElementById('result').style.display = 'none';
		document.getElementById('loader').style.display = 'none';

	const errorDiv = document.createElement('div');
	errorDiv.className = 'alert alert-danger';

	errorDiv.appendChild(document.createTextNode(error))

	// get parent

	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	card.insertBefore(errorDiv, heading);

	//remove error in 3 second

	setTimeout(clearError, 3000);
}


function clearError(){

	document.querySelector('.alert').remove();
}

