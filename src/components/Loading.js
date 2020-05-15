import React from 'react';

class Loading extends React.Component {
    constructor() {
        super();
        this.state = {
            periods: 0
        }
    }

    timer = () => {
        this.setState((prev) => ({
            periods: (prev.periods + 1)%3
        }))
    }

    componentDidMount() {
        this.setState({
            intervalId: setInterval(this.timer,500)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <h2>Loading{".".repeat(this.state.periods)}</h2>
        )
    }
}

export default Loading;