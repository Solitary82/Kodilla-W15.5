var GIPHY_API_URL = 'https://api.giphy.com',
GIPHY_PUB_KEY = 'SiUYHcNVWDuMlmh797PNE3dejZIAOfOq';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGifPromise: function(searchingText) {
        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest(); 
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data; 

                    var gif = { 
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif)
                } else {reject(new Error(this.statusText));}
            };
            xhr.open('GET', url + searchingText);
            xhr.send();
        });
    },

    handleSearch: function(searchingText) {                     // 1
        this.setState({
            loading: true                                       // 2
        });
        this.getGifPromise(searchingText).then(function(gif) {              // 3
            this.setState({                                     // 4
                loading: false,                                 // a
                gif: gif,                                       // b
                searchingText: searchingText                    // c
            });
        }.bind(this));
    },

    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
            <h1>Wyszukiwarka GIFow!</h1>
            <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search onSearch={this.handleSearch}/>
           
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
            
          </div>
        );
    }
});
