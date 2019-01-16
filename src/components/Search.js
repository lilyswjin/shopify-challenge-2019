import React, { Component } from 'react'
import Result from './Result';
import Favorite from './Favorite';

export default class Search extends Component {

    state = {
        search: "",
        results: [],
        favs: []
    }

    componentDidUpdate(prevProps, prevState) {
        let { search } = this.state;

        if (search === "" && prevState.search !== "") {
            this.setState({
                results: []
            })
        }
    }

    handleChange = ( e ) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = ( e ) => {
        e.preventDefault();
        this.getWasteData();
    }

    // fetch complete list of waste data from json object
    getWasteData = ( ) => {
        const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";

        fetch(url)
            .then( res => {
                return res.json();
            })
            .then( data => {
                this.filterWasteData(data);
            })
    }

    // filter out waste data based on user's keywords 
    filterWasteData = ( data ) => {
        let keywords = new RegExp(`${this.state.search}`)
        
        let result = data.filter( item => {
            return (keywords.test(item.keywords))
        })

        this.setState({
            results: result
        })
    }

    addFavorite = ( e ) => {
        let { results, favs } = this.state;
        let newFavsList = favs.slice();
        let newEntryObj = results[Number(e.target.id)];
        let isAlreadyInList = false
       
        // check if item is already on fav's list
        // if yes, unfavorite item    
        // otherwise, add to list
        newFavsList.forEach(( item, i ) => {
            if ( item.title === newEntryObj.title && item.body === newEntryObj.body ) {
                isAlreadyInList = true;
                newFavsList.splice(i, 1)
            }
        })

        if (!isAlreadyInList) {
            newFavsList.push(newEntryObj)
        }

        this.setState({
            favs: newFavsList
        })
    }

    removeFavorite = ( e ) => {
        let { favs } = this.state;
        let newFavsList = favs.slice();
        let targetID = Number(e.target.id);

        newFavsList.splice(targetID, 1);

        this.setState({
            favs: newFavsList
        })
    }

    render() {

        return (
            <div className="main">
                <form className="search" >
                    <input className="search__bar" type="search" id="site-search" onChange={this.handleChange} value={this.state.search} ></input>
                    <button className="search__button" onClick={this.handleSubmit}><i className="fas fa-search"></i></button>
                </form>
                <Result data={this.state.results} addFavorite={this.addFavorite} />
                <Favorite favs={this.state.favs} removeFavorite={this.removeFavorite} />
            </div>
        )
    }
}
