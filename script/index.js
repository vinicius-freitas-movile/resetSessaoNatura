const btnSend = document.querySelector('.btn-send');
const tagResponseOk = document.getElementsByClassName('text-response')[0]
const tagResponseNo = document.getElementsByClassName('text-Nresponse')[0]


btnSend.addEventListener("click", async function (e) {
    e.preventDefault();


    const stage = document.getElementById('stage').value;

    const bot = parseInt(document.getElementById('bot').value);

    const userNumber = document.getElementsByClassName('userNumber')[0].value;

    await sendData(stage, bot, userNumber)

});

async function sendData(stage, bot, userNumber) {
   
    axios.post('https://naturasessao.herokuapp.com/reset', {
        stage,
        bot,
        userNumber
    }).then(res => {
        tagResponseNo.setAttribute('hidden')
        tagResponseOk.removeAttribute('hidden');
    }).catch(e => {
        tagResponseOk.setAttribute('hidden')
        tagResponseNo.removeAttribute('hidden');
    });

}
