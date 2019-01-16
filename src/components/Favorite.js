import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');

export default class Favorite extends Component {
    
    render() {
        let { favs, removeFavorite } = this.props;

        let rows = <tbody></tbody>

        if (favs.length) {
            rows = favs.map((( row, i ) => {
                let decodedBody = new DOMParser().parseFromString(row.body, 'text/html').body.textContent;

                return (
                    <tbody key={uuidv1()}>
                        <tr>
                            <td className="favorite">
                                <i onClick={removeFavorite} id={i} className="fas fa-star"></i>
                            </td>
                            <td>
                                {row.title}
                            </td>
                            <td dangerouslySetInnerHTML={{__html: decodedBody}}/>
                        </tr>
                    </tbody>
                )
            }))
        } 

        return (
            <div className="favorites">
                <h2>Favourites</h2>
                <table className="favorites__result">
                    {rows}
                </table>
            </div>
        )
    }
}
