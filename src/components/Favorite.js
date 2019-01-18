import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');

export default class Favorite extends Component {
    
    render() {
        let { favs, removeFavorite } = this.props;

        let rows = <div></div>

        if (favs.length) {
            rows = favs.map((( row, i ) => {
                let decodedBody = new DOMParser().parseFromString(row.body, 'text/html').body.textContent;

                return (
                    <div style={{display: "table-row"}} className="table-row" key={uuidv1()}>
                        <div style={{display: "table-cell"}} className="table-cell">
                            <i onClick={removeFavorite} id={i} className="fas fa-star favorited-item"></i>
                        </div>
                        <div style={{display: "table-cell"}} className="table-cell">
                            {row.title}
                        </div>
                        <div style={{display: "table-cell"}} className="table-cell" dangerouslySetInnerHTML={{__html: decodedBody}}/>
                    </div>
                )
            }))
        } 

        return (
            <div className="favorites-section">
                <h2>Favourites</h2>
                <div style={{display: "table"}} className="favorites__table">
                    {rows}
                </div>
            </div>
        )
    }
}
