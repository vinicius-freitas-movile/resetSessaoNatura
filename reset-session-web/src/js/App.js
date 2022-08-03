import 'dotenv/config';
import '../css/App.css';
import LogoSinch from '../img/LogoSinch.png';
import IconHome from '../img/iconHome.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

function App() {
  //ta quebrando essa bgaça ver o pq não está alterando o estado do check
  const [stage, setStage] = useState('DRAFT');
  const [bot, setBot] = useState('3052');
  const [userNumber, setUserNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isNaN(Number(userNumber))) {
      deleteSession();
    }
  }

  const showToast = (isSuccess) => {

    if (isSuccess) {
      toast.success("Sessão resetada com sucesso!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error("Eror ao resetar a Sessão!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

  }

  const deleteSession = async () => {
    const url = "https://w5gkxfoh18.execute-api.us-east-2.amazonaws.com/development/resetSession";

    const data = {
      stage,
      bot: Number(bot),
      userNumber
    };

    const header = {
      'x-api-key': '47uJpJdRyu3wuHSJLamZkyM80FhZKKAalXX28WD2'
    };

    try {
      await axios.post(url, data,
        {
          header
        });

      showToast(true);

    } catch (e) {
      console.error('error', JSON.stringify(e));
      showToast(false);
    }
  }

  return (
    <div className="app">

      <header className="top-bar">
        <div className="logo">
          <img id="logoImg" src={LogoSinch} alt="Logo Empresa Sinch"></img>
        </div>
      </header>
      <section className="bodyApp">
        <div className="sideBar">
          <div className="menu-sidebar">
            <a href="/" className="menuHome"><img src={IconHome}></img></a>
          </div>
        </div>
        <div className="bodyReset">
          <div className="headerBodyReset">
            <h1>Reset de Sessão</h1>
          </div>
          <section className="infoReset">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="headerInfoReset">
                  <p className="PBold">Ambiente</p>
                </div>
                <div className="mb-3 radioGroup">
                  <div className="row">
                    <div className="col-3">
                      <input type="radio" aria-label="DRAFT" name="radioStage" className="radioStage" value="DRAFT" onChange={(e) => { setStage(e.target.value) }} checked={stage === 'DRAFT'} />
                      <span id="spanRadio">Homologação</span>
                    </div>
                    <div className="col-3">
                      <input disabled type="radio" aria-label="LIVE" name="radioStage" className="radioStageL" value="LIVE" onChange={(e) => { setStage(e.target.value) }} checked={stage === 'LIVE'} />
                      <span id="spanRadio">Produção</span>
                    </div>
                  </div>
                </div>
                <p className="PBold">Bot</p>
                <div className="mb-3 radioGroup">
                  <div className="row">
                    <div className="col-3">
                      <input aria-label="Avon Hisp" name="radioBot" type="radio" className="radioBot" value="3242" onChange={(e) => { setBot(e.target.value) }} checked={bot === '3242'} />
                      <span id="spanRadio">Avon Hispânica</span>
                    </div>
                    <div className="col-3">
                      <input aria-label="Nat BR" name="radioBot" type="radio" className="radioBotB" value='3052' onChange={(e) => { setBot(e.target.value) }} checked={bot === '3052'} />
                      <span id="spanRadio">Natura Brasil</span>
                    </div>
                    <div className="col-3">
                      <input aria-label="Nat Latam" name="radioBot" type="radio" className="radioBot" value='3859' onChange={(e) => { setBot(e.target.value) }} checked={bot === '3859'} />
                      <span id="spanRadio">Natura Hispânica</span>
                    </div>
                  </div>
                </div>
                <p className="PBold">Número</p>
                <div className="footerReset">
                  <input type="text" required="required" placeholder="5511988589971" className="userNumber" onChange={(e) => { setUserNumber(e.target.value) }}></input>
                  <div className="footerButton">
                    <button className="btn btn-success" type="submit">Resetar</button>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}

export default App;
