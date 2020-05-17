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
            selected: 0,
            url:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnline = this.handleOnline.bind(this);
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
                loading: false,
                image: data.data.memes[0].url,
                selected: 0
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }
    handleSubmit(evt) {
        evt.preventDefault();
        const num = Math.floor(Math.random()*this.state.imageList.length);

        this.setState({
            image: this.state.imageList[num].url,
            selected: num 
        });
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleOnline(evt) {
        evt.preventDefault();
        const params = {};
        params['template_id'] = this.state.imageList[this.state.selected]['id'];
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
            this.setState({
                url: data.data.url
            })
        })
        .catch((err) => {
            console.error(err);
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
                    <button>Randomize!</button>
                    <button onClick={this.handleOnline}>Create Online</button>
                </form>
                )}
                <a href={this.state.url}>{this.state.url}</a>
                <div className="meme">
                    {image && <img className="meme-image" src={image} alt={this.state.imageList[this.state.selected]['name']} />}
                    <h2 className="topText">{topText}</h2>
                    <h2 className="bottomText">{bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;