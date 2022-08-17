import 'dotenv/config';
import '../css/App.css';
import LogoSinch from '../img/LogoSinch.png';
import IconHome from '../img/iconHome.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { environmentList } from "../config/config";

function Dashboard() {
  const queryString = useLocation().search;
  const company = new URLSearchParams(queryString).get('company');
  const data = environmentList[company.toLocaleLowerCase()];

  const initEnvironment = data["DRAFT"] ? "DRAFT" : "LIVE";
  const firstBot = data[initEnvironment]["bots"][0];

  const [stage, setStage] = useState(initEnvironment);
  const [bot, setBot] = useState(firstBot);
  const [userNumber, setUserNumber] = useState('');

  const environmentRender = getEnvironmentJSX(data);
  const botsRender = getBotsJSX(stage);

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
      toast.error("Erro ao resetar a Sessão!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

  }

  const deleteSession = async () => {
    const url = "https://w5gkxfoh18.execute-api.us-east-2.amazonaws.com/development/resetSession";
    //const url = "http://0.0.0.0:3000/development/resetSession";

    const payload = {
      stage,
      bot: Number(bot),
      userNumber
    };

    const header = {
      'x-api-key': '47uJpJdRyu3wuHSJLamZkyM80FhZKKAalXX28WD2'
    };

    try {
      await axios.post(url, payload,
        {
          header
        });
      showToast(true);

    } catch (e) {
      console.error('error', JSON.stringify(e));
      showToast(false);
    }
  }

  const changeEnvironment = async (environment) => {
    setStage(environment);
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
                    {environmentRender}
                  </div>
                </div>
                <p className="PBold">Bot</p>
                <div className="mb-3 radioGroup">
                  <div className="row">
                    {botsRender}
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

  function getEnvironmentJSX(data) {
    let showDraft = false;
    let showLive = false;

    if (data) {
      if (data["DRAFT"]) showDraft = true;
      if (data["LIVE"]) showLive = true;
    }

    const environment = [];
    if (showDraft) {
      environment.push(<div className="col-3" key="hml">
        <input type="radio" aria-label="DRAFT" name="radioStageHml" className="radioStage" value="DRAFT" onChange={(e) => { changeEnvironment(e.target.value) }} checked={stage === 'DRAFT'} />
        <span id="spanRadioHml">Homologação</span>
      </div>);
    }

    if (showLive) {
      environment.push(<div className="col-3" key="prd">
        <input type="radio" aria-label="LIVE" name="radioStagePrd" className="radioStageL" value="LIVE" onChange={(e) => { changeEnvironment(e.target.value) }} checked={stage === 'LIVE'} />
        <span id="spanRadioPrd">Produção</span>
      </div>);
    }

    return environment;
  }

  function getBotsJSX(stage) {
    const { bots } = data[stage];
    const render = [];
    let pos = 0;

    if (bots) {
      for (const botItem of bots) {
        const { value, text } = botItem;
        render.push(<div className="col-3" key={pos}>
          <input aria-label="Avon Hisp" name="radioBot" type="radio" className="radioBot" value={value} onChange={(e) => { setBot(e.target.value) }} />
          <span id="spanRadio">{text}</span>
        </div>);
        pos++;
      }
    }

    return render;
  }


}

export default Dashboard;
