import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getScenes } from '../actions';
import { getSocket } from '../socket';



class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this.getScenes = this.getScenes.bind(this);
        this.showModal = this.showModal.bind(this);
        this.chooseScene = this.chooseScene.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    getScenes() {
        this.props.dispatch(getScenes(this.search.value));
    }

    showModal(e) {
        this.setState({
            scene: e.target.src
        });
        document.getElementById("scene-modal").classList.add("shown");
    }

    closeModal() {
        this.setState({
            scene: null
        });
        document.getElementById("scene-modal").classList.remove("shown");
    }

    chooseScene() {
        console.log('click on choose scene');
        getSocket().emit('chooseScene', this.state.scene);
    }


    render() {

        const { scenes } = this.props;

        return (
            <div id="outer-wrapper">

                <div id="scene-modal">
                    <div id="preview">
                        <div id="filmroll-top">
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>

                        </div>
                        <div className="player-outside">
                            <img className="img-preview" src={this.state.scene} />
                        </div>
                        <div id="filmroll-btm">
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>
                            <div className="perforations"></div>

                        </div>
                        <div id="scene-modal-menu">
                            Choose this scene?
                            <div className="buttons-box">
                                <button
                                    className="scene-btn"
                                    onClick={this.chooseScene}
                                ><i className="fas fa-check-circle"></i></button>
                                <button
                                    className="scene-btn"
                                    onClick={this.closeModal}
                                ><i className="fas fa-times-circle"></i></button>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="search-wrapper">

                    <div id="search-bar">
                        <input
                            id="search-input"
                            type="text"
                            onSubmit={this.getScenes}
                            ref={search => (this.search = search)}
                            placeholder="Search movie scene"
                        />
                        <button
                            id="search-btn"
                            onClick={this.getScenes}
                        >
                            submit
                        </button>
                    </div>

                    <div id="search-results">
                        {scenes && scenes.map(item => (
                            <div key={item.link}>
                                <img
                                    className="result-img"
                                    src={item.link}
                                    onClick={this.showModal}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        scenes: state.scenes
    };
};


export default connect(mapStateToProps)(Search);
