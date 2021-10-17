const btnSend = document.querySelector('.btn-send');

const stage = document.getElementById('stage').value;

const bot = parseInt(document.getElementById('bot').value);

const userNumber = document.getElementById('userNumber').value;

const text = document.getElementsByClassName('text-response')[0]

btnSend.addEventListener("click", function (e) {
    e.preventDefault();

    sendData()

});

function sendData(){
    const response = fetch('https://naturasessao.herokuapp.com/reset', {
        method: 'POST',
        body: {
            stage,
            bot,
            userNumber
        }
    }).then(
        text.removeAttribute('hidden')
    ).catch(
        text.removeAttribute('hidden')
    );
}
