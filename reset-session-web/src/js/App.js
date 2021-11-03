import '../css/App.css';
import LogoSinch from '../img/LogoSinch.png';
import IconHome from '../img/iconHome.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { InputGroup, Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa';
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

      showToast();
    }
  }

  const showToast = () => {
    toast.success("Sessão resetada com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  const deleteSession = async () => {
    await axios.post('https://naturasessao.herokuapp.com/reset', {
      stage,
      bot: Number(bot),
      userNumber
    });
  }

  const renderTooltip = () => (
    <Tooltip id="button-tooltip" className="tooltipText">
      <p>
        Formato aceito:<br />
        DDI + DDD + Numero<br />
        Ex: 5561991234567<br />
        Não utilizar traços ou espaços
      </p>
    </Tooltip>
  );

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
                <InputGroup className="mb-3 radioGroup">
                  <InputGroup.Radio aria-label="DRAFT" name="radioStage" className="radioStage" id="radioHomol dev" value="DRAFT" onChange={(e) => { setStage(e.target.value) }} checked={stage === 'DRAFT'} label="teste"/>
                  <InputGroup.Text id="radioHomol">Homologação</InputGroup.Text>
                  <InputGroup.Radio aria-label="LIVE" name="radioStage" className="radioStage" id="radioHomol dev" value="LIVE" onChange={(e) => { setStage(e.target.value) }} checked={stage === 'LIVE'} />
                  <InputGroup.Text id="radioHomol">Produção</InputGroup.Text>
                </InputGroup>
                <p className="PBold">Bot</p>
                <InputGroup className="mb-3 radioGroup">
                  <input type="radio" aria-label="Avon Hisp"  name="radioBot" value='3242' id=" radioHomoldev" onChange={(e) => { setBot(e.target.value) }} checked={bot === '3242'} />
                  <InputGroup.Radio aria-label="Avon Hisp"  name="radioBot" value='3242' id=" radioHomoldev" onChange={(e) => { setBot(e.target.value) }} checked={bot === '3242'} />
                  <InputGroup.Text id="radioHomol">Avon Hispânica</InputGroup.Text>
                  <InputGroup.Radio aria-label="Nat BR" name="radioBot" value='3052' id=" radioHomol dev" onChange={(e) => { setBot(e.target.value) }} checked={bot === '3052'} />
                  <InputGroup.Text>Natura Brasil</InputGroup.Text>
                  <InputGroup.Radio aria-label="Nat Latam" name="radioBot" value='3859' id="dev" onChange={(e) => { setBot(e.target.value) }} checked={bot === '3859'} />
                  <InputGroup.Text>Natura Hispânica</InputGroup.Text>
                </InputGroup>
                <p className="PBold">Número</p>
                <div className="footerReset">
                  <input type="text" required="required" placeholder="5511988589971" className="userNumber" onChange={(e) => { setUserNumber(e.target.value) }}></input>
                  <div className="footerButton">
                    <button className="buttonReset" className="btn btn-success" type="submit">Resetar</button>
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
