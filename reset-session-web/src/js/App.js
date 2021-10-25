import '../css/App.css';
import LogoSinch from '../img/LogoSinch.png';
import IconHome from '../img/iconHome.png';
import { InputGroup, Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
 //ta quebrando essa bgaça ver o pq não está alterando o estado do check
  const [stage, setStage] = useState('DRAFT');
  const [bot, setBot] = useState(3052);
  const [userNumber, setUserNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stage, bot)
  }

  const deleteSession = () => {

  }

  const changeRadioButton = (event) => {

    let data = event.target.value;
    let convertInNumber = Number(data);

    if (!isNaN(convertInNumber)) {
      setBot(bot, convertInNumber);
      console.log(bot)
    } else {
      setStage(data);
      console.log(stage)
    }
  }


  const changeBot = (event) => {

  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="tooltipText">
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
            <p>Resete a sua sessão em um de nossos bots</p>
          </div>
          <section className="infoReset">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="headerInfoReset">
                  <p className="PBold">Ambiente</p>
                  <p>Selecione entre homologação e produção</p>
                </div>
                <InputGroup className="mb-3 radioGroup">
                  <InputGroup.Radio aria-label="DRAFT" name="radioStage" id="radioHomol dev" value="DRAFT" onChange={changeRadioButton} checked={stage === 'DRAFT'} />
                  <InputGroup.Text id="radioHomol">Homologação</InputGroup.Text>
                  <InputGroup.Radio aria-label="LIVE" name="radioStage" value="LIVE" id="live" onChange={changeRadioButton} checked={stage === 'LIVE'} />
                  <InputGroup.Text>Produção</InputGroup.Text>
                </InputGroup>
                <p className="PBold">Bot</p>
                <p>Escolha um dos bots abaixo</p>
                <InputGroup className="mb-3 radioGroup">
                  <InputGroup.Radio aria-label="Avon Hisp" name="radioBot" value={3242} onChange={changeRadioButton} checked={bot === 3242} />
                  <InputGroup.Text id="radioHomol">Avon Hispânica</InputGroup.Text>
                  <InputGroup.Radio aria-label="Nat BR" name="radioBot" value={3052} onChange={changeRadioButton} checked={bot === 3052} />
                  <InputGroup.Text>Natura Brasil</InputGroup.Text>
                  <InputGroup.Radio aria-label="Nat Latam" name="radioBot" value={3859} onChange={changeRadioButton} checked={bot === 3859} />
                  <InputGroup.Text>Natura Hispânica</InputGroup.Text>
                </InputGroup>
                <p className="PBold">Número</p>
                <div>
                  <p>Número que terá a sessão resetada
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button className="tooltipButton" variant="none"><FaQuestionCircle className="IconTooltip" /></Button>
                    </OverlayTrigger>
                  </p>
                </div>
                <div className="footerReset">
                  <input type="text" placeholder="5511988589971" className="userNumber"></input>
                  <div className="footerButton">
                    <Button className="buttonReset" variant="success" type="submit">Resetar</Button>
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
