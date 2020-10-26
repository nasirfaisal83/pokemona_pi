import React, { Component } from 'react';
import './App.css';

class PokemonFetch extends Component {

    state = {
        loading : false,
        inputValue : '',
        searchresult : null,
        imgsrc : '',
        typesearchresult : null,
        ispokemonfound : true
    }

    onTypeClick = (url) => {
      this.setState({loading:true})
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.setState({typesearchresult : data.pokemon , loading : false})
            })
          .catch((error) => {
            this.setState({loading:false, ispokemonfound:false})
            console.log(error);
          });
    }

    fetch_data = (pokemonName) => {
      this.setState({typesearchresult:null ,loading:true});
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
          .then(response => response.json())
          .then(data => {
            this.setState({searchresult: data, imgsrc : data.sprites.front_default,loading:false,ispokemonfound:true})
          })
          .catch((error) => {
            this.setState({loading:false,ispokemonfound:false})
            console.log(error);
          });
    }

    Search = () => {
        this.fetch_data(this.state.inputValue);
    }

    render(){
        return (
            <div>
                {this.state.ispokemonfound === false &&
                  <p style={{color:"red"}}>not found!</p>
                }
                <input type='text' placeholder='type pokemon name...' onChange={(e) => this.setState({inputValue: e.target.value})}></input>
                <button type='button' onClick={this.Search}>Search</button>
                {this.state.loading && 
                  <img alt='loadingimage' src='https://i.pinimg.com/originals/df/d2/68/dfd2683c9701642c776e31d3b0d603a9.gif'></img>

                }
                {this.state.searchresult && 
                <div>
                    <img alt='pokemon_photo' src={this.state.imgsrc} onMouseOver={() => this.setState({imgsrc:this.state.searchresult.sprites.back_default})}  onMouseLeave={() => this.setState({imgsrc:this.state.searchresult.sprites.front_default})}></img>
                    <p>name: {this.state.searchresult.name}</p>
                    <p>weight: {this.state.searchresult.weight}</p>
                    <p>height: {this.state.searchresult.height}</p>
                    {this.state.searchresult.types.map((type,index) => {
                        return(
                        <p onClick={() => {this.onTypeClick(type.type.url)}}>  type {index+1} : {type.type.name} </p>
                        )
                        })
                    }
                    {this.state.typesearchresult && this.state.typesearchresult.map((item,index) =>{
                                return(
                                <p onClick={()=>{this.fetch_data(item.pokemon.name)}}>{item.pokemon.name}</p>
                            )})
                        
                    }
                </div>
            }   
            </div>
        );
    }
}

export default PokemonFetch;