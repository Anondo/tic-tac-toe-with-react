import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {


  render() {
    return (
      <button className="square" onClick={() =>{this.props.onClick()}}>

      {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
        turn : 1,
        squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
   const squares = this.state.squares.slice();
   const winner = isWinner(squares);
   if(winner)
      return;
   if(!squares[i])
   {
     if(this.state.turn === 1)
     {
       squares[i] = 'X';
       this.setState({turn:2});
     }
     else
     {
       squares[i] = 'O';
       this.setState({turn:1});
     }

   }

   this.setState({squares: squares});
 }


  renderSquare(i) {
    return <Square value={this.state.squares[i]}  onClick={() => {
        this.handleClick(i);
    }}/>;
  }

  render() {

    var winner = isWinner(this.state.squares);
    var draw = isDraw(this.state.squares);
    var status = "This is the match status";
    if(winner)
          status = "Winner is: " + winner;
    else if(draw)
          status = "The Match is a tie!";
    else
          status = "current Player: " + (this.state.turn === 1 ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function isWinner(squares)
{
  const winning_indexes = [
    [0  ,1 , 2],
    [3 , 4,  5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2,  5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
  ];

  for(var i = 0; i < winning_indexes.length; i++)
  {
    const [a, b, c] = winning_indexes[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;

}

function isDraw(squares)
{
  for(var i = 0;  i < squares.length; i++)
  {
    if(!squares[i])
      return false;
  }
  return true;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
