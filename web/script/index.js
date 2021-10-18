const btnSend = document.querySelector('.btn-send');
const text = document.getElementsByClassName('text-response')[0]


btnSend.addEventListener("click", async function (e) {
    e.preventDefault();


    const stage = document.getElementById('stage').value;

    const bot = parseInt(document.getElementById('bot').value);

    const userNumber = document.getElementsByClassName('userNumber')[0].value;

    await sendData(stage, bot, userNumber)

});

async function sendData(stage, bot, userNumber) {
   
    axios.post('http://localhost:3333/reset', {
        stage,
        bot,
        userNumber
    }).then(res => {
        console.log(res)
    });

}
