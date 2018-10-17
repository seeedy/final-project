import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';



class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            timer: 20
        };

        this.nextRound = this.nextRound.bind(this);

        this.count;
        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        this.setState({
            scene: this.props.scene,
            searchTerm: this.props.searchTerm,
        });

        this.startTimer();
    }

    startTimer() {
        this.count = this.state.timer;
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    tick() {

        this.count--;
        this.setState({
            timer: this.count
        });

        if (this.count == 0) {
            console.log('next round');
            clearInterval(this.intervalHandle);
            getSocket().emit('nextRound');
        }
    }


    nextRound() {
        getSocket().emit('nextRound');
    }


    render() {

        const { onlinePlayers } = this.props;

        if (!onlinePlayers) {
            return <div>no players</div>;
        }

        const winner = onlinePlayers.find(player => player.wonRound === true);
        console.log(winner);



        return (
            <div id="transition-wrapper">
                {winner && <div id="winner">
                    <p>This was a scene from {this.state.searchTerm}. </p>
                    <p>{winner.name} won this round!</p>
                    <img src={this.state.scene} className="winner-img" />
                    Winning answer: {winner.guess}
                </div>}


                <h2>Scores</h2>
                <div id="score-board">
                    {onlinePlayers.map(player => (
                        <div className="player-score" key={player.userId}>
                            <p>{player.name}</p>
                            <p>{player.score}</p>
                        </div>
                    ))}
                </div>

                <button onClick={this.nextRound}>Next Round</button>
                <div>{this.state.timer}</div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        scene: state.scene,
        onlinePlayers: state.onlinePlayers,
        self: state.self,
        searchTerm: state.searchTerm
    };
};


export default connect(mapStateToProps)(Transition);
