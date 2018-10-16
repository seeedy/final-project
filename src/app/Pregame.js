import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import Round from './Round';
import Transition from './Transition';

class Pregame extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            stage: 'pregame'
        };

        this.toggleReady = this.toggleReady.bind(this);
        this.setPlayerName = this.setPlayerName.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.stage && props.stage != state.stage) {
            return {
                stage: props.stage,
            };
        }
        return state;
    }


    setPlayerName(e) {
        if (e.keyCode === 13) {
            console.log(e.target.value);
            getSocket().emit('setPlayerName', e.target.value);
            this.btn.classList.remove("hidden");
            this.input.classList.add("hidden");
        }
    }


    toggleReady() {
        console.log('emitting ready to server');
        getSocket().emit('toggleReady');
        this.btn.classList.add("hidden");
        this.ready.classList.remove("hidden");
    }

    render() {

        const { onlinePlayers } = this.props;
        const { self } = this.props;

        if (!onlinePlayers) {
            return null;
        }

        if (!self) {
            return null;
        }

        const otherPlayers = onlinePlayers.filter(player => player.userId != self.userId);

        if (this.state.stage == 'pregame') {
            return(
                <div id="pregame-wrapper">
                    <h1>Scene it?</h1>
                    <div id="online-players">


                        <div className="player-wrapper">
                            <div id="filmroll-top">
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                            </div>
                            <div className="player-outside">
                                <div className="self-player">

                                    <div className="self-name">{self.name}</div>

                                    <div className={`ready hidden`}
                                        ref={ready => this.ready = ready}>
                                        <p>I&apos;M READY!</p>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        onKeyDown={this.setPlayerName}
                                        ref={input => this.input = input}
                                        id="name-input"
                                    />

                                    <button
                                        className={`rdy-btn hidden`}
                                        onClick={this.toggleReady}
                                        ref={btn => this.btn = btn}
                                    >Ready</button>
                                </div>
                            </div>
                            <div id="filmroll-btm">
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                                <div className="perforations"></div>
                            </div>
                        </div>

                        {otherPlayers.map(player => (
                            <div className="player-wrapper" key={player.userId}>
                                <div id="filmroll-top">
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                </div>
                                <div className="player-outside">

                                    <div className="other-player">
                                        {player.name || 'Player joined'}

                                        <div className="ready">
                                            {player.ready && <p>READY!</p>}
                                        </div>
                                    </div>
                                </div>

                                <div id="filmroll-btm">
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                    <div className="perforations"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (this.state.stage == 'round') {
            return (<Round />);
        }

        if (this.state.stage == 'transition') {
            return (<Transition />);
        }


    }

}



const mapStateToProps = state => {
    return {
        onlinePlayers: state.onlinePlayers,
        self: state.self,
        stage: state.stage
    };
};


export default connect(mapStateToProps)(Pregame);
