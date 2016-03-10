import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import zoomer_png from './zoomer.png';
import clear_png from './clear.png';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

let modulNames = [];
modulNames.push({modulName: 'Adresář', agendaName: 'Adresář firem', funcNames: ['Založit novou firmu']});
modulNames.push({modulName: 'Adresář', agendaName: 'Adresář osob', funcName: ['Založit novou firmu osobu']});
modulNames.push({modulName: 'Adresář', agendaName: 'Provozovny', funcName: ['Založit novou provozovnu']});
modulNames.push({modulName: 'Adresář', agendaName: 'Bankovní účty firem', funcName: []});
modulNames.push({modulName: 'Adresář', agendaName: 'Kontakty', funcName: []});
//
modulNames.push({modulName: 'Banka', agendaName: 'Žádosti platebních příkazů', funcName: ['Nová žádost o příkaz']});
modulNames.push({modulName: 'Banka', agendaName: 'Platební příkazy', funcName: ['Nový platební příkaz']});
modulNames.push({modulName: 'Banka', agendaName: 'Opakované platby', funcName: ['Nová opak.platba']});
modulNames.push({modulName: 'Banka', agendaName: 'Bankovní výpisy', funcName: ['Nový bank.výpis']});
modulNames.push({modulName: 'Banka', agendaName: 'Trvalé příkazy', funcName: []});
//
modulNames.push({modulName: 'Prodej', agendaName: 'Nabídky vydané', funcName: ['Nová vydaná nabídka']});
modulNames.push({modulName: 'Prodej', agendaName: 'Objednávky přijaté', funcName: ['Nová objednávka vydaná']});
modulNames.push({modulName: 'Prodej', agendaName: 'Pohyby objed.přijatých', funcName: []});
modulNames.push({modulName: 'Prodej', agendaName: 'Pohyby rezervací', funcName: []});
modulNames.push({modulName: 'Prodej', agendaName: 'Prodejní reporty', funcName: []});
//
modulNames.push({modulName: 'Nákup', agendaName: 'Poptávky', funcName: ['Nová poptávka']});
modulNames.push({modulName: 'Nákup', agendaName: 'Objednávky vydané', funcName: ['Nová objednávka vydaná']});
modulNames.push({modulName: 'Nákup', agendaName: 'Požadavky na objednání', funcName: ['Nový požadavek']});
modulNames.push({modulName: 'Nákup', agendaName: 'Dodavatelské ceníky', funcName: ['Nový dodavatelský ceník']});
modulNames.push({modulName: 'Nákup', agendaName: 'Pohyby objed.vydaných', funcName: []});
modulNames.push({modulName: 'Nákup', agendaName: 'Průvodce objednáváním', funcName: []});
//
modulNames.push({modulName: 'Účetnictví', agendaName: 'Účetní žádosti', funcName: []});
modulNames.push({modulName: 'Účetnictví', agendaName: 'Účetní deník', funcName: []});
modulNames.push({modulName: 'Účetnictví', agendaName: 'Hlavní kniha', funcName: []});
modulNames.push({modulName: 'Účetnictví', agendaName: 'Saldokonto', funcName: []});
modulNames.push({modulName: 'Účetnictví', agendaName: 'Saldokonto dle zakázek', funcName: []});
modulNames.push({modulName: 'Účetnictví', agendaName: 'Účetní reporty', funcName: []});
modulNames.push({modulName: 'Účetnictví', agendaName: 'Účetní výkazy', funcName: []});
//
modulNames.push({modulName: 'Pokladna', agendaName: 'Pokladní příjmy', funcName: ['Nový pokladní příjem']});
modulNames.push({modulName: 'Pokladna', agendaName: 'Pokladní výdaje', funcName: []});
modulNames.push({modulName: 'Pokladna', agendaName: 'Vrácení pokladních příjmů', funcName: []});
modulNames.push({modulName: 'Pokladna', agendaName: 'Vrácení pokladních výdajů', funcName: []});
modulNames.push({modulName: 'Pokladna', agendaName: 'Uzávěrka pokladen', funcName: []});
modulNames.push({modulName: 'Pokladna', agendaName: 'Pokladní reporty', funcName: []});
modulNames.push({modulName: 'Pokladna', agendaName: 'Pokladny', funcName: []});

////////////////////////////////////////////////////////////////////////////////////////////////////

function getModulesStructure(modArr) {
  let mResult = [];
  for (let i = 0; i < modulNames.length; i++) {
    let mExists = false;
    for (let j = 0; j < mResult.length; j++) {
      if (modulNames[i].modulName === mResult[j].modulName) {
        mResult[j].agendas.push(modulNames[i].agendaName);
        mExists = true;
        break;
      }
    }
    if (!mExists) {
      mResult.push({modulName: modulNames[i].modulName, agendas: [modulNames[i].agendaName]})
    }
  }
  return mResult;
}

export default class AppSelector extends React.Component {

  constructor() {
    super();
    this.state = {sWhoIsSelected: ''};
  }

  render() {
    // pick the unique module names
    let mModulesDecription = getModulesStructure(modulNames);
    let mLeft;
    let mTop;
    let mRadius;
    let mClearButtDisp = (this.state.sWhoIsSelected==='' ? 'none' : 'inline');
    return (
      <div style={{height:'800px', width: '100%', backgroundColor: '#000020', textAlign: 'center',
                   borderRadius: '50px'}}>
        <input id="searchBox" type="text" style={{position: 'absolute', left: '600px', top: '390px'}}/>
        <img src={zoomer_png} style={{position: 'absolute', left: '926px', top: '393px', width: '26px'}}/>
        <img src={clear_png} style={{position: 'absolute', left: '956px', top: '393px', width: '26px',
             display: mClearButtDisp}} onClick={this.clearSelection.bind(this)}/>

        <div>
          {mModulesDecription.map( (mod, ix) => {
            mRadius = (this.state.sWhoIsSelected === '' ? 250 : 800);
            mLeft = (Math.cos(ix / mModulesDecription.length * 2*Math.PI) * 2*mRadius + 700) + 'px';
            mTop = (Math.sin(ix / mModulesDecription.length * 2*Math.PI) * mRadius + 400 ) + 'px';
            return (
              <ModuleCloud  key={ix} module={mod} PosLeft={mLeft} PosTop={mTop}
                            selected={this.state.sWhoIsSelected} onSelection={this.selectionCallBack.bind(this)} />
            )
            }
          )}
        </div>
      </div>
    )
  }

  selectionCallBack(aName) {
    this.setState({sWhoIsSelected: aName});
  }

  clearSelection(sender) {
    this.setState({sWhoIsSelected: ''});
    document.getElementById('searchBox').value = '';
  }

}

export default class ModuleCloud extends React.Component {

  render() {
    let mImSelected = (this.props.selected === this.props.module.modulName);
    let mCenterLeft;
    let mCenterTop;
    let mAlign;
    if (!mImSelected) {
      mCenterLeft = this.props.PosLeft;
      mCenterTop = this.props.PosTop;
      mAlign = 'center';
    } else {
      mCenterLeft = '600px';
      mCenterTop = '390px';
      mAlign = 'left';
    }
    let mAgendaLeft;
    let mAgendaTop;
    let mAgendaWidth;
    return(
      <div className="cloud"
           style={{width: '150px', padding: '2px', position:'absolute', left: mCenterLeft, top: mCenterTop}}>
        <div className="moduleNode" onClick={this.onClickTheModule.bind(this)}>
          {this.props.module.modulName}
        </div>
        <div>
          {this.props.module.agendas.map( (agenda, ix) => {
            if (!mImSelected) {
              mAgendaLeft = (Math.cos(ix / this.props.module.agendas.length * 2*Math.PI) * 150) + 'px';
              mAgendaTop = (Math.sin(ix / this.props.module.agendas.length * 2*Math.PI) * 100) + 'px';
              mAgendaWidth = '140px';
            } else {
              mAgendaLeft = '0px';
              mAgendaTop = (28*ix+32)+'px';
              mAgendaWidth = '300px';
            }
            return (
              <div key={ix} className="agendaNode" style={{position:'absolute', left: mAgendaLeft, top: mAgendaTop,
                   width: mAgendaWidth, textAlign: mAlign}}>
                {agenda}
              </div>


            )
        })}
        </div>
      </div>
    )
  }

  onClickTheModule(e) {
    this.props.onSelection(this.props.module.modulName);
    // prenes jmeno kliknuteho modulu do searchboxu
    let mModuleSelected = e.target.innerText;
    let input = document.getElementById('searchBox');
    input.value = mModuleSelected;
  }
}

let app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<AppSelector/>, app);




/*
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
      var items = this.state.items.map(function (item, i) {
        return (
          <div key={item} onClick={this.handleRemove.bind(this, i)}>
            {item}
          </div>
        );
      }.bind(this));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="pokus" transitionEnterTimeout={1000}
                                 transitionLeaveTimeout={700}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );

  }
});


let app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<TodoList/>, app);
*/



