import React, { Component } from 'react';

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {inputbox: '', a: 1, b: 2, c: '+', answer: '', numberFrom: 1, numberTo: 10, o: 1};
  }

  componentDidMount() {
    this.generateNumbers();
  }

  generateAB() {
    return [
      randomIntFromInterval(this.state.numberFrom,this.state.numberTo),
      randomIntFromInterval(this.state.numberFrom,this.state.numberTo)
    ]
  }

  generateNumbers() {
    var [a, b] = this.generateAB();
    var c = randomIntFromInterval(1,2);
    if (this.state.o === 1) {
      if (c === 1) {
        console.log('Addition');
        // Addition
        // Upper bound of addition
        while ( (a+b) > this.state.numberTo ) {
          [a, b] = this.generateAB();
        }
        this.setState({a: a, b: b, c: '+'});
      } else {
        console.log('Subtraction');
        // Subtraction
        // Big to small
        if (a > b) {
          this.setState({a: a, b: b, c: '-'});
        } else {
          this.setState({a: b, b: a, c: '-'});
        }
      }
    } else {
      if (c === 1) {
        console.log('Multiplication');
        // Multiplication
        this.setState({a: a, b: b, c: '*'});
      } else {
        console.log('Division');
        // Division
        var d = a * b;
        this.setState({a: d, b: b, c: '/'});
      }
    }
  }

  handleClick(e) {
    var v;
    switch (e) {
      case 'c':
        this.setState({inputbox: ''});
        break;
      case 'b':
        v = this.state.inputbox.slice(0, -1);
        this.setState({inputbox: v})
        break;
      default:
        v = this.state.inputbox + e;
        this.setState({inputbox: v});
    }
  }

  handleMath() {
    var result;
    switch (this.state.c) {
      case '+':
        if ((this.state.a+this.state.b) === Number(this.state.inputbox)) {
          result = 1;
        } else {
          result = 0
        }
        break;
      case '-':
        if ((this.state.a-this.state.b) === Number(this.state.inputbox)) {
          result = 1;
        } else {
          result = 0
        }
        break;
      case '*':
        if ((this.state.a*this.state.b) === Number(this.state.inputbox)) {
          result = 1;
        } else {
          result = 0
        }
        break;
      case '/':
        if ((this.state.a/this.state.b) === Number(this.state.inputbox)) {
          result = 1;
        } else {
          result = 0
        }
        break;
      default:
        if ((this.state.a+this.state.b) === Number(this.state.inputbox)) {
          result = 1;
        } else {
          result = 0
        }
    }
    if (result) {
      this.setState({inputbox: '', answer: 'Correct! :)'});
      this.generateNumbers();
    } else {
      this.setState({inputbox: '', answer: 'Incorrect! :('});
    }
  }

  changeOperator(e) {
    console.log('Changing operator...' + e.target.value);
    if (Number(e.target.value) === 1) {
      console.log('addsub');
      this.setState({numberFrom: 1, numberTo: 10, o: 1});
    } else {
      console.log('muldiv');
      this.setState({numberFrom: 2, numberTo: 5, o: 2});
    }
  }

  render() {
    return (
      <div>
        <main role="main" className="container">
          <h1 className="mt-5">SharkMath</h1>
          <div className="App app-container">
            <div className="app-left">
              <h1>{this.state.a} {this.state.c} {this.state.b}</h1>
            </div>
            <div className="app-right">
              <input
                id="inputbox"
                style={{textAlign: 'right'}}
                value={this.state.inputbox}
                placeholder="0"
                disabled
              />
              <p>{this.state.answer}</p>
              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td><button onClick={() => this.handleClick(1)}>1</button></td>
                      <td><button onClick={() => this.handleClick(2)}>2</button></td>
                      <td><button onClick={() => this.handleClick(3)}>3</button></td>
                    </tr>
                    <tr>
                      <td><button onClick={() => this.handleClick(4)}>4</button></td>
                      <td><button onClick={() => this.handleClick(5)}>5</button></td>
                      <td><button onClick={() => this.handleClick(6)}>6</button></td>
                    </tr>
                    <tr>
                      <td><button onClick={() => this.handleClick(7)}>7</button></td>
                      <td><button onClick={() => this.handleClick(8)}>8</button></td>
                      <td><button onClick={() => this.handleClick(9)}>9</button></td>
                    </tr>
                    <tr>
                      <td><button onClick={() => this.handleClick('c')}>X</button></td>
                      <td><button onClick={() => this.handleClick(0)}>0</button></td>
                      <td><button onClick={() => this.handleClick('b')}>\</button></td>
                    </tr>
                    <tr>
                      <td colSpan="3"><button onClick={() => this.handleMath()}>Check!</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">Numbers from:
              <input
                onChange={e => this.setState({numberFrom: Number(e.target.value)})}
                autoComplete="off"
                value={this.state.numberFrom}
              /> to:
              <input
                onChange={e => this.setState({numberTo: Number(e.target.value)})}
                autoComplete="off"
                value={this.state.numberTo}
              />
              <select id="operator" onChange={e => this.changeOperator(e)}>
                <option value="1">Addition / Subtraction</option>
                <option value="2">Multiplication / Division</option>
              </select>
              <button onClick={() => this.generateNumbers()}>Start!</button>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
