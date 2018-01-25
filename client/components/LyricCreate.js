import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

 class LyricCreate extends Component {
    constructor(props){
        super(props);

        this.state ={
            content: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        
        this.props.mutate({
            variables:{
                content: this.state.content,
                songId: this.props.songId
            },
        })//.then(() => this.setState({content: ''}));
        //above can add a promise to happen after the mutation to clear the state after submitting a lyric
        // it can take a second to complete so instead could have the setState seperate which will update the state instantly
        this.setState({content: ''})
        
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Add a Lyric</label>
                <input
                 value= {this.state.content} 
                 onChange={event => this.setState({content: event.target.value})}
                 />
            </form>
        );
    }
}

const mutation = gql `
    mutation AddLyric($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
        id
        lyrics {
            id
            content
            likes
        }
        }
    }
`;

export default graphql(mutation)(LyricCreate);

