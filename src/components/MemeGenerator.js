import React from 'react';
import Loading from './Loading';
import './MemeGenerator.scss';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            image: '',
            imageList:[],
            loading: true,
            selected: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(!data.success) throw data.error_message;
            this.setState({
                imageList: data.data.memes,
                loading: false
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }
    handleSubmit(evt) {
        evt.preventDefault();
        const num = Math.floor(Math.random()*100);
        console.log(num);
        const params = {};
        params['template_id'] = this.state.imageList[num]['id'];
        params['username'] = process.env.REACT_APP_USERNAME;
        params['password'] = process.env.REACT_APP_PASSWORD;
        params['text0'] = this.state.topText;
        params['text1'] = this.state.bottomText;
        const query = Object.entries(params).map(([key,value]) => (key + '=' + encodeURIComponent(value)))
            .join('&');
            console.log(query);
        fetch('https://api.imgflip.com/caption_image?'+query)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(!data.success) throw data.error_message;
            console.log(data);
            this.setState({
                image: data.data.url,
                loading: false,
                selected: num 
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    render() {
        const { topText,bottomText,image, loading } = this.state;

        return (
            <div>
                {loading ? <Loading /> :
                (<form onSubmit={this.handleSubmit}>
                    <label>Top Text:
                        <input
                        onChange={this.handleChange}
                        type='text'
                        placeholder='Top Text'
                        name='topText'
                        value={topText}
                        />
                    </label>
                    <label>Bottom Text:
                        <input
                        onChange={this.handleChange}
                        type='text'
                        placeholder='Bottom Text'
                        name='bottomText'
                        value={bottomText}
                        />
                    </label>
                    <button>Generate!</button>
                </form>
                )}
                {image && <img src={this.state.image} alt={this.state.imageList[this.state.selected]['name']} />}
            </div>
        );
    }
}

export default MemeGenerator;